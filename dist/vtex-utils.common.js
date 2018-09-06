
/*!!
 * VtexUtils.js v1.16.1
 * https://github.com/zeindelf/vtex-utils
 *
 * Copyright (c) 2017-2018 Zeindelf
 * Released under the MIT license
 *
 * Date: 2018-09-06T23:17:53.128Z
 */

'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/*
 * jquery.ajax-retry
 * https://github.com/johnkpaul/jquery-ajax-retry
 *
 * Copyright (c) 2012 John Paul
 * Licensed under the MIT license.
 */
/* eslint-disable */
if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') {
  commonjsGlobal.window = commonjsGlobal;
  commonjsGlobal.window.navigator = {};
}

if ('jQuery' in window || '$' in window) {
  (function ($) {
    // enhance all ajax requests with our retry API
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      jqXHR.retry = function (opts) {
        if (opts.timeout) {
          this.timeout = opts.timeout;
        }
        if (opts.statusCodes) {
          this.statusCodes = opts.statusCodes;
        }
        return this.pipe(null, pipeFailRetry(this, opts));
      };
    });

    // generates a fail pipe function that will retry `jqXHR` `times` more times
    function pipeFailRetry(jqXHR, opts) {
      var times = opts.times;
      var timeout = jqXHR.timeout;

      // takes failure data as input, returns a new deferred
      return function (input, status, msg) {
        var ajaxOptions = this;
        var output = new $.Deferred();
        var retryAfter = jqXHR.getResponseHeader('Retry-After');

        // whenever we do make this request, pipe its output to our deferred
        function nextRequest() {
          $.ajax(ajaxOptions).retry({ times: times - 1, timeout: opts.timeout, statusCodes: opts.statusCodes }).pipe(output.resolve, output.reject);
        }

        if (times > 1 && (!jqXHR.statusCodes || $.inArray(input.status, jqXHR.statusCodes) > -1)) {
          // implement Retry-After rfc
          // http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.37
          if (retryAfter) {
            // it must be a date
            if (isNaN(retryAfter)) {
              timeout = new Date(retryAfter).getTime() - $.now();
              // its a number in seconds
            } else {
              timeout = parseInt(retryAfter, 10) * 1000;
            }
            // ensure timeout is a positive number
            if (isNaN(timeout) || timeout < 0) {
              timeout = jqXHR.timeout;
            }
          }

          if (timeout !== undefined) {
            setTimeout(nextRequest, timeout);
          } else {
            nextRequest();
          }
        } else {
          // no times left, reject our deferred with the current arguments
          output.rejectWith(this, arguments);
        }

        return output;
      };
    }
  })(jQuery);
}

