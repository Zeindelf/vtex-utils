
/* ! store2 - v2.7.0 - 2018-02-08
* Copyright (c) 2018 Nathan Bubna; Licensed (MIT OR GPL-3.0) */
/* eslint-disable */
var _ = {
    version: "2.7.0",
    areas: {},
    apis: {},

    // utilities
    inherit: function(api, o) {
        for (var p in api) {
            if (!o.hasOwnProperty(p)) {
                o[p] = api[p];
            }
        }
        return o;
    },
    stringify: function(d) {
        return d === undefined || typeof d === "function" ? d+'' : JSON.stringify(d);
    },
    parse: function(s) {
        // if it doesn't parse, return as is
        try{ return JSON.parse(s); }catch(e){ return s; }
    },

    // extension hooks
    fn: function(name, fn) {
        _.storeAPI[name] = fn;
        for (var api in _.apis) {
            _.apis[api][name] = fn;
        }
    },
    get: function(area, key){ return area.getItem(key); },
    set: function(area, key, string){ area.setItem(key, string); },
    remove: function(area, key){ area.removeItem(key); },
    key: function(area, i){ return area.key(i); },
    length: function(area){ return area.length; },
    clear: function(area){ area.clear(); },

    // core functions
    Store: function(id, area, namespace) {
        var store = _.inherit(_.storeAPI, function(key, data, overwrite) {
            if (arguments.length === 0){ return store.getAll(); }
            if (typeof data === "function"){ return store.transact(key, data, overwrite); }// fn=data, alt=overwrite
            if (data !== undefined){ return store.set(key, data, overwrite); }
            if (typeof key === "string" || typeof key === "number"){ return store.get(key); }
            if (!key){ return store.clear(); }
            return store.setAll(key, data);// overwrite=data, data=key
        });
        store._id = id;
        try {
            var testKey = '_safariPrivate_';
            area.setItem(testKey, 'sucks');
            store._area = area;
            area.removeItem(testKey);
        } catch (e) {}
        if (!store._area) {
            store._area = _.inherit(_.storageAPI, { items: {}, name: 'fake' });
        }
        store._ns = namespace || '';
        if (!_.areas[id]) {
            _.areas[id] = store._area;
        }
        if (!_.apis[store._ns+store._id]) {
            _.apis[store._ns+store._id] = store;
        }
        return store;
    },
    storeAPI: {
        // admin functions
        area: function(id, area) {
            var store = this[id];
            if (!store || !store.area) {
                store = _.Store(id, area, this._ns);//new area-specific api in this namespace
                if (!this[id]){ this[id] = store; }
            }
            return store;
        },
        namespace: function(namespace, noSession) {
            if (!namespace){
                return this._ns ? this._ns.substring(0,this._ns.length-1) : '';
            }
            var ns = namespace, store = this[ns];
            if (!store || !store.namespace) {
                store = _.Store(this._id, this._area, this._ns+ns+'.');//new namespaced api
                if (!this[ns]){ this[ns] = store; }
                if (!noSession){ store.area('session', _.areas.session); }
            }
            return store;
        },
        isFake: function(){ return this._area.name === 'fake'; },
        toString: function() {
            return 'store'+(this._ns?'.'+this.namespace():'')+'['+this._id+']';
        },

        // storage functions
        has: function(key) {
            if (this._area.has) {
                return this._area.has(this._in(key));//extension hook
            }
            return !!(this._in(key) in this._area);
        },
        size: function(){ return this.keys().length; },
        each: function(fn, value) {// value is used by keys(fillList) and getAll(fillList))
            for (var i=0, m=_.length(this._area); i<m; i++) {
                var key = this._out(_.key(this._area, i));
                if (key !== undefined) {
                    if (fn.call(this, key, value || this.get(key)) === false) {
                        break;
                    }
                }
                if (m > _.length(this._area)) { m--; i--; }// in case of removeItem
            }
            return value || this;
        },
        keys: function(fillList) {
            return this.each(function(k, list){ list.push(k); }, fillList || []);
        },
        get: function(key, alt) {
            var s = _.get(this._area, this._in(key));
            return s !== null ? _.parse(s) : alt || s;// support alt for easy default mgmt
        },
        getAll: function(fillObj) {
            return this.each(function(k, all){ all[k] = this.get(k); }, fillObj || {});
        },
        transact: function(key, fn, alt) {
            var val = this.get(key, alt),
                ret = fn(val);
            this.set(key, ret === undefined ? val : ret);
            return this;
        },
        set: function(key, data, overwrite) {
            var d = this.get(key);
            if (d != null && overwrite === false) {
                return data;
            }
            return _.set(this._area, this._in(key), _.stringify(data), overwrite) || d;
        },
        setAll: function(data, overwrite) {
            var changed, val;
            for (var key in data) {
                val = data[key];
                if (this.set(key, val, overwrite) !== val) {
                    changed = true;
                }
            }
            return changed;
        },
        add: function(key, data) {
            var d = this.get(key);
            if (d instanceof Array) {
                data = d.concat(data);
            } else if (d !== null) {
                var type = typeof d;
                if (type === typeof data && type === 'object') {
                    for (var k in data) {
                        d[k] = data[k];
                    }
                    data = d;
                } else {
                    data = d + data;
                }
            }
            _.set(this._area, this._in(key), _.stringify(data));
            return data;
        },
        remove: function(key) {
            var d = this.get(key);
            _.remove(this._area, this._in(key));
            return d;
        },
        clear: function() {
            if (!this._ns) {
                _.clear(this._area);
            } else {
                this.each(function(k){ _.remove(this._area, this._in(k)); }, 1);
            }
            return this;
        },
        clearAll: function() {
            var area = this._area;
            for (var id in _.areas) {
                if (_.areas.hasOwnProperty(id)) {
                    this._area = _.areas[id];
                    this.clear();
                }
            }
            this._area = area;
            return this;
        },

        // internal use functions
        _in: function(k) {
            if (typeof k !== "string"){ k = _.stringify(k); }
            return this._ns ? this._ns + k : k;
        },
        _out: function(k) {
            return this._ns ?
                k && k.indexOf(this._ns) === 0 ?
                    k.substring(this._ns.length) :
                    undefined : // so each() knows to skip it
                k;
        }
    },// end _.storeAPI
    storageAPI: {
        length: 0,
        has: function(k){ return this.items.hasOwnProperty(k); },
        key: function(i) {
            var c = 0;
            for (var k in this.items){
                if (this.has(k) && i === c++) {
                    return k;
                }
            }
        },
        setItem: function(k, v) {
            if (!this.has(k)) {
                this.length++;
            }
            this.items[k] = v;
        },
        removeItem: function(k) {
            if (this.has(k)) {
                delete this.items[k];
                this.length--;
            }
        },
        getItem: function(k){ return this.has(k) ? this.items[k] : null; },
        clear: function(){ for (var k in this.items){ this.removeItem(k); } },
        toString: function(){ return this.length+' items in '+this.name+'Storage'; }
    }// end _.storageAPI
};

// safely set this up (throws error in IE10/32bit mode for local files)
var store = _.Store("local", (function(){try{ return localStorage; }catch(e){}})());
store.local = store;// for completeness
store._ = _; // for extenders and debuggers...
// safely setup store.session (throws exception in FF for file:/// urls)
store.area("session", (function(){try{ return sessionStorage; }catch(e){}})());

/**
 * Copyright (c) 2013 ESHA Research
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * store.overflow.js - Fall back to fake storage on quota errors (e.g. very useful for Safari private mode)
 *
 * When quota is reached on a storage area, this shifts incoming values to
 * fake storage, so they last only as long as the page does. This is useful
 * because it is more burdensome for localStorage to recover from quota errors
 * than incomplete caches. In other words, it is wiser to rely on store.js
 * never complaining than never missing data. You should already be checking
 * the integrity of cached data on every page load. Also note that quota errors
 * are thrown by Safari for *every* setItem when user is in private browsing mode.
 * http://spin.atomicobject.com/2013/01/23/ios-private-browsing-localstorage/
 *
 * Status: BETA
 */
;(function(store, _) {
    var _set = _.set,
        _get = _.get,
        _remove = _.remove,
        _key = _.key,
        _length = _.length,
        _clear = _.clear;

    _.overflow = function(area, create) {
        var name = area === _.areas.local ? '+local+' :
                   area === _.areas.session ? '+session+' : false;
        if (name) {
            var overflow = _.areas[name];
            if (create && !overflow) {
                overflow = store.area(name)._area;// area() copies to _.areas
            } else if (create === false) {
                delete _.areas[name];
                delete store[name];
            }
            return overflow;
        }
    };
    _.set = function(area, key, string) {
        try {
            _set.apply(this, arguments);
        } catch (e) {
            if (e.name === 'QUOTA_EXCEEDED_ERR' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
                e.toString().indexOf("QUOTA_EXCEEDED_ERR") !== -1 ||
                e.toString().indexOf("QuotaExceededError") !== -1) {
                // the e.toString is needed for IE9 / IE10, cos name is empty there
                return _.set(_.overflow(area, true), key, string);
            }
            throw e;
        }
    };
    _.get = function(area, key) {
        var overflow = _.overflow(area);
        return (overflow && _get.call(this, overflow, key)) ||
            _get.apply(this, arguments);
    };
    _.remove = function(area, key) {
        var overflow = _.overflow(area);
        if (overflow){ _remove.call(this, overflow, key); }
        _remove.apply(this, arguments);
    };
    _.key = function(area, i) {
        var overflow = _.overflow(area);
        if (overflow) {
            var l = _length.call(this, area);
            if (i >= l) {
                i = i - l;// make i overflow-relative
                for (var j=0, m=_length.call(this, overflow); j<m; j++) {
                    if (j === i) {// j is overflow index
                        return _key.call(this, overflow, j);
                    }
                }
            }
        }
        return _key.apply(this, arguments);
    };
    _.length = function(area) {
        var length = _length(area),
            overflow = _.overflow(area);
        return overflow ? length + _length(overflow) : length;
    };
    _.clear = function(area) {
        _.overflow(area, false);
        _clear.apply(this, arguments);
    };
})(store, store._, undefined);