var utilify = createCommonjsModule(function (module, exports) {
/*!!
 * Utilify.js v0.7.1
 * https://github.com/zeindelf/utilify-js
 *
 * Copyright (c) 2017-2018 Zeindelf
 * Released under the MIT license
 *
 * Date: 2018-08-24T19:40:18.527Z
 */

(function (global, factory) {
	module.exports = factory();
}(commonjsGlobal, (function () {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* ! store2 - v2.7.0 - 2018-02-08
* Copyright (c) 2018 Nathan Bubna; Licensed (MIT OR GPL-3.0) */
/* eslint-disable */
var _ = {
    version: "2.7.0",
    areas: {},
    apis: {},

    // utilities
    inherit: function inherit(api, o) {
        for (var p in api) {
            if (!o.hasOwnProperty(p)) {
                o[p] = api[p];
            }
        }
        return o;
    },
    stringify: function stringify(d) {
        return d === undefined || typeof d === "function" ? d + '' : JSON.stringify(d);
    },
    parse: function parse(s) {
        // if it doesn't parse, return as is
        try {
            return JSON.parse(s);
        } catch (e) {
            return s;
        }
    },

    // extension hooks
    fn: function fn(name, _fn) {
        _.storeAPI[name] = _fn;
        for (var api in _.apis) {
            _.apis[api][name] = _fn;
        }
    },
    get: function get$$1(area, key) {
        return area.getItem(key);
    },
    set: function set$$1(area, key, string) {
        area.setItem(key, string);
    },
    remove: function remove(area, key) {
        area.removeItem(key);
    },
    key: function key(area, i) {
        return area.key(i);
    },
    length: function length(area) {
        return area.length;
    },
    clear: function clear(area) {
        area.clear();
    },

    // core functions
    Store: function Store(id, area, namespace) {
        var store = _.inherit(_.storeAPI, function (key, data, overwrite) {
            if (arguments.length === 0) {
                return store.getAll();
            }
            if (typeof data === "function") {
                return store.transact(key, data, overwrite);
            } // fn=data, alt=overwrite
            if (data !== undefined) {
                return store.set(key, data, overwrite);
            }
            if (typeof key === "string" || typeof key === "number") {
                return store.get(key);
            }
            if (!key) {
                return store.clear();
            }
            return store.setAll(key, data); // overwrite=data, data=key
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
        if (!_.apis[store._ns + store._id]) {
            _.apis[store._ns + store._id] = store;
        }
        return store;
    },
    storeAPI: {
        // admin functions
        area: function area(id, _area) {
            var store = this[id];
            if (!store || !store.area) {
                store = _.Store(id, _area, this._ns); //new area-specific api in this namespace
                if (!this[id]) {
                    this[id] = store;
                }
            }
            return store;
        },
        namespace: function namespace(_namespace, noSession) {
            if (!_namespace) {
                return this._ns ? this._ns.substring(0, this._ns.length - 1) : '';
            }
            var ns = _namespace,
                store = this[ns];
            if (!store || !store.namespace) {
                store = _.Store(this._id, this._area, this._ns + ns + '.'); //new namespaced api
                if (!this[ns]) {
                    this[ns] = store;
                }
                if (!noSession) {
                    store.area('session', _.areas.session);
                }
            }
            return store;
        },
        isFake: function isFake() {
            return this._area.name === 'fake';
        },
        toString: function toString() {
            return 'store' + (this._ns ? '.' + this.namespace() : '') + '[' + this._id + ']';
        },

        // storage functions
        has: function has(key) {
            if (this._area.has) {
                return this._area.has(this._in(key)); //extension hook
            }
            return !!(this._in(key) in this._area);
        },
        size: function size() {
            return this.keys().length;
        },
        each: function each(fn, value) {
            // value is used by keys(fillList) and getAll(fillList))
            for (var i = 0, m = _.length(this._area); i < m; i++) {
                var key = this._out(_.key(this._area, i));
                if (key !== undefined) {
                    if (fn.call(this, key, value || this.get(key)) === false) {
                        break;
                    }
                }
                if (m > _.length(this._area)) {
                    m--;i--;
                } // in case of removeItem
            }
            return value || this;
        },
        keys: function keys(fillList) {
            return this.each(function (k, list) {
                list.push(k);
            }, fillList || []);
        },
        get: function get$$1(key, alt) {
            var s = _.get(this._area, this._in(key));
            return s !== null ? _.parse(s) : alt || s; // support alt for easy default mgmt
        },
        getAll: function getAll(fillObj) {
            return this.each(function (k, all) {
                all[k] = this.get(k);
            }, fillObj || {});
        },
        transact: function transact(key, fn, alt) {
            var val = this.get(key, alt),
                ret = fn(val);
            this.set(key, ret === undefined ? val : ret);
            return this;
        },
        set: function set$$1(key, data, overwrite) {
            var d = this.get(key);
            if (d != null && overwrite === false) {
                return data;
            }
            return _.set(this._area, this._in(key), _.stringify(data), overwrite) || d;
        },
        setAll: function setAll(data, overwrite) {
            var changed, val;
            for (var key in data) {
                val = data[key];
                if (this.set(key, val, overwrite) !== val) {
                    changed = true;
                }
            }
            return changed;
        },
        add: function add(key, data) {
            var d = this.get(key);
            if (d instanceof Array) {
                data = d.concat(data);
            } else if (d !== null) {
                var type = typeof d === "undefined" ? "undefined" : _typeof(d);
                if (type === (typeof data === "undefined" ? "undefined" : _typeof(data)) && type === 'object') {
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
        remove: function remove(key) {
            var d = this.get(key);
            _.remove(this._area, this._in(key));
            return d;
        },
        clear: function clear() {
            if (!this._ns) {
                _.clear(this._area);
            } else {
                this.each(function (k) {
                    _.remove(this._area, this._in(k));
                }, 1);
            }
            return this;
        },
        clearAll: function clearAll() {
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
        _in: function _in(k) {
            if (typeof k !== "string") {
                k = _.stringify(k);
            }
            return this._ns ? this._ns + k : k;
        },
        _out: function _out(k) {
            return this._ns ? k && k.indexOf(this._ns) === 0 ? k.substring(this._ns.length) : undefined : // so each() knows to skip it
            k;
        }
    }, // end _.storeAPI
    storageAPI: {
        length: 0,
        has: function has(k) {
            return this.items.hasOwnProperty(k);
        },
        key: function key(i) {
            var c = 0;
            for (var k in this.items) {
                if (this.has(k) && i === c++) {
                    return k;
                }
            }
        },
        setItem: function setItem(k, v) {
            if (!this.has(k)) {
                this.length++;
            }
            this.items[k] = v;
        },
        removeItem: function removeItem(k) {
            if (this.has(k)) {
                delete this.items[k];
                this.length--;
            }
        },
        getItem: function getItem(k) {
            return this.has(k) ? this.items[k] : null;
        },
        clear: function clear() {
            for (var k in this.items) {
                this.removeItem(k);
            }
        },
        toString: function toString() {
            return this.length + ' items in ' + this.name + 'Storage';
        } // end _.storageAPI
    } };

// safely set this up (throws error in IE10/32bit mode for local files)
var store = _.Store("local", function () {
    try {
        return localStorage;
    } catch (e) {}
}());
store.local = store; // for completeness
store._ = _; // for extenders and debuggers...
// safely setup store.session (throws exception in FF for file:/// urls)
store.area("session", function () {
    try {
        return sessionStorage;
    } catch (e) {}
}());
(function (store, _) {
    var _set = _.set,
        _get = _.get,
        _remove = _.remove,
        _key = _.key,
        _length = _.length,
        _clear = _.clear;

    _.overflow = function (area, create) {
        var name = area === _.areas.local ? '+local+' : area === _.areas.session ? '+session+' : false;
        if (name) {
            var overflow = _.areas[name];
            if (create && !overflow) {
                overflow = store.area(name)._area; // area() copies to _.areas
            } else if (create === false) {
                delete _.areas[name];
                delete store[name];
            }
            return overflow;
        }
    };
    _.set = function (area, key, string) {
        try {
            _set.apply(this, arguments);
        } catch (e) {
            if (e.name === 'QUOTA_EXCEEDED_ERR' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.toString().indexOf("QUOTA_EXCEEDED_ERR") !== -1 || e.toString().indexOf("QuotaExceededError") !== -1) {
                // the e.toString is needed for IE9 / IE10, cos name is empty there
                return _.set(_.overflow(area, true), key, string);
            }
            throw e;
        }
    };
    _.get = function (area, key) {
        var overflow = _.overflow(area);
        return overflow && _get.call(this, overflow, key) || _get.apply(this, arguments);
    };
    _.remove = function (area, key) {
        var overflow = _.overflow(area);
        if (overflow) {
            _remove.call(this, overflow, key);
        }
        _remove.apply(this, arguments);
    };
    _.key = function (area, i) {
        var overflow = _.overflow(area);
        if (overflow) {
            var l = _length.call(this, area);
            if (i >= l) {
                i = i - l; // make i overflow-relative
                for (var j = 0, m = _length.call(this, overflow); j < m; j++) {
                    if (j === i) {
                        // j is overflow index
                        return _key.call(this, overflow, j);
                    }
                }
            }
        }
        return _key.apply(this, arguments);
    };
    _.length = function (area) {
        var length = _length(area),
            overflow = _.overflow(area);
        return overflow ? length + _length(overflow) : length;
    };
    _.clear = function (area) {
        _.overflow(area, false);
        _clear.apply(this, arguments);
    };
})(store, store._, undefined);
(function (store, _) {
    var prefix = 'exp@',
        suffix = ';',
        parse = _.parse,
        _get = _.get,
        _set = _.set;
    _.parse = function (s) {
        if (s && s.indexOf(prefix) === 0) {
            s = s.substring(s.indexOf(suffix) + 1);
        }
        return parse(s);
    };
    _.expires = function (s) {
        if (s && s.indexOf(prefix) === 0) {
            return parseInt(s.substring(prefix.length, s.indexOf(suffix)), 10);
        }
        return false;
    };
    _.when = function (min) {
        // if min, return min->date, else date->min
        var now = Math.floor(new Date().getTime() / 1000);
        return min ? new Date((now + min) * 1000) : now;
    };
    _.cache = function (area, key) {
        var s = _get(area, key),
            min = _.expires(s);
        if (min && _.when() >= min) {
            return area.removeItem(key);
        }
        return s;
    };
    _.get = function (area, key) {
        var s = _.cache(area, key);
        return s === undefined ? null : s;
    };
    _.set = function (area, key, string, min) {
        try {
            if (min) {
                string = prefix + (_.when() + min) + suffix + string;
            }
            _set(area, key, string);
        } catch (e) {
            if (e.name === 'QUOTA_EXCEEDED_ERR' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                var changed = false;
                for (var i = 0, m = area.length; i < m; i++) {
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

var stringHelpers = {
    /**
     * Capitalize a string
     *
     * @param {string} str - The String
     * @return {string} The modified string
     * @example
     *     capitalize('foo bar'); // 'Foo Bar'
     */
    capitalize: function capitalize(str) {
        return str.replace(/(?:^|\s)\S/g, function (match) {
            return match.toUpperCase();
        });
    },


    /**
     * Replace <, >, &, ', " and / with HTML entities.
     * @param {string} str - The string to check
     * @return {boolean}
     */
    escape: function escape(str) {
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
    },


    /**
     * Normalize text adding first character to upper after punctuations (. ? !)
     *
     * @param  {String} [str]  Text to convert
     * @return {String}
     */
    normalizeText: function normalizeText(str) {
        var _this = this;

        var re = /(^|[.!?]\s+)([a-z])/g;
        var normalize = function normalize(str) {
            return str.toLowerCase().replace(re, function (m, $1, $2) {
                return $1 + $2.toUpperCase();
            });
        };
        var addSpace = function addSpace(str) {
            return _this.strCompact(str.replace(/[,.!?:;]+(?=\S)/g, '$& '));
        };

        return normalize(addSpace(str));
    },


    /**
     * Zero padding number
     *
     * @param  {integer} number     Number to format
     * @param  {integer} [size=2]   Digits limit
     * @return {string}             Formatted num with zero padding
     */
    pad: function pad(number, size) {
        var stringNum = String(number);

        while (stringNum.length < (size || 2)) {
            stringNum = '0' + stringNum;
        }

        return stringNum;
    },


    /**
     * Remove accents from a string
     * @param {string} str - The string to remove accents
     * @return {string} The modified string
     * @example
     *     removeAccent('Olá Mündô!'); // 'Ola Mundo!'
     */
    removeAccent: function removeAccent(str) {
        var reAccents = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g;

        // Prefixed with some char to avoid off-by-one:
        var replacements = '_aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';

        return str.replace(reAccents, function (match) {
            return replacements[reAccents.source.indexOf(match)];
        });
    },


    /**
     * Slugify a text, removing/replacing all special characters and spaces with dashes '-'
     * @param {string} str - The string to sanitize
     * @return {string} The modified string
     * @example
     *     slugifyText('Olá Mundo!'); // 'ola-mundo'
     */
    slugifyText: function slugifyText(str) {
        str = str.replace(/^\s+|\s+$/g, '') // trim
        .toLowerCase().replace(/\./g, '-') // Replace a dot for a -
        .replace(/\*/g, '-') // Replace a * for a -
        .replace(/\+/g, '-'); // Replace a + for a -

        // Remove accents, swap ñ for n, etc
        var from = 'àáäâãèéëêìíïîòóöôõùúüûýÿñç·/_,:;';
        var to = 'aaaaaeeeeiiiiooooouuuuyync------';

        for (var i = 0, len = from.length; i < len; i += 1) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
        .replace(/\s+/g, '-') // Collapse whitespace and replace by -
        .replace(/-+/g, '-'); // Collapse dashes

        if (str.charAt(0) === '-') str = str.substr(1);
        if (str.charAt(str.length - 1) === '-') str = str.substr(0, str.length - 1);

        return str;
    },


    /**
     * Compacts whitespace in the string to a single space and trims the ends.
     *
     * @param  {String} [str] String to remove spaces
     * @return {String}
     * @example
     *     strCompact('  Foo  Bar    Baz  ') // 'Foo Bar Baz'
     */
    strCompact: function strCompact(str) {
        return this.trim(str).replace(/([\r\n\s])+/g, function (match, whitespace) {
            return whitespace === '　' ? whitespace : ' ';
        });
    },


    /**
     * Multiple string replace, PHP str_replace clone
     * @param {string|Array} search - The value being searched for, otherwise known as the needle.
     *     An array may be used to designate multiple needles.
     * @param {string|Array} replace - The replacement value that replaces found search values.
     *     An array may be used to designate multiple replacements.
     * @param {string} subject - The subject of the replacement
     * @return {string} The modified string
     * @example
     *     strReplace(['olá', 'mundo'], ['hello', 'world'], 'olá mundo'); // 'hello world'
     *     strReplace(['um', 'dois'], 'olá', 'um dois três'); // Output 'olá olá três'
     */
    strReplace: function strReplace(search, replace, subject) {
        var regex = void 0;

        if (validateHelpers.isArray(search)) {
            for (var i = 0; i < search.length; i++) {
                search[i] = search[i].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
                regex = new RegExp(search[i], 'g');
                subject = subject.replace(regex, validateHelpers.isArray(replace) ? replace[i] : replace);
            }
        } else {
            search = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            regex = new RegExp(search, 'g');
            subject = subject.replace(regex, validateHelpers.isArray(replace) ? replace[0] : replace);
        }

        return subject;
    },


    /**
     * Remove leading and trailing empty spaces.
     *
     * @param {String} str - The string.
     * @returns {String} The new string.
     * @example
     *     trim('  Foo  ') // 'Foo'
     */
    trim: function trim(str) {
        if (validateHelpers.isString(str)) {
            return str.replace(/^\s+|\s+$/gm, '');
        }

        return '';
    },


    /**
     * Make a string's first character uppercase
     * PHP ucfirst clone
     *
     * @param {String} str - The string.
     * @returns {String} The new string.
     * @example
     *     ucfirst('foo bar foz') // 'Foo bar foz'
     */
    ucfirst: function ucfirst(str) {
        str += '';
        var f = str.charAt(0).toUpperCase();

        return f + str.substr(1);
    },


    /**
     * Converts hyphens and camel casing to underscores.
     *
     * @param  {String} str String to convert
     * @return {String}
     */
    underscore: function underscore(str) {
        return str.replace(/[-\s]+/g, '_').replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
    },


    /**
     * Replaces HTML encoded entities with <, >, &, ', " and /.
     * @param {string} str - The string to check
     * @return {boolean}
     */
    unescape: function unescape(str) {
        return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#x5C;/g, '\\').replace(/&#96;/g, '`');
    }
};

var globalHelpers = {
    /**
     * Recursively transform key strings to camelCase if param is an Object.
     * If param is string, return an camel cased string.
     *
     * @param  {Object|String} obj  Object or string to transform
     * @returns {Object|String}
     */
    camelize: function camelize(obj) {
        var _this = this;

        var _camelize = function _camelize(str) {
            str = stringHelpers.underscore(str);
            str = stringHelpers.slugifyText(str);

            return str.replace(/[_.-\s](\w|$)/g, function (_, x) {
                return x.toUpperCase();
            });
        };

        if (validateHelpers.isDate(obj) || validateHelpers.isRegExp(obj)) {
            return obj;
        }

        if (validateHelpers.isArray(obj)) {
            return obj.map(function (item, index) {
                if (validateHelpers.isObject(item)) {
                    return _this.camelize(item);
                }

                return item;
            });
        }

        if (validateHelpers.isString(obj)) {
            return _camelize(obj);
        }

        return Object.keys(obj).reduce(function (acc, key) {
            var camel = _camelize(key);
            acc[camel] = obj[key];

            if (validateHelpers.isObject(obj[key])) {
                acc[camel] = _this.camelize(obj[key]);
            }

            return acc;
        }, {});
    },


    /**
     * Check if value contains in an element
     *
     * @category Global
     * @param {String} value - Value to check
     * @param {String|Array} elem - String or array
     * @return {Boolean} - Return true if element contains a value
     */
    contains: function contains(value, elem) {
        if (validateHelpers.isArray(elem)) {
            for (var i = 0, len = elem.length; i < len; i += 1) {
                if (elem[i] === value) {
                    return true;
                }
            }
        }

        if (validateHelpers.isString(elem)) {
            return elem.indexOf(value) >= 0;
        }

        return false;
    },


    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked, or until the next browser frame is drawn. The debounced function
     * comes with a `cancel` method to cancel delayed `func` invocations and a
     * `flush` method to immediately invoke them. Provide `options` to indicate
     * whether `func` should be invoked on the leading and/or trailing edge of the
     * `wait` timeout. The `func` is invoked with the last arguments provided to the
     * debounced function. Subsequent calls to the debounced function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
     * invocation will be deferred until the next frame is drawn (typically about
     * 16ms).
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `debounce` and `throttle`.
     *
     * @from Lodash
     *
     * @category Global
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay; if omitted, `requestAnimationFrame` is used (if available).
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false] Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing edge of the timeout.
     * @return {Function} Returns the new debounced function.
     * @example
     *     // Avoid costly calculations while the window size is in flux.
     *     $(window).on('resize', debounce(calculateLayout, 150));
     *
     *     // Invoke `sendMail` when clicked, debouncing subsequent calls.
     *     $(element).on('click', debounce(sendMail, 300, {
     *        'leading': true,
     *         'trailing': false,
     *     }));
     *
     *     // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     *     const debounced = debounce(batchLog, 250, { 'maxWait': 1000 })
     *     const source = new EventSource('/stream')
     *     $(source).on('message', debounced)
     *
     *     // Cancel the trailing debounced invocation.
     *     $(window).on('popstate', debounced.cancel)
     *
     *     // Check for pending invocations.
     *     const status = debounced.pending() ? "Pending..." : "Ready"
     */
    debounce: function debounce(func, wait, options) {
        var lastArgs = void 0;
        var lastThis = void 0;
        var maxWait = void 0;
        var result = void 0;
        var timerId = void 0;
        var lastCallTime = void 0;

        var lastInvokeTime = 0;
        var leading = false;
        var maxing = false;
        var trailing = true;

        // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
        var useRAF = !wait && wait !== 0 && typeof window.requestAnimationFrame === 'function';

        if (typeof func != 'function') {
            throw new TypeError('Expected a function');
        }

        wait = +wait || 0;
        if (validateHelpers.isObject(options)) {
            leading = !!options.leading;
            maxing = 'maxWait' in options;
            maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
        }

        function invokeFunc(time) {
            var args = lastArgs;
            var thisArg = lastThis;

            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
        }

        function startTimer(pendingFunc, wait) {
            if (useRAF) {
                return window.requestAnimationFrame(pendingFunc);
            }

            return setTimeout(pendingFunc, wait);
        }

        function cancelTimer(id) {
            if (useRAF) {
                return window.cancelAnimationFrame(id);
            }

            clearTimeout(id);
        }

        function leadingEdge(time) {
            // Reset any `maxWait` timer.
            lastInvokeTime = time;
            // Start the timer for the trailing edge.
            timerId = startTimer(timerExpired, wait);
            // Invoke the leading edge.
            return leading ? invokeFunc(time) : result;
        }

        function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime;
            var timeSinceLastInvoke = time - lastInvokeTime;
            var timeWaiting = wait - timeSinceLastCall;

            return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }

        function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime;
            var timeSinceLastInvoke = time - lastInvokeTime;

            // Either this is the first call, activity has stopped and we're at the
            // trailing edge, the system time has gone backwards and we're treating
            // it as the trailing edge, or we've hit the `maxWait` limit.
            return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }

        function timerExpired() {
            var time = Date.now();
            if (shouldInvoke(time)) {
                return trailingEdge(time);
            }

            // Restart the timer.
            timerId = startTimer(timerExpired, remainingWait(time));
        }

        function trailingEdge(time) {
            timerId = undefined;

            // Only invoke if we have `lastArgs` which means `func` has been
            // debounced at least once.
            if (trailing && lastArgs) {
                return invokeFunc(time);
            }

            lastArgs = lastThis = undefined;
            return result;
        }

        function cancel() {
            if (timerId !== undefined) {
                cancelTimer(timerId);
            }

            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined;
        }

        function flush() {
            return timerId === undefined ? result : trailingEdge(Date.now());
        }

        function pending() {
            return timerId !== undefined;
        }

        function debounced() {
            var time = Date.now();
            var isInvoking = shouldInvoke(time);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            lastArgs = args;
            /* eslint-disable */
            lastThis = this;
            /* eslint-enable */
            lastCallTime = time;

            if (isInvoking) {
                if (timerId === undefined) {
                    return leadingEdge(lastCallTime);
                }

                if (maxing) {
                    // Handle invocations in a tight loop.
                    timerId = startTimer(timerExpired, wait);
                    return invokeFunc(lastCallTime);
                }
            }

            if (timerId === undefined) {
                timerId = startTimer(timerExpired, wait);
            }

            return result;
        }

        debounced.cancel = cancel;
        debounced.flush = flush;
        debounced.pending = pending;
        return debounced;
    },


    /**
     * Get variable type
     *
     * @category Global
     * @param {Mix} variable - Variable to check type
     * @return {string} Name of variable type
     * @example
     *     getType(123); // 'number'
     *     getType([]); // 'array'
     *     getType({}); // 'object'
     *     // and so on...
     */
    getType: function getType(variable) {
        var types = {
            'undefined': 'undefined',
            'number': 'number',
            'boolean': 'boolean',
            'string': 'string',
            '[object Function]': 'function',
            '[object RegExp]': 'regexp',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object Error]': 'error'
        };

        return types[typeof variable === 'undefined' ? 'undefined' : _typeof(variable)] || types[{}.toString.call(variable)] || (variable ? 'object' : 'null');
    },


    /**
     * Get url params from a query string
     *
     * @category Global
     * @param {string} name - Param name
     * @param {string} entryPoint - Full url or query string
     * @return {string} Value query string param
     * @example
     *     // URL: https://site.com?param1=foo&param2=bar
     *     getUrlParameter('param1'); // foo
     *     getUrlParameter('param2'); // bar
     *
     *     // Given entry point
     *     var url = 'http://www.site.com?param1=foo&param2=bar&param3=baz';
     *     getUrlParameter('param3', url); // baz
     */
    getUrlParameter: function getUrlParameter(name, entryPoint) {
        entryPoint = !validateHelpers.isString(entryPoint) ? window.location.href : entryPoint.substring(0, 1) === '?' ? entryPoint : '?' + entryPoint;
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(entryPoint);

        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },


    /**
     * Resize image by aspect ratio
     *
     * @category Global
     * @param  {String} type          Resize by 'width' or 'height'
     * @param  {Number} newSize       New value to resize
     * @param  {Number} aspectRatio   Image aspect ratio (calculate by (width / height))
     * @return {Object}               Object with new 'width' and 'height'
     */
    resizeImageByRatio: function resizeImageByRatio(type, newSize, aspectRatio, decimal) {
        if (!validateHelpers.isNumber(newSize) || !validateHelpers.isNumber(aspectRatio)) {
            newSize = parseFloat(newSize, 10);
            aspectRatio = parseFloat(aspectRatio, 10);
        }

        var dimensions = {};
        decimal = decimal || 4;

        switch (type) {
            case 'width':
                dimensions.width = parseFloat(newSize, 10);
                dimensions.height = parseFloat((newSize / aspectRatio).toFixed(decimal), 10);

                break;

            case 'height':
                dimensions.width = parseFloat((newSize * aspectRatio).toFixed(decimal), 10);
                dimensions.height = parseFloat(newSize, 10);

                break;

            default:
                throw new Error('\'type\' needs to be \'width\' or \'height\'');
        }

        return dimensions;
    },


    /**
     * Compare two semver version strings, returning -1, 0, or 1
     * If the semver string `v1` is greater than `v2`, return 1. If the semver string `v2` is greater than `v1`, return -1. If `v1` equals `v2`, return 0
     *
     * @from @semver-compare
     * @category Global
     * @param  {String} v1 Your semver to compare
     * @param  {String} v2 Compared semver
     * @return {Number}    -1, 0, 1
     */
    semverCompare: function semverCompare(v1, v2) {
        var semver = /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
        var validate = function validate(version) {
            if (!validateHelpers.isString(version)) {
                throw new TypeError('Invalid argument: expected string');
            }
            if (!semver.test(version)) {
                throw new Error('Invalid argument: not valid semver');
            }
        };

        [v1, v2].forEach(validate);

        var pa = v1.split('.');
        var pb = v2.split('.');

        for (var i = 0; i < 3; i++) {
            var na = Number(pa[i]);
            var nb = Number(pb[i]);

            if (na > nb) {
                return 1;
            }

            if (nb > na) {
                return -1;
            }

            if (!isNaN(na) && isNaN(nb)) {
                return 1;
            }

            if (isNaN(na) && !isNaN(nb)) {
                return -1;
            }
        }

        return 0;
    },


    /**
     * Removes the host from an url
     *
     * @category Global
     * @param {string} url - The url
     * @return {string} The modified string
     * @example
     *     stripHost("http://test.com.br/contact/test"); //  "/contact/test"
     */
    stripHost: function stripHost(url) {
        var newUrl = url;
        return newUrl.toString().replace(/https?:\/\/.*?\//i, '/');
    },


    /**
     * Removes the protocol from an url
     *
     * @category Global
     * @param {string} url - The url
     * @return {string} The modified string
     * @example
     *     stripHttp('http://test.com.br/contact/test'); // '//test.com.br/contact/test'
     */
    stripHttp: function stripHttp(url) {
        var newUrl = url;
        return newUrl.replace(/^https?:/, '');
    },


    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds (or once per browser frame). The throttled function
     * comes with a `cancel` method to cancel delayed `func` invocations and a
     * `flush` method to immediately invoke them. Provide `options` to indicate
     * whether `func` should be invoked on the leading and/or trailing edge of the
     * `wait` timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
     * invocation will be deferred until the next frame is drawn (typically about
     * 16ms).
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `throttle` and `debounce`.
     *
     * @from Lodash
     * @category Global
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to; if omitted, `requestAnimationFrame` is used (if available).
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true] Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing edge of the timeout.
     * @return {Function} Returns the new throttled function.
     * @example
     *     // Avoid excessively updating the position while scrolling.
     *     $(window).on('scroll', throttle(updatePosition, 100))
     *
     *     // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     *     const throttled = throttle(renewToken, (1000 * 60 * 5), {'trailing': false})
     *     $(element).on('click', throttled)
     *
     *     // Cancel the trailing throttled invocation.
     *     $(window).on('popstate', throttled.cancel)
     */
    throttle: function throttle(func, wait, options) {
        var leading = true;
        var trailing = true;

        if (typeof func !== 'function') {
            throw new TypeError('Expected a function');
        }

        if (validateHelpers.isObject(options)) {
            leading = 'leading' in options ? !!options.leading : leading;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
        }

        return this.debounce(func, wait, {
            'leading': leading,
            'maxWait': wait,
            'trailing': trailing
        });
    },


    /**
     * Invokes the iteratee `n` times, returning an array of the results of
     * each invocation. The iteratee is invoked with one argumentindex).
     *
     * @from Lodash
     * @category Global
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     * @example
     *     times(3, String)
     *     // => ['0', '1', '2']
     *
     *     times(4, () => 0)
     *     // => [0, 0, 0, 0]
     */
    times: function times(n, iteratee) {
        /** Used as references for various `Number` constants. */
        var MAX_SAFE_INTEGER = 9007199254740991;
        /** Used as references for the maximum length and index of an array. */
        var MAX_ARRAY_LENGTH = 4294967295;

        if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
        }

        var index = -1;
        var length = Math.min(n, MAX_ARRAY_LENGTH);
        var result = new Array(length);

        while (++index < length) {
            result[index] = iteratee(index);
        }

        index = MAX_ARRAY_LENGTH;
        n -= MAX_ARRAY_LENGTH;

        while (++index < n) {
            iteratee(index);
        }

        return result;
    },


    /**
     * Unserialize a query string into an object.
     *
     * @category Global
     * @param {string} [str = actual url] - The string that will be converted into a object
     * @return {object}
     * @example
     *     // str can be '?param1=foo&param2=bar&param3=baz', 'param1=foo&param2=bar&param3=baz' or a full url
     *     // If no provided, will get actual url
     *     var url = 'http://www.site.com?param1=foo&param2=bar&param3=baz';
     *     unserialize(url); // {param1: 'foo', param2: 'bar', param3: 'baz'}
     */
    unserialize: function unserialize(str) {
        str = !validateHelpers.isString(str) ? window.location.href : str;

        if (str.indexOf('?') < 0) {
            return {};
        }

        str = str.indexOf('?') === 0 ? str.substr(1) : str.slice(str.indexOf('?') + 1);

        var query = {};
        var parts = str.split('&');

        for (var i = 0, len = parts.length; i < len; i += 1) {
            var part = parts[i].split('=');
            query[decodeURIComponent(part[0])] = decodeURIComponent(part[1] || '');
        }

        return query;
    }
};

// cache some methods to call later on
var toString = Object.prototype.toString;

var validateHelpers = {
    /**
     * is a given value Arguments?
     * @category Validate
     */
    isArguments: function isArguments(value) {
        // fallback check is for IE
        return toString.call(value) === '[object Arguments]' || value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && 'callee' in value;
    },


    /**
     * Check if the given value is an array.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
     */
    isArray: function isArray(value) {
        // check native isArray first
        if (Array.isArray) {
            return Array.isArray(value);
        }

        return toString.call(value) === '[object Array]';
    },
    isArrayIndex: function isArrayIndex(n) {
        return n >>> 0 === n && n !== 0xFFFFFFFF;
    },


    /**
     * Check if the given value is a boolean value.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
     */
    isBoolean: function isBoolean(value) {
        return value === true || value === false || toString.call(value) === '[object Boolean]';
    },


    /**
     * is a given value Char?
     *
     * @category Validate
     */
    isChar: function isChar(value) {
        return this.isString(value) && value.length === 1;
    },


    /**
     * is a given value Date Object?
     *
     * @category Validate
     */
    isDate: function isDate(value) {
        return toString.call(value) === '[object Date]';
    },


    /**
     * is a given object a DOM node?
     *
     * @category Validate
     */
    isDomNode: function isDomNode(object) {
        return this.isObject(object) && object.nodeType > 0;
    },


    /**
     * Check if a string is a valid mail.
     *
     * @category Validate
     * @param {string} email - The string to check
     * @return {boolean}
     */
    isEmail: function isEmail(email) {
        var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        return regex.test(email);
    },


    /**
     * is a given value empty? Objects, arrays, strings
     *
     * @category Validate
     */
    isEmpty: function isEmpty(variable) {
        var emptyVariables = {
            'undefined': true,
            'null': true,
            'number': false,
            'boolean': false,
            'function': false,
            'regexp': false,
            'date': false,
            'error': false
        };

        var strType = globalHelpers.getType(variable);
        var boolReturn = void 0;

        if (emptyVariables.hasOwnProperty(strType)) {
            boolReturn = emptyVariables[strType];
        } else {
            switch (strType) {
                case 'object':
                    boolReturn = this.isObjectEmpty(variable);
                    break;

                case 'string':
                    boolReturn = variable ? false : true;
                    break;

                case 'array':
                    boolReturn = variable.length ? false : true;
                    break;
            }
        }

        return boolReturn;
    },


    /**
     * is a given value Error object?
     *
     * @category Validate
     */
    isError: function isError(value) {
        return toString.call(value) === '[object Error]';
    },


    /**
     * Check if the given value is a function.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a function, else 'false'.
     */
    isFunction: function isFunction(value) {
        // fallback check is for IE
        return toString.call(value) === '[object Function]' || typeof value === 'function';
    },


    /**
     * Check if a string is a valid JSON.
     *
     * @category Validate
     * @param {string} str - The string to check
     * @return {boolean}
     */
    isJson: function isJson(str) {
        try {
            var obj = JSON.parse(str);
            return this.isObject(obj);
        } catch (e) {/* ignore */}

        return false;
    },


    /**
     * is a given value null?
     *
     * @category Validate
     */
    isNull: function isNull(value) {
        return value === null;
    },


    /**
     * Check if the given value is a number.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a number, else 'false'.
     */
    isNumber: function isNumber(value) {
        var isNaN = Number.isNaN || window.isNaN;

        return typeof value === 'number' && !isNaN(value);
    },


    /**
     * Check if the given value is numeric (String or Number).
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a numeric, else 'false'.
     */
    isNumeric: function isNumeric(value) {
        return (/^[0-9]*\.?[0-9]+$/.test(value)
        );
    },


    /**
     * Check if the given value is an object
     *
     * @category Validate
     * @param {*} value - The value to check
     * @return {boolean} Returns 'true' if the given value is an object, else 'false'
     */
    isObject: function isObject(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
    },


    /**
     * Verify if as objects is empty
     *
     * @category Validate
     * @param {object} obj - The object to verify
     * @return {boolean}
     * @example
     *     isObjectEmpty({}); // true
     */
    isObjectEmpty: function isObjectEmpty(obj) {
        if (!this.isObject(obj)) {
            return false;
        }

        for (var x in obj) {
            if ({}.hasOwnProperty.call(obj, x)) {
                return false;
            }
        }

        return true;
    },


    /**
     * Returns whether a value is a percentage.
     *
     * @category Validate
     * @param  {Mix}  percentage - The percentage to test.
     * @return {Boolean}
     */
    isPercentage: function isPercentage(percentage) {
        return this.isNumber(percentage) && percentage <= 100 && percentage >= 0;
    },


    /**
     * Check if the given value is a plain object.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a plain object, else 'false'.
     */
    isPlainObject: function isPlainObject(value) {
        if (!this.isObject(value)) {
            return false;
        }

        try {
            var _constructor = value.constructor;
            var prototype = _constructor.prototype;


            return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
        } catch (e) {
            return false;
        }
    },
    isPrimitive: function isPrimitive(obj, type) {
        type = type || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj));

        return obj == null || type === 'string' || type === 'number' || type === 'boolean';
    },
    isRealNaN: function isRealNaN(obj) {
        // This is only true of NaN
        return obj != null && obj !== obj;
    },


    /**
     * is a given value RegExp?
     *
     * @category Validate
     */
    isRegExp: function isRegExp(value) {
        return toString.call(value) === '[object RegExp]';
    },


    /**
     * are given values same type?
     *
     * @category Validate
     */
    isSameType: function isSameType(value, other) {
        var tag = toString.call(value);

        if (tag !== toString.call(other)) {
            return false;
        }

        return true;
    },


    /**
     * Check if the given value is a string.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
     */
    isString: function isString(value) {
        return toString.call(value) === '[object String]';
    },


    /**
     * Check if the given value is undefined.
     *
     * @category Validate
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is undefined, else 'false'.
     */
    isUndefined: function isUndefined(value) {
        return value === undefined;
    }
};

var arrayHelpers = {
    /**
     * Creates a shallow clone of the array.
     *
     * @param  {Array} arr Array to clone
     * @return {Array}     Array cloned
     */
    arrayClone: function arrayClone(arr) {
        var clone = new Array(arr.length);

        this._forEach(arr, function (el, i) {
            clone[i] = el;
        });

        return clone;
    },


    /**
     * Remove all falsey values from an array.
     *
     * @category Array
     * @param {Array} arr - Array to filter
     * @example
     *     arrayCompact([null, a, undefined, 0, false, b, c, '', true]); // [a, b, c, true]
     */
    arrayCompact: function arrayCompact(arr) {
        if (!Array.isArray(arr)) {
            throw new TypeError('arrayCompact() expects an array.');
        }

        return arr.filter(Boolean);
    },


    /**
     * Returns a flattened, one-dimensional copy of the array.
     * You can optionally specify a limit, which will only flatten to that depth.
     *
     * @param  {Array}   arr              Array to flatten
     * @param  {Integer} level[Infinity]  Depth
     * @return {Array}
     */
    arrayFlatten: function arrayFlatten(arr, level) {
        var self = this;
        var result = [];
        var current = 0;
        level = level || Infinity;

        self._forEach(arr, function (el) {
            if (validateHelpers.isArray(el) && current < level) {
                result = result.concat(self.arrayFlatten(el, level, current + 1));
            } else {
                result.push(el);
            }
        });
        return result;
    },


    /**
     * Returns a new array containing the intersection between two arrays given.
     *
     * @category Array
     * @param {Array} arr1 First array
     * @param {Array} arr2 Second array
     * @return {Array} The intersection
     * @example
     *     arrayIntersection([1, 2, 3], [2, 3, 4]) // [2, 3]
     */
    arrayIntersection: function arrayIntersection(arr1, arr2) {
        return arr1.filter(function (val) {
            return arr2.indexOf(val) !== -1;
        });
    },


    /**
     * Returns a random element from the array.
     * If num is passed, will return an array of num elements.
     * If remove is true, sampled elements will also be removed from the array.
     * remove can also be passed in place of num.
     *
     * @param  {Array} [arr]  Array to sample
     * @param  {Integer|Boolean} [num=1]    Num of elements
     * @param  {Boolean} [remove=false]     Remove sampled elements
     * @return {String|Array}
     */
    arraySample: function arraySample(arr, num, remove) {
        var result = [];
        var _num = void 0;
        var _remove = void 0;
        var single = void 0;

        if (validateHelpers.isBoolean(num)) {
            _remove = num;
        } else {
            _num = num;
            _remove = remove;
        }

        if (validateHelpers.isUndefined(_num)) {
            _num = 1;
            single = true;
        }

        if (!_remove) {
            arr = this.arrayClone(arr);
        }

        _num = Math.min(_num, arr.length);

        for (var i = 0, index; i < _num; i += 1) {
            index = Math.trunc(Math.random() * arr.length);
            result.push(arr[index]);
            arr.splice(index, 1);
        }

        return single ? result[0] : result;
    },


    /**
     * Return an array with unique values
     *
     * @category Array
     * @param {Array} arr - The array
     * @return {Array}
     */
    arrayUnique: function arrayUnique(arr) {
        return arr.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
    },


    /**
     * Creates an array of elements split into groups the length of size.
     * If array can't be split evenly, the final chunk will be the remaining elements.
     *
     * @category Array
     * @param  {Array}    array      The array to proccess.
     * @param  {Integer}  [size=1]   The length of each chunk.
     * @return {Array}               Returns the new array of chunks.
     * @example
     *     chunk(['a', 'b', 'c', 'd'], 2)
     *     // => [['a', 'b'], ['c', 'd']]
     *
     *     chunk(['a', 'b', 'c', 'd'], 3)
     *     // => [['a', 'b', 'c'], ['d']]
     */
    chunk: function chunk(array, size) {
        size = Math.max(size, 0);
        var length = array === null ? 0 : array.length;

        if (!length || size < 1) {
            return [];
        }

        var index = 0;
        var resIndex = 0;
        var result = new Array(Math.ceil(length / size));

        while (index < length) {
            result[resIndex++] = this.slice(array, index, index += size);
        }

        return result;
    },


    /**
     * Removes empty index from a array.
     *
     * @category Array
     * @param {Array} arr - The array
     * @return {Array}
     */
    cleanArray: function cleanArray(array) {
        var newArray = [];

        for (var i = 0, len = array.length; i < len; i += 1) {
            if (array[i]) {
                newArray.push(array[i]);
            }
        }

        return newArray;
    },


    /**
     * Join array elements with glue string - PHP implode alike
     *
     * @category Array
     * @param {object|array} pieces - The array|object to implode.  If object it will implode the values, not the keys.
     * @param {string} [glue=','] - The glue
     * @return {string} The imploded array|object
     * @example
     *     implode(['Foo', 'Bar']); // 'Foo,Bar'
     */
    implode: function implode(pieces, glue) {
        if (validateHelpers.isArray(pieces)) {
            return pieces.join(glue || ',');
        } else if (validateHelpers.isObject(pieces)) {
            var arr = [];
            for (var o in pieces) {
                if (object.hasOwnProperty(o)) {
                    arr.push(pieces[o]);
                }
            }

            return arr.join(glue || ',');
        }

        return '';
    },


    /**
     * Split array elements by separator - PHP implode alike
     *
     * @category Array
     * @param {String} str - String to split
     * @param {string} separator - The separator
     * @param {Number} limit - Limit splitted elements
     * @return {Array} The array with values
     * @example
     *     explode('a', '.', 2); // ['a']
     *     explode('a.b', '.', 2); // ['a', 'b']
     *     explode('a.b.c', '.', 2); // ['a', 'b.c']
     */
    explode: function explode(str, separator, limit) {
        if (!validateHelpers.isString(str)) {
            throw new Error('\'str\' must be a String');
        }

        var arr = str.split(separator);

        if (limit !== undefined && arr.length >= limit) {
            arr.push(arr.splice(limit - 1).join(separator));
        }

        return arr;
    },


    /**
     * Randomize a array elements with Fisher–Yates shuffle algorithm base.
     *
     * @category Array
     * @param {array} array - The array to randomize
     * @return {array} The new modified array
     * @example
     *     const arr = [1, 2, 3, 4];
     *     shuffleArray(arr); // [3, 2, 4, 1]
     */
    shuffleArray: function shuffleArray(array) {
        var j = 0;
        var temp = [];
        var newArray = [];

        for (var i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];

            newArray[i] = array[j];
            newArray[j] = temp;
        }

        return newArray;
    },


    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of
     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are returned.
     *
     * @from Lodash
     *
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position. A negative index will be treated as an offset from the end.
     * @param {number} [end=array.length] The end position. A negative index will be treated as an offset from the end.
     * @returns {Array} Returns the slice of `array`.
     */
    slice: function slice(array, start, end) {
        var length = array == null ? 0 : array.length;

        if (!length) {
            return [];
        }
        start = start == null ? 0 : start;
        end = end === undefined ? length : end;

        if (start < 0) {
            start = -start > length ? 0 : length + start;
        }

        end = end > length ? length : end;

        if (end < 0) {
            end += length;
        }

        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;

        var index = -1;
        var result = new Array(length);

        while (++index < length) {
            result[index] = array[index + start];
        }

        return result;
    },


    // PRIVATE
    _getSparseArrayIndexes: function _getSparseArrayIndexes(arr, fromIndex, loop, fromRight) {
        var indexes = [];
        var i = void 0;

        for (i in arr) {
            // Istanbul ignore next
            if (validateHelpers.isArrayIndex(i) && (loop || (fromRight ? i <= fromIndex : i >= fromIndex))) {
                indexes.push(+i);
            }
        }

        indexes.sort(function (a, b) {
            var aLoop = a > fromIndex;
            var bLoop = b > fromIndex;

            // This block cannot be reached unless ES5 methods are being shimmed.
            // istanbul ignore if
            if (aLoop !== bLoop) {
                return aLoop ? -1 : 1;
            }

            return a - b;
        });

        return indexes;
    },
    _iterateOverSparseArray: function _iterateOverSparseArray(arr, fn, fromIndex, loop) {
        var indexes = this._getSparseArrayIndexes(arr, fromIndex, loop);
        var index = void 0;

        for (var i = 0, len = indexes.length; i < len; i += 1) {
            index = indexes[i];
            fn.call(arr, arr[index], index, arr);
        }

        return arr;
    },
    _forEach: function _forEach(arr, fn) {
        for (var i = 0, len = arr.length; i < len; i += 1) {
            if (!(i in arr)) {
                return this._iterateOverSparseArray(arr, fn, i);
            }

            fn(arr[i], i);
        }
    }
};

// import validateHelpers from './validate-helpers.js';

var numberHelpers = {
    /**
     * Formats an integer number with dots/commas as thousands separators
     *
     * @param  {Integer} num Number to format
     * @param  {String} [separator='.'] Separator
     * @return {String}
     */
    formatNumber: function formatNumber(num, separator) {
        separator = separator || '.';

        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    },


    /**
     * Convert long numbers into a human-readable format, e.g. 25000 to '25K'
     *
     * @from millify
     * @param  {Number} number    Number to format
     * @param  {Integer} [decimal=1]  Decimal places
     * @return {String}
     */
    milify: function milify(number, decimal) {
        var suffixes = new Map();
        suffixes.set(3, 'K');
        suffixes.set(6, 'M');
        suffixes.set(9, 'B');
        suffixes.set(12, 'T');
        suffixes.set(15, 'P');
        suffixes.set(18, 'E');

        // Make sure value is a number
        number = function (num) {
            if (typeof num !== 'number') {
                throw new Error('Input value is not a number');
            }

            return parseFloat(num, 10);
        }(number);

        // Figure out how many digits in the integer
        var digits = Math.floor(Math.log10(Math.abs(number))) + 1;

        // Figure out the appropriate unit for the number
        var units = function (num, zeroes) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = suffixes.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var z = _step.value;

                    if (num > z) {
                        zeroes = z;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return {
                suffix: suffixes.get(zeroes),
                zeroes: zeroes
            };
        }(digits, null);

        var pretty = number / Math.pow(10, units.zeroes);

        decimal = pretty % 1 === 0 ? 2 : Math.max(1, decimal + 1) || 3;

        if (-1000 < number && number < 1000) {
            return number;
        }

        return '' + parseFloat(pretty.toPrecision(decimal)) + units.suffix;
    },


    /**
     * Converts a value to a number if possible.
     *
     * @category Global
     * @param {Mix} value The value to convert.
     * @returns {Number} The converted number, otherwise the original value.
     * @example
     *     toNumber('123') // 123
     *     toNumber('123.456') // 123.456
     */
    toNumber: function toNumber(value) {
        var number = parseFloat(value);
        if (number === undefined) {
            return value;
        }

        if (number.toString().length !== value.toString().length) {
            return value;
        }

        return Number.isNaN(number) ? value : number;
    }
};

var objectHelpers = {
    /**
     * Call Object.freeze(obj) recursively on all unfrozen
     * properties of obj that are functions or objects.
     *
     * @param  {Object} [obj] Object to freeze
     * @return {Object}
     */
    deepFreeze: function deepFreeze(obj) {
        var _this = this;

        Object.freeze(obj);

        Object.getOwnPropertyNames(obj).forEach(function (prop) {
            if (obj.hasOwnProperty(prop) && obj[prop] !== null && (_typeof(obj[prop]) === 'object' || typeof obj[prop] === 'function') && !Object.isFrozen(obj[prop])) {
                _this.deepFreeze(obj[prop]);
            }
        });

        return obj;
    },


    /**
     * Extend the given object
     * @param {object} obj - The object to be extended
     * @param {*} args - The rest objects which will be merged to the first object
     * @return {object} The extended object
     */
    extend: function extend(obj) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        if (validateHelpers.isObject(obj) && args.length > 0) {
            if (Object.assign) {
                return Object.assign.apply(Object, [obj].concat(toConsumableArray(args)));
            }

            args.forEach(function (arg) {
                if (validateHelpers.isObject(arg)) {
                    Object.keys(arg).forEach(function (key) {
                        obj[key] = arg[key];
                    });
                }
            });
        }

        return obj;
    },


    /**
     * A function to take a string written in dot notation style, and use it to
     * find a nested object property inside of an object.
     *
     * @param {Object} obj    The object to search
     * @param {String} path   A dot notation style parameter reference (ie 'a.b.c')
     *
     * @returns the value of the property in question
     */
    getDescendantProp: function getDescendantProp(obj, path) {
        if (!validateHelpers.isPlainObject(obj)) {
            throw new TypeError('\'obj\' param must be an plain object');
        }

        return path.split('.').reduce(function (acc, part) {
            return acc && acc[part];
        }, obj);
    },


    /**
     * Return the length of an item (Object mostly)
     * @param {mixed}
     * @return {int}
     */
    length: function length(item) {
        if (!validateHelpers.isUndefined(item.length)) {
            return item.length;
        }

        if (validateHelpers.isObject(item)) {
            return Object.keys(item).length;
        }

        return 0;
    },


    /**
     * Sorting an array of objects by values
     *
     * @param  {Array}   [arr]              An Array of objects
     * @param  {Mix}     [map]              Map to custom order. If value isn't an array with values, will do natural sort
     * @param  {String}  [key]              Object key to use for sorting (accepts dot notation)
     * @param  {Boolean} [reverse=false]    Reverse sorting
     * @returns {Array}                     New object array with sorting values
     * @example
     *     var mapToSort = ['A', 'B', 'C', 'D', 'E']; // Map to sorting
     *
     *     var obj = [{param: 'D'}, {param: 'A'}, {param: 'E'}, {param: 'C'}, {param: 'B'}];
     *     globalHelpers.objectArraySortByValue(objToSortByValue, mapToSort, 'param');
     *     //=> [{param: 'A'}, {param: 'B'}, {param: 'C'}, {param: 'D'}, {param: 'E'}]
     *
     *     // Deep key
     *     var obj = [{deep: {param: 'D'}}, {deep: {param: 'A'}}, {deep: {param: 'E'}}, {deep: {param: 'C'}}, {deep: {param: 'B'}}];
     *     globalHelpers.objectArraySortByValue(objToSortByValue, mapToSort, 'deep.param');
     *     //=> [{deep: {param: 'A'}}, {deep: {param: 'B'}}, {deep: {param: 'C'}}, {deep: {param: 'D'}}, {deep: {param: 'E'}}]
     */
    objectArraySortByValue: function objectArraySortByValue(arr, map, key) {
        var _this2 = this;

        var reverse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (!validateHelpers.isArray(map) || map.length < 1) {
            var compare = function compare(a, b, n) {
                return _this2.getDescendantProp(a, n).toString().localeCompare(_this2.getDescendantProp(b, n).toString(), undefined, { numeric: true });
            };

            return arr.slice().sort(function (a, b) {
                return reverse ? -compare(a, b, key) : compare(a, b, key);
            });
        }

        return arr.slice().sort(function (a, b) {
            var ordered = map.indexOf(_this2.getDescendantProp(a, key).toString()) - map.indexOf(_this2.getDescendantProp(b, key).toString());

            return reverse ? ordered * -1 : ordered;
        });
    },


    /**
     * Search through an object recursively and return the first match of the key:value passed
     * @access public
     * @param {Object} object - The haystack
     * @param {Object} needle - Key value pair that will be searched
     * @param {Boolean} [caseSensitive=false] Enable/disable case sensitive on search
     * @return {Object}
     * @example
     *     var data = [{
     *         id: 0,
     *         name: 'key 0',
     *         children: [{
     *             id: 1,
     *             name: 'key 1',
     *             children: [{
     *                 id: 2,
     *                 name: 'key 2',
     *                 item: [{
     *                     id: 3,
     *                     name: 'key 3'
     *                 }],
     *                 item: [{
     *                     id: 4,
     *                     name: 'key 4'
     *                 }]
     *             }]
     *         }]
     *     }];
     *     objectSearch(data, {id: 4}); // { id: 4, name: 'key 4'};
     */
    objectSearch: function objectSearch(object, needle) {
        var caseSensitive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var p = void 0;
        var key = void 0;
        var val = void 0;
        var tRet = void 0;
        var normalize = function normalize(str) {
            return caseSensitive ? globalHelpers.camelize(str).toLowerCase() : str;
        };

        for (p in needle) {
            if (needle.hasOwnProperty(p)) {
                key = p;
                val = needle[p];
            }
        }

        for (p in object) {
            if (p === key) {
                if (normalize(object[p]) === normalize(val)) {
                    return object;
                }
            } else if (object[p] instanceof Object) {
                if (object.hasOwnProperty(p)) {
                    tRet = this.objectSearch(object[p], needle, caseSensitive);
                    if (tRet) {
                        return tRet;
                    }
                }
            }
        }

        return false;
    },


    /**
     * Convert object given into an array values
     *
     * @param  {Object}  obj  Object to convert
     * @return {Array}
     * @example
     *     const obj = {a: 'a', b: 'b'};
     *     objectToArray(obj); // ['a', 'b']
     */
    objectToArray: function objectToArray(obj) {
        if (!validateHelpers.isPlainObject(obj)) {
            throw new Error('\'obj\' must be a plain object');
        }

        return Object.keys(obj).map(function (key) {
            return obj[key];
        });
    }
};

/**
 * Create a GlobalHelpers class
 * Javascript utilities methods
 */

var GlobalHelpers = function () {
    function GlobalHelpers() {
        classCallCheck(this, GlobalHelpers);
    }

    createClass(GlobalHelpers, [{
        key: 'isArguments',

        /**
         * Validate type methods
         */
        value: function isArguments(value) {
            return validateHelpers.isArguments(value);
        }
    }, {
        key: 'isArray',
        value: function isArray(value) {
            return validateHelpers.isArray(value);
        }
    }, {
        key: 'isArrayIndex',
        value: function isArrayIndex(n) {
            return validateHelpers.isArrayIndex(n);
        }
    }, {
        key: 'isBoolean',
        value: function isBoolean(value) {
            return validateHelpers.isBoolean(value);
        }
    }, {
        key: 'isChar',
        value: function isChar(value) {
            return validateHelpers.isChar(value);
        }
    }, {
        key: 'isDate',
        value: function isDate(value) {
            return validateHelpers.isDate(value);
        }
    }, {
        key: 'isDomNode',
        value: function isDomNode(object) {
            return validateHelpers.isDomNode(object);
        }
    }, {
        key: 'isEmail',
        value: function isEmail(email) {
            return validateHelpers.isEmail(email);
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty(variable) {
            return validateHelpers.isEmpty(variable);
        }
    }, {
        key: 'isError',
        value: function isError(value) {
            return validateHelpers.isError(value);
        }
    }, {
        key: 'isFunction',
        value: function isFunction(value) {
            return validateHelpers.isFunction(value);
        }
    }, {
        key: 'isJson',
        value: function isJson(str) {
            return validateHelpers.isJson(str);
        }
    }, {
        key: 'isNull',
        value: function isNull(value) {
            return validateHelpers.isNull(value);
        }
    }, {
        key: 'isNumber',
        value: function isNumber(value) {
            return validateHelpers.isNumber(value);
        }
    }, {
        key: 'isNumeric',
        value: function (_isNumeric) {
            function isNumeric(_x) {
                return _isNumeric.apply(this, arguments);
            }

            isNumeric.toString = function () {
                return _isNumeric.toString();
            };

            return isNumeric;
        }(function (value) {
            return isNumeric(value);
        })
    }, {
        key: 'isObject',
        value: function isObject(value) {
            return validateHelpers.isObject(value);
        }
    }, {
        key: 'isObjectEmpty',
        value: function isObjectEmpty(obj) {
            return validateHelpers.isObjectEmpty(obj);
        }
    }, {
        key: 'isPercentage',
        value: function isPercentage(percentage) {
            return validateHelpers.isPercentage(percentage);
        }
    }, {
        key: 'isPlainObject',
        value: function isPlainObject(value) {
            return validateHelpers.isPlainObject(value);
        }
    }, {
        key: 'isPrimitive',
        value: function isPrimitive(obj, type) {
            return validateHelpers.isPrimitive(obj, type);
        }
    }, {
        key: 'isRealNaN',
        value: function isRealNaN(obj) {
            return validateHelpers.isRealNaN(obj);
        }
    }, {
        key: 'isRegExp',
        value: function isRegExp(value) {
            return validateHelpers.isRegExp(value);
        }
    }, {
        key: 'isSameType',
        value: function isSameType(value, other) {
            return validateHelpers.isSameType(value, other);
        }
    }, {
        key: 'isString',
        value: function isString(value) {
            return validateHelpers.isString(value);
        }
    }, {
        key: 'isUndefined',
        value: function isUndefined(value) {
            return validateHelpers.isUndefined(value);
        }

        /**
         * Global Methods
         */

    }, {
        key: 'arrayClone',
        value: function arrayClone(arr) {
            return arrayHelpers.arrayClone(arr);
        }
    }, {
        key: 'arrayCompact',
        value: function arrayCompact(arr) {
            return arrayHelpers.arrayCompact(arr);
        }
    }, {
        key: 'arrayFlatten',
        value: function arrayFlatten(arr, level) {
            return arrayHelpers.arrayFlatten(arr, level);
        }
    }, {
        key: 'arrayIntersection',
        value: function arrayIntersection(arr1, arr2) {
            return arrayHelpers.arrayIntersection(arr1, arr2);
        }
    }, {
        key: 'arraySample',
        value: function arraySample(arr, arg1, arg2) {
            return arrayHelpers.arraySample(arr, arg1, arg2);
        }
    }, {
        key: 'arrayUnique',
        value: function arrayUnique(arr) {
            return arrayHelpers.arrayUnique(arr);
        }
    }, {
        key: 'camelize',
        value: function camelize(str) {
            return globalHelpers.camelize(str);
        }
    }, {
        key: 'capitalize',
        value: function capitalize(str) {
            return stringHelpers.capitalize(str);
        }
    }, {
        key: 'chunk',
        value: function chunk(array, size) {
            return arrayHelpers.chunk(array, size);
        }
    }, {
        key: 'cleanArray',
        value: function cleanArray(array) {
            return arrayHelpers.cleanArray(array);
        }
    }, {
        key: 'contains',
        value: function contains(value, elem) {
            return globalHelpers.contains(value, elem);
        }
    }, {
        key: 'debounce',
        value: function debounce(func, wait, options) {
            return globalHelpers.debounce(func, wait, options);
        }
    }, {
        key: 'deepFreeze',
        value: function deepFreeze(obj) {
            return objectHelpers.deepFreeze(obj);
        }
    }, {
        key: 'escape',
        value: function escape(str) {
            return stringHelpers.escape(str);
        }
    }, {
        key: 'extend',
        value: function extend(obj) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return objectHelpers.extend.apply(objectHelpers, [obj].concat(args));
        }
    }, {
        key: 'formatNumber',
        value: function formatNumber(num, separator) {
            return numberHelpers.formatNumber(num, separator);
        }
    }, {
        key: 'getDescendantProp',
        value: function getDescendantProp(obj, path) {
            return objectHelpers.getDescendantProp(obj, path);
        }
    }, {
        key: 'getType',
        value: function getType(variable) {
            return globalHelpers.getType(variable);
        }
    }, {
        key: 'getUrlParameter',
        value: function getUrlParameter(name, entryPoint) {
            return globalHelpers.getUrlParameter(name, entryPoint);
        }
    }, {
        key: 'implode',
        value: function implode(pieces, glue) {
            return arrayHelpers.implode(pieces, glue);
        }
    }, {
        key: 'explode',
        value: function explode(str, separator, limit) {
            return arrayHelpers.explode(str, separator, limit);
        }
    }, {
        key: 'length',
        value: function length(item) {
            return objectHelpers.length(item);
        }
    }, {
        key: 'milify',
        value: function milify(ugly, decimal) {
            return numberHelpers.milify(ugly, decimal);
        }
    }, {
        key: 'normalizeText',
        value: function normalizeText(str) {
            return stringHelpers.normalizeText(str);
        }
    }, {
        key: 'objectArraySortByValue',
        value: function objectArraySortByValue(arr, map, key, reverse) {
            return objectHelpers.objectArraySortByValue(arr, map, key, reverse);
        }
    }, {
        key: 'objectSearch',
        value: function objectSearch(object, needle) {
            return objectHelpers.objectSearch(object, needle);
        }
    }, {
        key: 'objectToArray',
        value: function objectToArray(obj) {
            return objectHelpers.objectToArray(obj);
        }
    }, {
        key: 'pad',
        value: function pad(number, size) {
            return stringHelpers.pad(number, size);
        }
    }, {
        key: 'removeAccent',
        value: function removeAccent(str) {
            return stringHelpers.removeAccent(str);
        }
    }, {
        key: 'resizeImageByRatio',
        value: function resizeImageByRatio(type, newValue, aspectRatio, decimals) {
            return globalHelpers.resizeImageByRatio(type, newValue, aspectRatio, decimals);
        }
    }, {
        key: 'semverCompare',
        value: function semverCompare(v1, v2) {
            return globalHelpers.semverCompare(v1, v2);
        }
    }, {
        key: 'shuffleArray',
        value: function shuffleArray(array) {
            return arrayHelpers.shuffleArray(array);
        }
    }, {
        key: 'slice',
        value: function slice(array, start, end) {
            return arrayHelpers.slice(array, start, end);
        }
    }, {
        key: 'slugifyText',
        value: function slugifyText(str) {
            return stringHelpers.slugifyText(str);
        }
    }, {
        key: 'stripHost',
        value: function stripHost(url) {
            return globalHelpers.stripHost(url);
        }
    }, {
        key: 'stripHttp',
        value: function stripHttp(url) {
            return globalHelpers.stripHttp(url);
        }
    }, {
        key: 'strCompact',
        value: function strCompact(str) {
            return stringHelpers.strCompact(str);
        }
    }, {
        key: 'strReplace',
        value: function strReplace(search, replace, subject) {
            return stringHelpers.strReplace(search, replace, subject);
        }
    }, {
        key: 'throttle',
        value: function throttle(func, wait, options) {
            return globalHelpers.throttle(func, wait, options);
        }
    }, {
        key: 'times',
        value: function times(n, iteratee) {
            return globalHelpers.times(n, iteratee);
        }
    }, {
        key: 'toNumber',
        value: function toNumber(value) {
            return numberHelpers.toNumber(value);
        }
    }, {
        key: 'trim',
        value: function trim(str) {
            return stringHelpers.trim(str);
        }
    }, {
        key: 'ucfirst',
        value: function ucfirst(str) {
            return stringHelpers.ucfirst(str);
        }
    }, {
        key: 'underscore',
        value: function underscore(str) {
            return stringHelpers.underscore(str);
        }
    }, {
        key: 'unescape',
        value: function unescape(str) {
            return stringHelpers.unescape(str);
        }
    }, {
        key: 'unserialize',
        value: function unserialize(str) {
            return globalHelpers.unserialize(str);
        }
    }]);
    return GlobalHelpers;
}();

var _regionMap;

var CONSTANTS = {
    STORAGE_NAME: '__location',
    EXPIRE_TIME: 60 * 60 * 4 // Seconds * Minutes * Hours (default: 4h)
};

var locationHelpers = {
    /**
     * Get user location by HTML5 Geolocate API and translate coordinates to
     * Brazilian State, City and Region
     *
     * @return {Promise}  When success, response are an object with State, City, Region and user Coordinates
     * @example
     *     locationHelpers.getCityState()
     *         .then(function(res) {
     *             window.console.log(res);
     *         })
     *         .fail(function(err) {
     *             window.console.log(err);
     *         });
     */
    getUserLocation: function getUserLocation(cache, storage) {
        var _this = this;

        if (cache) {
            this._initLocationStorage(storage);
        }

        var store = storage.session.get(CONSTANTS.STORAGE_NAME);

        /* eslint-disable */
        return $.Deferred(function (def) {
            /* eslint-enable */
            if (!validateHelpers.isObjectEmpty(store)) {
                def.resolve(store);
            } else {
                if (window.navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var lat = position.coords.latitude;
                        var lng = position.coords.longitude;

                        if (!window.google) {
                            return def.reject('Google Maps Javascript API not found. Follow tutorial: https://developers.google.com/maps/documentation/javascript');
                        }

                        var latlng = new google.maps.LatLng(lat, lng);
                        var geocoder = new google.maps.Geocoder();

                        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {
                                if (results[1]) {
                                    for (var i = 0, len = results.length; i < len; i += 1) {
                                        if (results[i].types[0] === 'locality') {
                                            var city = results[i].address_components[0].short_name;
                                            var state = results[i].address_components[2].short_name;
                                            var storeLocation = {
                                                coords: { lat: lat, lng: lng },
                                                city: city,
                                                state: state,
                                                region: _this.filteredRegion(state)
                                            };

                                            if (cache) {
                                                storage.session.set(CONSTANTS.STORAGE_NAME, storeLocation, CONSTANTS.EXPIRE_TIME);
                                            }

                                            def.resolve(storeLocation);
                                        }
                                    }
                                } else {
                                    def.reject('No reverse geocode results.');
                                }
                            } else {
                                def.reject('Geocoder failed: ' + status);
                            }
                        });
                    }, function (err) {
                        def.reject('Geolocation not available.');
                    });
                } else {
                    def.reject('Geolocation isn\'t available');
                }
            }
        }).promise();
    },


    /**
     * Get Brazilian region for an state initials given
     *
     * @param  {String}  state  Initials state (e.g. 'SP')
     * @return {String}         Region (Norte, Sul, etc.)
     * @example
     *     locationHelpers.filteredRegion('SP'); // Sudeste
     */
    filteredRegion: function filteredRegion(state) {
        var _this2 = this;

        this._validateStateInitials(state);

        var filteredRegion = '';

        var _loop = function _loop(region) {
            if ({}.hasOwnProperty.call(_this2._regionMap, region)) {
                _this2._regionMap[region].some(function (el, i, arr) {
                    if (stringHelpers.removeAccent(el.toLowerCase()) === stringHelpers.removeAccent(state.toLowerCase())) {
                        filteredRegion = region;
                    }
                });
            }
        };

        for (var region in this._regionMap) {
            _loop(region);
        }

        return filteredRegion;
    },


    /**
     * Get Brazilian name state and region for an state initials given
     *
     * @param  {String}  state  Initials state (e.g. 'SP')
     * @return {Object}         Object with state name, state initials and state region
     * @example
     *     locationHelpers.filteredState('SP') // {initials: 'SP', name: 'São Paulo', region: 'Sudeste'}
     */
    filteredState: function filteredState(state) {
        this._validateStateInitials(state);

        return objectHelpers.objectSearch(this._stateMap, { name: state }, true);
    },
    getStates: function getStates() {
        return this._stateMap;
    },
    getRegions: function getRegions() {
        return this._regionMap;
    },


    /**
     * Validate if state is an initials
     *
     * @param  {String} state State to validate
     * @return {Error}        Return an error if state not an initials
     */
    _validateStateInitials: function _validateStateInitials(state) {
        if (state.length < 2) {
            throw new Error('\'state\' must be two letters. e.g. \'SP\' or full state name');
        }
    },


    _stateMap: [{ name: 'Acre', initials: 'AC', region: 'Norte' }, { name: 'Alagoas', initials: 'AL', region: 'Nordeste' }, { name: 'Amapá', initials: 'AP', region: 'Norte' }, { name: 'Amazonas', initials: 'AM', region: 'Norte' }, { name: 'Bahia', initials: 'BA', region: 'Nordeste' }, { name: 'Ceará', initials: 'CE', region: 'Nordeste' }, { name: 'Distrito Federal', initials: 'DF', region: 'Centro Oeste' }, { name: 'Espírito Santo', initials: 'ES', region: 'Sudeste' }, { name: 'Goiás', initials: 'GO', region: 'Centro Oeste' }, { name: 'Maranhão', initials: 'MA', region: 'Nordeste' }, { name: 'Mato Grosso', initials: 'MT', region: 'Centro Oeste' }, { name: 'Mato Grosso do Sul', initials: 'MS', region: 'Centro Oeste' }, { name: 'Minas Gerais', initials: 'MG', region: 'Sudeste' }, { name: 'Pará', initials: 'PA', region: 'Norte' }, { name: 'Paraíba', initials: 'PB', region: 'Nordeste' }, { name: 'Paraná', initials: 'PR', region: 'Sul' }, { name: 'Pernambuco', initials: 'PE', region: 'Nordeste' }, { name: 'Piauí', initials: 'PI', region: 'Nordeste' }, { name: 'Rio de Janeiro', initials: 'RJ', region: 'Sudeste' }, { name: 'Rio Grande do Norte', initials: 'RN', region: 'Nordeste' }, { name: 'Rio Grande do Sul', initials: 'RS', region: 'Sul' }, { name: 'Rondônia', initials: 'RO', region: 'Norte' }, { name: 'Roraima', initials: 'RR', region: 'Norte' }, { name: 'Santa Catarina', initials: 'SC', region: 'Sul' }, { name: 'São Paulo', initials: 'SP', region: 'Sudeste' }, { name: 'Sergipe', initials: 'SE', region: 'Nordeste' }, { name: 'Tocantins', initials: 'TO', region: 'Norte' }],

    _regionMap: (_regionMap = {}, defineProperty(_regionMap, 'Norte', ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO']), defineProperty(_regionMap, 'Nordeste', ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE']), defineProperty(_regionMap, 'Centro Oeste', ['DF', 'GO', 'MT', 'MS']), defineProperty(_regionMap, 'Sudeste', ['ES', 'MG', 'RJ', 'SP']), defineProperty(_regionMap, 'Sul', ['PR', 'RS', 'SC']), _regionMap),

    _initLocationStorage: function _initLocationStorage(storage) {
        if (validateHelpers.isNull(storage.session.get(CONSTANTS.STORAGE_NAME))) {
            storage.session.set(CONSTANTS.STORAGE_NAME, {});
        }
    }
};

/**
 * Create a LocationHelpers class
 */

var LocationHelpers = function () {
    function LocationHelpers(store) {
        classCallCheck(this, LocationHelpers);

        this._storage = store;
    }

    createClass(LocationHelpers, [{
        key: 'getUserLocation',
        value: function getUserLocation(cache) {
            return locationHelpers.getUserLocation(cache, this._storage);
        }
    }, {
        key: 'getStates',
        value: function getStates() {
            return locationHelpers.getStates();
        }
    }, {
        key: 'getRegions',
        value: function getRegions() {
            return locationHelpers.getRegions();
        }
    }, {
        key: 'filteredState',
        value: function filteredState(state) {
            return locationHelpers.filteredState(state);
        }
    }, {
        key: 'filteredRegion',
        value: function filteredRegion(state) {
            return locationHelpers.filteredRegion(state);
        }
    }]);
    return LocationHelpers;
}();

/**
 * Create a Utilify class
 * Main class
 */

var Utilify = function Utilify() {
  classCallCheck(this, Utilify);

  /**
   * Version
   * @type {String}
   */
  this.version = '0.7.1';

  /**
   * Package name
   * @type {String}
   */
  this.name = '@UtilifyJS';

  /**
   * Global Helpers instance
   * @type {GlobalHelpers}
   */
  this.globalHelpers = new GlobalHelpers();

  /**
   * Location Helpers instance
   * @type {LocationHelpers}
   */
  this.locationHelpers = new LocationHelpers(store);

  /**
   * Local/Session Storage
   * @type {Object}
   */
  this.storage = store;
};

return Utilify;

})));
});