/**
 * Copyright (c) 2013 ESHA Research
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * store.cache.js - To make data expire, pass a number of seconds as the overwrite (third) param on set() calls
 *
 * Allows use of the 'overwrite' param on set calls to give an enforced expiration date
 * without breaking existing 'overwrite' functionality.
 *
 * Status: BETA - useful, needs testing
 */
;(function(store, _) {
    var prefix = 'exp@',
        suffix = ';',
        parse = _.parse,
        _get = _.get,
        _set = _.set;
    _.parse = function(s) {
        if (s && s.indexOf(prefix) === 0) {
            s = s.substring(s.indexOf(suffix)+1);
        }
        return parse(s);
    };
    _.expires = function(s) {
        if (s && s.indexOf(prefix) === 0) {
            return parseInt(s.substring(prefix.length, s.indexOf(suffix)), 10);
        }
        return false;
    };
    _.when = function(min) {// if min, return min->date, else date->min
        var now = Math.floor((new Date().getTime())/1000);
        return min ? new Date((now+min)*1000) : now;
    };
    _.cache = function(area, key) {
        var s = _get(area, key),
            min = _.expires(s);
        if (min && _.when() >= min) {
            return area.removeItem(key);
        }
        return s;
    };
    _.get = function(area, key) {
        var s = _.cache(area, key);
        return s === undefined ? null : s;
    };
    _.set = function(area, key, string, min) {
        try {
            if (min) {
                string = prefix + (_.when()+min) + suffix + string;
            }
            _set(area, key, string);
        } catch (e) {
            if (e.name === 'QUOTA_EXCEEDED_ERR' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                var changed = false;
                for (var i=0,m=area.length; i<m; i++) {
                    if (_.cache(area, key) === undefined) {
                        changed = true;
                    }
                }
                if (changed) {
                    return _.set.apply(this, arguments);
                }
            }
            throw e;
        }
    };
})(store, store._, undefined);

export default store;