var utilify$1 = new utilify();

var globalHelpers = utilify$1.globalHelpers;

var CONSTANTS = {
    CAMELIZE: 'You must set camelize your items to use this method'
};

var vtexHelpers = {
    /**
     * Formats Vtex price
     *
     * @param {integer}             number              The number to format
     * @param {string}              [thousands = '.']   The thousands delimiter
     * @param {string}              [decimals = ',']    The decimal delimiter
     * @param {integer}             [length = 2]        The length of decimal
     * @param {string}              [currency = 'R$ ']  Set currency
     * @return {string} The formatted price
     */
    formatPrice: function formatPrice(number, thousands, decimals, length, currency) {
        currency = globalHelpers.isString(currency) ? currency : 'R$ ';
        length = !globalHelpers.isNumber(length) ? 2 : length;

        var re = '\\d(?=(\\d{' + 3 + '})+' + (length > 0 ? '\\D' : '$') + ')';
        number = number / 100;
        number = (number * 1).toFixed(Math.max(0, ~~length));

        return currency + number.replace('.', decimals || ',').replace(new RegExp(re, 'g'), '$&' + (thousands || '.'));
    },


    /**
     * Unformat Vtex price
     *
     * @param {String|Array}    value                 Price formatted
     * @param {string}          [decimal=',']         The decimal delimiter
     * @param {integer}         [formatNumber=false]  Thousands separator (pt-BR default: '.')
     * @return {string|Array}   The unformatted price
     */
    unformatPrice: function unformatPrice(value, decimal) {
        var _this = this;

        var formatNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        // Recursively unformat arrays:
        if (globalHelpers.isArray(value)) {
            return value.map(function (val) {
                return _this.unformatPrice(val, decimal, formatNumber);
            });
        }

        // Fails silently (need decent errors):
        value = value || 0;

        // Return the value as-is if it's already a number:
        if (globalHelpers.isNumber(value)) {
            return value;
        }

        decimal = decimal || ',';

        // Build regex to strip out everything except digits, decimal point and minus sign:
        var format = '[^0-9-' + decimal + ']';
        var regex = new RegExp(format, ['g']);
        var unformatted = parseFloat(('' + value).replace(/\((?=\d+)(.*)\)/, '-$1') // Replace bracketed values with negatives
        .replace(regex, '') // Strip out any cruft
        .replace(decimal, '.') // Make sure decimal point is standard
        ).toFixed(2);

        var values = unformatted.toString().split('.');

        return {
            unformatted: globalHelpers.toNumber(values.join('')) * 1,
            real: formatNumber ? globalHelpers.formatNumber(values[0]) : values[0],
            cents: values[1] || '00'
        };
    },


    /**
     * Take the value of the installment with min price and max installments given
     *
     * @param {String|Number} price             Price to get installments. Can be formatted price or a integer value
     * @param {String|Number} minPrice          Min price for each installment. Can be formatted price or a integer value
     * @param {Number}        maxInstallments   Max installments
     * @param {Number}        [interest=0]      Interest rate
     * @returns {Object}
     * @example
     *     setInstallment('R$ 3.499,00', 'R$ 430,00', 10) // {installments: 8, installmentValue: 43737, interest: 0}
     *     setInstallment(349900, 43000, 10) // {installments: 8, installmentValue: 43737, interest: 0}
     */
    setInstallment: function setInstallment(price, minPrice, maxInstallments) {
        var interest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        price = globalHelpers.isString(price) ? this.unformatPrice(price).unformatted : price;
        minPrice = globalHelpers.isString(minPrice) ? this.unformatPrice(minPrice).unformatted : minPrice;
        minPrice = minPrice < 1 ? 1 : minPrice;

        maxInstallments = globalHelpers.toNumber(maxInstallments);
        interest = globalHelpers.toNumber(interest);

        var installments = parseInt(price / minPrice, 10);

        if (installments > maxInstallments) {
            installments = maxInstallments;
        }

        var installmentValue = price / installments;

        if (interest > 0) {
            installmentValue = price * Math.pow(1 + interest / 100, installments) / installments;
        }

        installmentValue = Math.floor(installmentValue);

        if (installments > 0) {
            return {
                installments: installments,
                installmentValue: installmentValue,
                interest: interest
            };
        }

        return false;
    },


    /**
     * Get the percentage of a discount
     *
     * @param  {String|Number}    oldPrice    Original price. Can be formatted price or a integer value.
     * @param  {String|Number}    newPrice    Price with discount. Can be formatted price or a integer value.
     * @param  {Number}           [length=0]  Number of decimals
     * @returns {Number}
     * @example
     *     getPercentage('R$ 179,90', 'R$ 149,50'); // 17 (17% OFF)
     *     getPercentage(17990, 14900, 2); // 17.18 (17.18% OFF)
     */
    getPercentage: function getPercentage(oldPrice, newPrice) {
        var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        if (oldPrice < newPrice || oldPrice < 1 || newPrice < 1) {
            return 0;
        }

        oldPrice = globalHelpers.isString(oldPrice) ? this.unformatPrice(oldPrice).unformatted : oldPrice;
        newPrice = globalHelpers.isString(newPrice) ? this.unformatPrice(newPrice).unformatted : newPrice;
        var percent = parseFloat(newPrice / oldPrice * 100 - 100);

        return Math.abs(percent.toFixed(length));
    },


    /**
     * Returns a discount amount or adding a set value.
     *
     * @param  {String|Number}   price     Price to apply discount. Can be formatted price or a integer value.
     * @param  {String|Number}   percent   Percentage to apply. Can be formatted price or a integer value.
     * @param  {Boolean}         [formatted=false]   Format result
     * @return {Object}
     * @example
     *     applyDiscountPercent('R$ 9,55', 37.27); // {discountPrice: 355, priceWithDiscount: 599, priceWithIncrease: 1310}
     *     applyDiscountPercent('R$ 9,55', '37.27%'); // {discountPrice: 355, priceWithDiscount: 599, priceWithIncrease: 1310}
     *     applyDiscountPercent('R$ 9,55', '37,27%'); // {discountPrice: 355, priceWithDiscount: 599, priceWithIncrease: 1310}
     *     applyDiscountPercent(955, 37.27, true); // {discountPrice: 'R$ 3,55', priceWithDiscount: 'R$ 5,99', priceWithIncrease: 'R$ 13,10'}
     */
    applyDiscountPercent: function applyDiscountPercent(price, percent) {
        var formatted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var getNumber = function getNumber(str) {
            return str.replace(/,/g, '.').replace(/[^0-9.]/g, '');
        };
        price = globalHelpers.isString(price) ? this.unformatPrice(price).unformatted : price;
        percent = globalHelpers.isString(percent) ? globalHelpers.toNumber(getNumber(percent)) : percent;

        var discount = percent / 100 * price;
        var discountPrice = Math.floor(discount);
        var priceWithDiscount = Math.floor(price - discount);
        var priceWithIncrease = Math.floor(price + discount);

        return {
            discountPrice: !formatted ? discountPrice : this.formatPrice(discountPrice),
            priceWithDiscount: !formatted ? priceWithDiscount : this.formatPrice(priceWithDiscount),
            priceWithIncrease: !formatted ? priceWithIncrease : this.formatPrice(priceWithIncrease)
        };
    },


    /**
     * Formats price from Vtex API `/api/catalog_system/pub/products/search/`
     * to a correct `formatPrice` method
     *
     * @param  {Number} val Value to convert
     * @return {Integer}
     */
    fixProductSearchPrice: function fixProductSearchPrice(val) {
        val = globalHelpers.toNumber(val);
        return val.toFixed(2).split('.').join('') * 1;
    },


    /**
     * Get first available SKU from Vtex API `/api/catalog_system/` end point
     *
     * @param  {Object}  product     Product full data
     * @return {Object|Boolean}      An available SKU data or false
     */
    getFirstAvailableSku: function getFirstAvailableSku(product) {
        if (!this._checkCamelize(product)) {
            throw new Error(CONSTANTS.CAMELIZE);
        }

        var newArr = {};

        if (product.hasOwnProperty('items')) {
            product.items.some(function (item, index, oldArr) {
                if (item.sellers[0].commertialOffer.availableQuantity > 0) {
                    newArr = oldArr[index];
                    return true;
                }

                return false;
            });
        }

        if (product.hasOwnProperty('skus')) {
            product.skus.some(function (item, index, oldArr) {
                if (item.available) {
                    newArr = oldArr[index];
                    return true;
                }

                return false;
            });
        }

        if (globalHelpers.length(newArr) > 0) {
            return newArr;
        }

        return false;
    },


    /**
     * Get the original VTEX image source from a thumb
     *
     * @param {string}      [src]   The source of the thumb
     * @return {string} The original image source
     * @example
     *     vtexHelpers.getOriginalImage('http://domain.vteximg.com.br/arquivos/ids/155242-292-292/image.png');
     *     // http://domain.vteximg.com.br/arquivos/ids/155242/image.png
     */
    getOriginalImage: function getOriginalImage(src) {
        return globalHelpers.isString(src) ? src.replace(/(ids\/[0-9]+)-([0-9-]+)\//, '$1/') : src;
    },


    /**
     * Change the width & height from a given VTEX image source
     *
     * @param {string}      [src]       The source of the image
     * @param {int|string}  [width]     The new image with
     * @param {int|string}  [height]    The new image height
     * @return {string} The resized image source
     * @example
     *     vtexHelpers.getResizedImage('http://domain.vteximg.com.br/arquivos/ids/155242-292-292/image.png', 500, 600);
     *     // http://domain.vteximg.com.br/arquivos/ids/155242-500-600/image.png
     *
     *     vtexHelpers.getResizedImage('http://domain.vteximg.com.br/arquivos/ids/155242/image.png', 100, 100);
     *     // http://domain.vteximg.com.br/arquivos/ids/155242-100-100/image.png
     */
    getResizedImage: function getResizedImage(src, width, height) {
        if (globalHelpers.isUndefined(width) || globalHelpers.isUndefined(height) || !globalHelpers.isString(src)) {
            return src;
        }

        width = Math.round(width);
        height = Math.round(height);

        src = src.replace(/(?:ids\/[0-9]+)-([0-9]+)-([0-9]+)\//, function (match, matchedWidth, matchedHeight) {
            return match.replace('-' + matchedWidth + '-' + matchedHeight, '-' + width + '-' + height);
        });

        return src.replace(/(ids\/[0-9]+)\//, '$1-' + width + '-' + height + '/');
    },


    /**
     * Resize proportionally an VTEX image by aspect ratio
     *
     * @param {string}      [src]               The source of the image
     * @param {String}      [type]              Type to resize (width or height)
     * @param {Number}      [newSize]           New size to redimensioning
     * @param  {Number}     [aspectRatio]       Image aspect ratio (calculate by (width / height))
     * @return {string}                         The resized image source
     * @example
     *     var imgSrc = 'http://domain.vteximg.com.br/arquivos/ids/155242/image.png';
     *     vtexHelpers.getResizeImageProportionally(imgSrc, 'width', 150, (10/15));
     *     // http://domain.vteximg.com.br/arquivos/ids/155242-150-225/image.png
     *
     *     vtexHelpers.getResizeImageProportionally(imgSrc, 'height', 150, (10/15));
     *     // http://domain.vteximg.com.br/arquivos/ids/155242-99-150/image.png
     */
    getResizeImageByRatio: function getResizeImageByRatio(src, type, newSize, aspectRatio) {
        var newValue = globalHelpers.resizeImageByRatio(type, newSize, aspectRatio);

        return this.getResizedImage(src, newValue.width, newValue.height);
    },


    /**
     * Get the Vtex server time
     * @param {function} callback - The callback to call when the request finishes. The callback will a javascript Date object.
     * @return {promise} - jquery Ajax promise
     * @example
     *     vtexHelpers.getServerTime((date) => console.log(date.getFullYear()));
     */
    getServerTime: function getServerTime(callback) {
        return $.ajax({
            url: '/no-cache/HoraAtualServidor.aspx',
            type: 'get'
        }).then(function (res) {
            var monthBr = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

            var time = res.match(/([0-9]+):([0-5][0-9]):([0-5][0-9])/)[0];
            var day = parseInt(res.match(/[a-z]{3} ([0-9]{1,2})/)[1]);
            var month = monthBr.indexOf(res.match(/[a-z]{3}/)[0]) + 1;
            var year = parseInt(res.match(/[0-9]{4}/)[0]);

            if (day < 10) {
                day = '0' + day;
            }

            if (month < 10) {
                month = '0' + month;
            }

            if (globalHelpers.isFunction(callback)) {
                callback.call(null, new Date(year + '/' + month + '/' + day + ' ' + time));
            }
        });
    },


    /**
     * Get category tree
     * @param [categoryId] - Return the specific Category
     * @param [depth=50] - The tree depth
     * @return {promise} Promise
     * @example
     *     vtexHelpers.getCategories().then((res) => console.log(res)) // Return all categories
     *     vtexHelpers.getCategories(1000001, 1).then((res) => console.log(res)) // Return 1 level from category id
     */
    getCategories: function getCategories(categoryId, depth) {
        /* eslint-disable */
        return $.Deferred(function (def) {
            /* eslint-enable */
            return $.ajax({
                type: 'get',
                url: '/api/catalog_system/pub/category/tree/' + (depth || 50),
                dataType: 'json',
                headers: {
                    accept: 'application/json',
                    contentType: 'application/json; charset=utf-8'
                }
            }).done(function (res) {
                if (!globalHelpers.isUndefined(categoryId)) {
                    def.resolve(globalHelpers.objectSearch(res, {
                        id: categoryId
                    }));
                } else {
                    def.resolve(res);
                }
            }).fail(function (err) {
                return def.reject(err);
            });
        }).promise();
    },


    /**
     * Get product specification
     *
     * @param {Object}           [data]              Vtex API data from '/api/catalog_system/pub/products/search/' endpoint
     * @param {String}           [specName]          Specification name
     * @param {Boolean|String}   [defaultValue]      Value if spec doesn't exists
     * @returns spec value or false/defaultVal if spec doesn't exists
     */
    getProductSpec: function getProductSpec(data, specName) {
        var defaultVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (globalHelpers.isUndefined(data[specName])) {
            return defaultVal;
        }

        if (globalHelpers.contains(specName, data.allSpecifications)) {
            var specValue = data[specName] && data[specName][0];

            return !globalHelpers.isUndefined(specValue) ? specValue : defaultVal;
        }

        return defaultVal;
    },


    /**
     * Method to use with VtexCatalog
     *
     * Full methods:
     *     const sellerInfo = vtexHelpers.getProductSellerInfo(productData);
     *     const installments = vtexHelpers.getProductInstallments(sellerInfo) || vtexHelpers.getProductInstallments(productData);
     *     const bankInvoice = vtexHelpers.getProductBankInvoice(productData);
     *     const priceInfo = vtexHelpers.getProductPriceInfo(sellerInfo);
     *     const groupedInstallments = vtexHelpers.getGroupInstallments(productData);
     */
    getProductSellerInfo: function getProductSellerInfo(product) {
        var sellerId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var seller = sellerId ? sellerId : true;
        var sellerKey = sellerId ? 'sellerId' : 'sellerDefault';
        var availableProduct = this.getFirstAvailableSku(product);

        if (availableProduct) {
            return globalHelpers.objectSearch(availableProduct, defineProperty({}, sellerKey, seller));
        }

        return false;
    },


    /**
     * Method to use with VtexCatalog
     */
    getProductInstallments: function getProductInstallments(data) {
        var sellerId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var commertialOffer = this._getCommertialInfo(data, sellerId);

        if (globalHelpers.isUndefined(commertialOffer)) {
            return false;
        }

        // Get by min price value
        return commertialOffer.installments.reduce(function (prev, current) {
            return prev.value < current.value ? prev : current;
        }, {});
    },


    /**
     * Method to use with VtexCatalog
     */
    getProductBankInvoice: function getProductBankInvoice(product) {
        var sellerId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var sellerInfo = this.getProductSellerInfo(product, sellerId);

        if (sellerInfo) {
            return globalHelpers.objectSearch(sellerInfo.commertialOffer.installments, { paymentSystemName: 'Boleto Bancário' });
        }

        return false;
    },


    /**
     * Method to use with VtexCatalog
     */
    getProductPriceInfo: function getProductPriceInfo(sellerInfo) {
        if (!sellerInfo) {
            return false;
        }

        var co = sellerInfo.commertialOffer;

        var installments = this.getProductInstallments(sellerInfo);
        var isInstallments = !globalHelpers.isObjectEmpty(installments);
        var qty = co.availableQuantity;
        var noListPrice = co.price === co.listPrice;
        var fix = this.fixProductSearchPrice;
        var format = this.formatPrice;

        return {
            available: qty ? true : false,
            availableQuantity: qty,

            sellerName: sellerInfo.sellerName,
            sellerId: sellerInfo.sellerId,

            bestPrice: qty ? fix(co.price) : 0,
            listPrice: qty ? noListPrice ? false : fix(co.listPrice) : 0,

            installments: qty && isInstallments ? installments.numberOfInstallments : 0,
            installmentsInsterestRate: qty && isInstallments ? installments.interestRate : null,
            installmentsValue: qty && isInstallments ? fix(installments.value) : 0,

            bestPriceFormatted: qty ? format(fix(co.price)) : format(0),
            listPriceFormatted: qty ? noListPrice ? false : format(fix(co.listPrice)) : noListPrice ? false : format(0),
            installmentsValueFormatted: qty && isInstallments ? format(fix(installments.value)) : format(0)
        };
    },


    /**
     * Method to use with VtexCatalog
     */
    getGroupInstallments: function getGroupInstallments(data, sellerId) {
        var commertialOffer = this._getCommertialInfo(data, sellerId);

        if (globalHelpers.isUndefined(commertialOffer)) {
            return false;
        }

        var groupedInstallments = commertialOffer.installments.reduce(function (r, a) {
            r[a.paymentSystemName] = r[a.paymentSystemName] || [];
            r[a.paymentSystemName].push(a);
            return r;
        }, Object.create(null));

        return globalHelpers.camelize(groupedInstallments);
    },
    getShipping: function getShipping(postalCode, skuId, quantity) {
        if ('skuJson' in window) {
            var firstSku = this.getFirstAvailableSku(skuJson);
            skuId = skuId || firstSku.sku;
        }

        /* eslint-disable */
        return $.Deferred(function (def) {
            /* eslint-enable */
            return $.ajax({
                type: 'get',
                url: '/frete/calcula/' + skuId,
                data: {
                    shippinCep: postalCode.replace(/[^A-Za-z0-9]/g, ''),
                    quantity: quantity || 1
                }
            }).then(function (res) {
                var $html = $($.parseHTML(res));
                var $tr = $html.find('tbody > tr');
                var $p = $html.find('.valor');

                var returnData = {
                    fullResponse: res
                };

                var stripHtml = function stripHtml(str) {
                    return str.replace(/<\/?[^>]+(>|$)/g, '');
                };

                if ($p.length) {
                    returnData.error = true;
                    returnData.formattedResponse = {
                        shippingText: globalHelpers.strCompact(stripHtml(res))
                    };
                }

                if ($tr.length) {
                    returnData.error = false;
                    returnData.formattedResponse = $tr.map(function (index, item) {
                        var $td = $(item).children('td');
                        var _shippingText = $td.eq(1).text().split(',');

                        var shippingValue = $td.eq(0).text();
                        var shippingType = _shippingText[0];
                        var shippingText = globalHelpers.ucfirst(globalHelpers.strCompact(_shippingText[1]));

                        return { shippingValue: shippingValue, shippingText: shippingText, shippingType: shippingType };
                    }).toArray();
                }

                return def.resolve(returnData);
            }).fail(function (err) {
                return def.reject(err);
            });
        }).promise();
    },


    /**
     * From '/api/catalog_system/pub/products/search/' endpoint
     *
     * @returns {Array}  A new instance of array with skus ordered
     */
    sortProductSearch: function sortProductSearch(product, map, dimension) {
        var reverse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (!globalHelpers.isString(dimension)) {
            throw new TypeError('\'dimension\' param must be a String value');
        }

        if (!product.hasOwnProperty('items')) {
            throw new Error('Product data must be an response from Vtex API \'/api/catalog_system/pub/products/search/{productId}\' endpoint');
        }

        dimension = this._checkCamelize(product) ? globalHelpers.camelize(dimension) : dimension;
        return globalHelpers.objectArraySortByValue(product.items, map, dimension, reverse);
    },


    /**
     * From '/api/catalog_system/pub/products/variations/' endpoint (same as SkuJson)
     * If product data is camelized, set `map` manually or convert `dimensionsMap` prop to camelize too
     *
     * @returns {Array}  A new instance of array with skus ordered
     */
    sortProductVariations: function sortProductVariations(product, map, dimension) {
        var reverse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (!globalHelpers.isString(dimension)) {
            throw new TypeError('\'dimension\' param must be a String value');
        }

        if (!product.hasOwnProperty('skus')) {
            throw new Error('Product data must be an response from Vtex API \'/api/catalog_system/pub/products/variations/{productId}\' endpoint or global variable \'skuJson\' on product page');
        }

        map = globalHelpers.isArray(map) && map.length ? map : product.dimensionsMap[dimension];

        return globalHelpers.objectArraySortByValue(product.skus, map, 'dimensions.' + dimension, reverse);
    },


    /**
     * Replace break lines from product descriptions/more
     *
     * @param  {string}  str  String to replace
     * @return {string}       New string with <br /> break lines
     */
    replaceBreakLines: function replaceBreakLines(str) {
        str = str.replace ? str.replace(/(?:\r\n|\r|\n)/g, '<br />') : '';

        return str;
    },


    /**
     * Convert a string IDs given into an integer array values
     *
     * @param  {String} str              String with IDs
     * @param  {String} [separator=',']  Separator to split
     * @return {Array}
     * @example
     *     const str = '1, 2, 3, 4';
     *     stringIdsToArray(str); // [1, 2, 3, 4]
     *
     *     const str2 = '1 - 2 - 3 - 4';
     *     stringIdsToArray(str2); // [1, 2, 3, 4]
     */
    stringIdsToArray: function stringIdsToArray(str) {
        var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';

        var splitStr = globalHelpers.explode(str, separator);
        var arr = splitStr.map(function (item) {
            return globalHelpers.toNumber(globalHelpers.strCompact(item));
        });

        return globalHelpers.arrayCompact(arr);
    },


    /**
     * Check if the user is logged into Vtex
     * @return {promise} jQuery Ajax Promise
     * @example
     *     vtexHelpers.checkLogin().then((res) => {
     *         // If user defined
     *         console.log(res);
     *     })
     *     .fail((err) => {
     *         // If user isn't defined
     *         console.log(err)
     *     });
     */
    checkLogin: function checkLogin() {
        /* eslint-disable */
        return $.Deferred(function (def) {
            /* eslint-enable */
            return $.ajax({
                type: 'get',
                url: '/no-cache/profileSystem/getProfile'
            }).done(function (res) {
                if (globalHelpers.isUndefined(res.IsUserDefined) || !res.IsUserDefined) {
                    def.reject(res);
                } else {
                    def.resolve(res);
                }
            }).fail(function (err) {
                return def.reject(err);
            });
        }).promise();
    },


    /**
     * Open default Vtex popup login
     *
     * @param  {boolean}  [noReload = false]  Reload page after login
     * @return {void}
     */
    openPopupLogin: function openPopupLogin(noReload, _url) {
        noReload = globalHelpers.isBoolean(noReload) ? noReload : false;
        _url = globalHelpers.isString(_url) ? _url : '/';
        _url = noReload ? window.location.href : _url;

        vtexid.start({
            returnUrl: _url
        });
    },


    /**
     * Add items to cart
     *
     * @param  {Array}  items  Array of object with item(s)
     * @param  {Array}  [expectedOrderFormSections=null]  OrderForm fields to retrieve
     * @param  {Integer/String} [salesChannel=1]  Sales channel id
     * @return {promise}
     */
    addToCart: function addToCart(items, expectedOrderFormSections, salesChannel) {
        if (!globalHelpers.isArray(items)) {
            throw new TypeError('Items must be an Array of Object(s) with item(s) to add, e.g. var items = [{id: 123, quantity: 1, seller: \'1\'}, {id: 321, quantity: 2, seller: \'1\'}]');
        }

        if (globalHelpers.length(items) < 1) {
            throw new Error('Items can\'t be an empty Array.');
        }

        expectedOrderFormSections = globalHelpers.isUndefined(expectedOrderFormSections) ? null : expectedOrderFormSections;
        salesChannel = globalHelpers.isUndefined ? 1 : salesChannel;

        /* eslint-disable */
        return $.Deferred(function (def) {
            /* eslint-enable */
            return vtexjs.checkout.getOrderForm().done(function () {
                return vtexjs.checkout.addToCart(items, expectedOrderFormSections, salesChannel).done(function (orderForm) {
                    return def.resolve(orderForm);
                }).fail(function (err) {
                    return def.reject();
                });
            }).fail(function (err) {
                return def.reject(err);
            });
        }).promise();
    },


    /**
     * Empty the cart
     *
     * @return {promise} Order Form
     */
    clearCart: function clearCart() {
        /* eslint-disable */
        return $.Deferred(function (def) {
            /* eslint-enable */
            vtexjs.checkout.getOrderForm().done(function (orderForm) {
                if (orderForm.items.length) {
                    return vtexjs.checkout.removeAllItems(orderForm.items).done(function (orderForm) {
                        return def.resolve(orderForm);
                    });
                }

                return def.resolve(orderForm);
            }).fail(function (err) {
                return def.reject(err);
            });
        }).promise();
    },


    /**
     * Send notify me data
     *
     * @param  {String} name  Customer name
     * @param  {String} email Customer e-mail
     * @param  {Integer} skuId Sku ID
     * @return {Promise}
     */
    notifyMe: function notifyMe(name, email, skuId) {
        /* eslint-disable */
        return $.Deferred(function (def) {
            /* eslint-enable */
            var successMessage = 'Cadastrado com sucesso. Assim que o produto for disponibilizado você receberá um email avisando.';
            var errorMessage = 'Não foi possível cadastrar. Tente mais tarde.';

            return $.ajax({
                url: '/no-cache/AviseMe.aspx',
                type: 'post',
                data: {
                    notifymeClientName: name,
                    notifymeClientEmail: email,
                    notifymeIdSku: skuId
                }
            }).then(function (res) {
                return def.resolve({ successMessage: successMessage });
            }).fail(function (err) {
                return def.reject({ errorMessage: errorMessage });
            });
        }).promise();
    },


    /**
     * PRIVATE
     */
    _checkCamelize: function _checkCamelize(product) {
        if (product.hasOwnProperty('isCamelized') && product.isCamelized) {
            return true;
        }

        return false;
    },
    _getCommertialInfo: function _getCommertialInfo(data, sellerId) {
        if (!globalHelpers.isPlainObject(data)) {
            throw new TypeError('\'data\' must be an plain object');
        }

        return data.hasOwnProperty('commertialOffer') ? data.commertialOffer : this.getProductSellerInfo(data, sellerId).commertialOffer;
    },


    /**
     * Check if user is logged in
     *
     * @return {Boolean}
     */
    _isUserLogged: function _isUserLogged(storeName) {
        var check = this._getCookie('VtexIdclientAutCookie_' + storeName);

        return check ? true : false;
    },
    _getCookie: function _getCookie(name) {
        var dc = document.cookie;
        var prefix = name + '=';
        var begin = dc.indexOf('; ' + prefix);
        var end = dc.length; // Default to end of the string

        // Found, and not in first position
        if (begin !== -1) {
            // Exclude the "; "
            begin += 2;
        } else {
            // See if cookie is in first position
            begin = dc.indexOf(prefix);
            // Not found at all or found as a portion of another cookie name
            if (begin === -1 || begin !== 0) {
                return false;
            }
        }

        // If we find a ';' somewhere after the prefix position then "end" is that position,
        // otherwise it defaults to the end of the string
        if (dc.indexOf(';', begin) !== -1) {
            end = dc.indexOf(';', begin);
        }

        return decodeURI(dc.substring(begin + prefix.length, end)).replace(/"/g, '');
    }
};

var globalHelpers$1 = utilify$1.globalHelpers;

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') {
    global.window = global;
    global.window.navigator = {};
}

if ('rivets' in window) {
    rivets.formatters.formatPrice = function (target) {
        return vtexHelpers.formatPrice(target);
    };
    rivets.formatters.getResizedImage = function (src, width, height) {
        return vtexHelpers.getResizedImage(src, width, height);
    };
    rivets.formatters.getResizedImageByRatio = function (src, type, newSize, aspectRatio) {
        return vtexHelpers.getResizeImageByRatio(src, type, newSize, aspectRatio);
    };
    rivets.formatters.replaceBreakLines = function (target) {
        return vtexHelpers.replaceBreakLines(target);
    };
    rivets.formatters.prefix = function (val, prefix) {
        return prefix + val;
    };
    rivets.formatters.slugifyText = function (val) {
        return globalHelpers$1.slugifyText(val);
    };

    rivets.formatters.productImgSize = rivets.formatters.getResizedImage;
    rivets.formatters.getResizeImage = rivets.formatters.getResizedImage;
    rivets.formatters.getResizeImageByRatio = rivets.formatters.getResizedImageByRatio;
    rivets.formatters.productImgSizeByRatio = rivets.formatters.getResizedImageByRatio;
}

/**
 * Create a VtexHelpers class
 * Vtex utilities methods
 */

var VtexHelpers = function () {
    function VtexHelpers() {
        classCallCheck(this, VtexHelpers);

        this.getStoreName = window.jsnomeLoja;
        this.getSalesChannel = window.jssalesChannel;
        this.isUserLogged = vtexHelpers._isUserLogged(this.getStoreName);
    }

    createClass(VtexHelpers, [{
        key: 'formatPrice',
        value: function formatPrice(number, thousands, decimals, length, currency) {
            return vtexHelpers.formatPrice(number, thousands, decimals, length, currency);
        }
    }, {
        key: 'unformatPrice',
        value: function unformatPrice(value, decimal, formatNumber) {
            return vtexHelpers.unformatPrice(value, decimal, formatNumber);
        }
    }, {
        key: 'setInstallment',
        value: function setInstallment(price, minPrice, maxInstallments, interest) {
            return vtexHelpers.setInstallment(price, minPrice, maxInstallments, interest);
        }
    }, {
        key: 'getPercentage',
        value: function getPercentage(oldPrice, newPrice, length) {
            return vtexHelpers.getPercentage(oldPrice, newPrice, length);
        }
    }, {
        key: 'applyDiscountPercent',
        value: function applyDiscountPercent(price, percent, formatted) {
            return vtexHelpers.applyDiscountPercent(price, percent, formatted);
        }
    }, {
        key: 'fixProductSearchPrice',
        value: function fixProductSearchPrice(val) {
            return vtexHelpers.fixProductSearchPrice(val);
        }
    }, {
        key: 'getFirstAvailableSku',
        value: function getFirstAvailableSku(product) {
            return vtexHelpers.getFirstAvailableSku(product);
        }
    }, {
        key: 'getOriginalImage',
        value: function getOriginalImage(src) {
            return vtexHelpers.getOriginalImage(src);
        }
    }, {
        key: 'getResizedImage',
        value: function getResizedImage(src, width, height) {
            return vtexHelpers.getResizedImage(src, width, height);
        }
    }, {
        key: 'getResizeImageByRatio',
        value: function getResizeImageByRatio(src, type, newSize, aspectRatio) {
            return vtexHelpers.getResizeImageByRatio(src, type, newSize, aspectRatio);
        }
    }, {
        key: 'getServerTime',
        value: function getServerTime(callback) {
            return vtexHelpers.getServerTime(callback);
        }
    }, {
        key: 'getCategories',
        value: function getCategories(depth, categoryId) {
            return vtexHelpers.getCategories(depth, categoryId);
        }
    }, {
        key: 'getProductSpec',
        value: function getProductSpec(data, specName, defaultVal) {
            return vtexHelpers.getProductSpec(data, specName, defaultVal);
        }
    }, {
        key: 'getProductSellerInfo',
        value: function getProductSellerInfo(product, sellerId) {
            return vtexHelpers.getProductSellerInfo(product, sellerId);
        }
    }, {
        key: 'getProductInstallments',
        value: function getProductInstallments(product, sellerId) {
            return vtexHelpers.getProductInstallments(product, sellerId);
        }
    }, {
        key: 'getProductBankInvoice',
        value: function getProductBankInvoice(product, sellerId) {
            return vtexHelpers.getProductBankInvoice(product, sellerId);
        }
    }, {
        key: 'getProductPriceInfo',
        value: function getProductPriceInfo(sellerInfo) {
            return vtexHelpers.getProductPriceInfo(sellerInfo);
        }
    }, {
        key: 'getGroupInstallments',
        value: function getGroupInstallments(data, sellerId) {
            return vtexHelpers.getGroupInstallments(data, sellerId);
        }
    }, {
        key: 'getShipping',
        value: function getShipping(postalCode, skuId, quantity) {
            return vtexHelpers.getShipping(postalCode, skuId, quantity);
        }
    }, {
        key: 'sortProductSearch',
        value: function sortProductSearch(product, map, dimension, reverse) {
            return vtexHelpers.sortProductSearch(product, map, dimension, reverse);
        }
    }, {
        key: 'sortProductVariations',
        value: function sortProductVariations(product, map, dimension, reverse) {
            return vtexHelpers.sortProductVariations(product, map, dimension, reverse);
        }
    }, {
        key: 'replaceBreakLines',
        value: function replaceBreakLines(str) {
            return vtexHelpers.replaceBreakLines(str);
        }
    }, {
        key: 'stringIdsToArray',
        value: function stringIdsToArray(str, separator) {
            return vtexHelpers.stringIdsToArray(str, separator);
        }
    }, {
        key: 'checkLogin',
        value: function checkLogin() {
            return vtexHelpers.checkLogin();
        }
    }, {
        key: 'openPopupLogin',
        value: function openPopupLogin(noReload) {
            return vtexHelpers.openPopupLogin(noReload);
        }
    }, {
        key: 'addToCart',
        value: function addToCart(items, expectedOrderFormSections, salesChannel) {
            return vtexHelpers.addToCart(items, expectedOrderFormSections, salesChannel);
        }
    }, {
        key: 'clearCart',
        value: function clearCart() {
            return vtexHelpers.clearCart();
        }
    }, {
        key: 'notifyMe',
        value: function notifyMe(name, email, skuId) {
            return vtexHelpers.notifyMe(name, email, skuId);
        }
    }]);
    return VtexHelpers;
}();

/**
 * Create a VtexUtils class
 * Main class
 */

var VtexUtils = function () {
  function VtexUtils() {
    classCallCheck(this, VtexUtils);

    /**
     * Version
     * @type {String}
     */
    this.version = '1.16.1';

    /**
     * Package name
     * @type {String}
     */
    this.name = '@VtexUtils';

    /**
     * Vtex Helpers instance
     * @type {VtexHelpers}
     */
    this.vtexHelpers = new VtexHelpers();

    /**
     * Global Helpers instance
     * @type {GlobalHelpers}
     */
    this.globalHelpers = utilify$1.globalHelpers;

    /**
     * Location Helpers instance
     * @type {LocationHelpers}
     */
    this.locationHelpers = utilify$1.locationHelpers;

    /**
     * Local/Session Storage
     * @type {Object}
     */
    this.storage = utilify$1.storage;

    /**
     * Javascript Cookies
     * @type {Object}
     */
    this.cookies = utilify$1.cookies;
  }

  createClass(VtexUtils, [{
    key: 'setRivetsUtilify',
    value: function setRivetsUtilify(RivetsUtilify) {
      this.rivetsUtilify = new RivetsUtilify(utilify$1);
    }
  }]);
  return VtexUtils;
}();

module.exports = VtexUtils;
