/* store.js - Copyright (c) 2010-2017 Marcus Westin */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.store = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Example custom build usage:
var engine = require('../src/store-engine');
var storages = [require('../storages/localStorage'), require('../storages/sessionStorage')];

var plugins = [require('../plugins/observe')];

module.exports = engine.createStore(storages, plugins);

},{"../plugins/observe":3,"../src/store-engine":4,"../storages/localStorage":6,"../storages/sessionStorage":7}],2:[function(require,module,exports){
'use strict';

var util = require('../src/util');
var bind = util.bind;
var each = util.each;
var create = util.create;
var slice = util.slice;

module.exports = eventsPlugin;

function eventsPlugin() {
    var pubsub = _newPubSub();

    return {
        watch: watch,
        unwatch: unwatch,
        once: once,

        set: set,
        remove: remove,
        clearAll: clearAll

        // new pubsub functions
    };function watch(_, key, listener) {
        return pubsub.on(key, bind(this, listener));
    }
    function unwatch(_, subId) {
        pubsub.off(subId);
    }
    function once(_, key, listener) {
        pubsub.once(key, bind(this, listener));
    }

    // overwrite function to fire when appropriate
    function set(super_fn, key, val) {
        var oldVal = this.get(key);
        super_fn();
        pubsub.fire(key, val, oldVal);
    }
    function remove(super_fn, key) {
        var oldVal = this.get(key);
        super_fn();
        pubsub.fire(key, undefined, oldVal);
    }
    function clearAll(super_fn) {
        var oldVals = {};
        this.each(function (val, key) {
            oldVals[key] = val;
        });
        super_fn();
        each(oldVals, function (oldVal, key) {
            pubsub.fire(key, undefined, oldVal);
        });
    }
}

function _newPubSub() {
    return create(_pubSubBase, {
        _id: 0,
        _subSignals: {},
        _subCallbacks: {}
    });
}

var _pubSubBase = {
    _id: null,
    _subCallbacks: null,
    _subSignals: null,
    on: function on(signal, callback) {
        if (!this._subCallbacks[signal]) {
            this._subCallbacks[signal] = {};
        }
        this._id += 1;
        this._subCallbacks[signal][this._id] = callback;
        this._subSignals[this._id] = signal;
        return this._id;
    },
    off: function off(subId) {
        var signal = this._subSignals[subId];
        delete this._subCallbacks[signal][subId];
        delete this._subSignals[subId];
    },
    once: function once(signal, callback) {
        var subId = this.on(signal, bind(this, function () {
            callback.apply(this, arguments);
            this.off(subId);
        }));
    },
    fire: function fire(signal) {
        var args = slice(arguments, 1);
        each(this._subCallbacks[signal], function (callback) {
            callback.apply(this, args);
        });
    }
};

},{"../src/util":5}],3:[function(require,module,exports){
'use strict';

var eventsPlugin = require('./events');

module.exports = [eventsPlugin, observePlugin];

function observePlugin() {
    return {
        observe: observe,
        unobserve: unobserve
    };

    function observe(_, key, callback) {
        var subId = this.watch(key, callback);
        callback(this.get(key));
        return subId;
    }
    function unobserve(_, subId) {
        this.unwatch(subId);
    }
}

},{"./events":2}],4:[function(require,module,exports){
'use strict';

var util = require('./util');
var slice = util.slice;
var pluck = util.pluck;
var each = util.each;
var bind = util.bind;
var create = util.create;
var isList = util.isList;
var isFunction = util.isFunction;
var isObject = util.isObject;

module.exports = {
    createStore: _createStore
};

var storeAPI = {
    version: '2.0.12',
    enabled: false,

    // get returns the value of the given key. If that value
    // is undefined, it returns optionalDefaultValue instead.
    get: function get(key, optionalDefaultValue) {
        var data = this.storage.read(this._namespacePrefix + key);
        return this._deserialize(data, optionalDefaultValue);
    },

    // set will store the given value at key and returns value.
    // Calling set with value === undefined is equivalent to calling remove.
    set: function set(key, value) {
        if (value === undefined) {
            return this.remove(key);
        }
        this.storage.write(this._namespacePrefix + key, this._serialize(value));
        return value;
    },

    // remove deletes the key and value stored at the given key.
    remove: function remove(key) {
        this.storage.remove(this._namespacePrefix + key);
    },

    // each will call the given callback once for each key-value pair
    // in this store.
    each: function each(callback) {
        var self = this;
        this.storage.each(function (val, namespacedKey) {
            callback.call(self, self._deserialize(val), (namespacedKey || '').replace(self._namespaceRegexp, ''));
        });
    },

    // clearAll will remove all the stored key-value pairs in this store.
    clearAll: function clearAll() {
        this.storage.clearAll();
    },

    // additional functionality that can't live in plugins
    // ---------------------------------------------------

    // hasNamespace returns true if this store instance has the given namespace.
    hasNamespace: function hasNamespace(namespace) {
        return this._namespacePrefix == '__storejs_' + namespace + '_';
    },

    // createStore creates a store.js instance with the first
    // functioning storage in the list of storage candidates,
    // and applies the the given mixins to the instance.
    createStore: function createStore() {
        return _createStore.apply(this, arguments);
    },

    addPlugin: function addPlugin(plugin) {
        this._addPlugin(plugin);
    },

    namespace: function namespace(_namespace) {
        return _createStore(this.storage, this.plugins, _namespace);
    }
};

function _warn() {
    var _console = typeof console == 'undefined' ? null : console;
    if (!_console) {
        return;
    }
    var fn = _console.warn ? _console.warn : _console.log;
    fn.apply(_console, arguments);
}

function _createStore(storages, plugins, namespace) {
    if (!namespace) {
        namespace = '';
    }
    if (storages && !isList(storages)) {
        storages = [storages];
    }
    if (plugins && !isList(plugins)) {
        plugins = [plugins];
    }

    var namespacePrefix = namespace ? '__storejs_' + namespace + '_' : '';
    var namespaceRegexp = namespace ? new RegExp('^' + namespacePrefix) : null;
    var legalNamespaces = /^[a-zA-Z0-9_\-]*$/; // alpha-numeric + underscore and dash
    if (!legalNamespaces.test(namespace)) {
        throw new Error('store.js namespaces can only have alphanumerics + underscores and dashes');
    }

    var _privateStoreProps = {
        _namespacePrefix: namespacePrefix,
        _namespaceRegexp: namespaceRegexp,

        _testStorage: function _testStorage(storage) {
            try {
                var testStr = '__storejs__test__';
                storage.write(testStr, testStr);
                var ok = storage.read(testStr) === testStr;
                storage.remove(testStr);
                return ok;
            } catch (e) {
                return false;
            }
        },

        _assignPluginFnProp: function _assignPluginFnProp(pluginFnProp, propName) {
            var oldFn = this[propName];
            this[propName] = function pluginFn() {
                var args = slice(arguments, 0);
                var self = this;

                // super_fn calls the old function which was overwritten by
                // this mixin.
                function super_fn() {
                    if (!oldFn) {
                        return;
                    }
                    each(arguments, function (arg, i) {
                        args[i] = arg;
                    });
                    return oldFn.apply(self, args);
                }

                // Give mixing function access to super_fn by prefixing all mixin function
                // arguments with super_fn.
                var newFnArgs = [super_fn].concat(args);

                return pluginFnProp.apply(self, newFnArgs);
            };
        },

        _serialize: function _serialize(obj) {
            return JSON.stringify(obj);
        },

        _deserialize: function _deserialize(strVal, defaultVal) {
            if (!strVal) {
                return defaultVal;
            }
            // It is possible that a raw string value has been previously stored
            // in a storage without using store.js, meaning it will be a raw
            // string value instead of a JSON serialized string. By defaulting
            // to the raw string value in case of a JSON parse error, we allow
            // for past stored values to be forwards-compatible with store.js
            var val = '';
            try {
                val = JSON.parse(strVal);
            } catch (e) {
                val = strVal;
            }

            return val !== undefined ? val : defaultVal;
        },

        _addStorage: function _addStorage(storage) {
            if (this.enabled) {
                return;
            }
            if (this._testStorage(storage)) {
                this.storage = storage;
                this.enabled = true;
            }
        },

        _addPlugin: function _addPlugin(plugin) {
            var self = this;

            // If the plugin is an array, then add all plugins in the array.
            // This allows for a plugin to depend on other plugins.
            if (isList(plugin)) {
                each(plugin, function (plugin) {
                    self._addPlugin(plugin);
                });
                return;
            }

            // Keep track of all plugins we've seen so far, so that we
            // don't add any of them twice.
            var seenPlugin = pluck(this.plugins, function (seenPlugin) {
                return plugin === seenPlugin;
            });
            if (seenPlugin) {
                return;
            }
            this.plugins.push(plugin);

            // Check that the plugin is properly formed
            if (!isFunction(plugin)) {
                throw new Error('Plugins must be function values that return objects');
            }

            var pluginProperties = plugin.call(this);
            if (!isObject(pluginProperties)) {
                throw new Error('Plugins must return an object of function properties');
            }

            // Add the plugin function properties to this store instance.
            each(pluginProperties, function (pluginFnProp, propName) {
                if (!isFunction(pluginFnProp)) {
                    throw new Error('Bad plugin property: ' + propName + ' from plugin ' + plugin.name + '. Plugins should only return functions.');
                }
                self._assignPluginFnProp(pluginFnProp, propName);
            });
        },

        // Put deprecated properties in the private API, so as to not expose it to accidential
        // discovery through inspection of the store object.

        // Deprecated: addStorage
        addStorage: function addStorage(storage) {
            _warn('store.addStorage(storage) is deprecated. Use createStore([storages])');
            this._addStorage(storage);
        }
    };

    var store = create(_privateStoreProps, storeAPI, {
        plugins: []
    });
    store.raw = {};
    each(store, function (prop, propName) {
        if (isFunction(prop)) {
            store.raw[propName] = bind(store, prop);
        }
    });
    each(storages, function (storage) {
        store._addStorage(storage);
    });
    each(plugins, function (plugin) {
        store._addPlugin(plugin);
    });
    return store;
}

},{"./util":5}],5:[function(require,module,exports){
(function (global){
'use strict';

var assign = make_assign();
var create = make_create();
var trim = make_trim();
var Global = typeof window !== 'undefined' ? window : global;

module.exports = {
    assign: assign,
    create: create,
    trim: trim,
    bind: bind,
    slice: slice,
    each: each,
    map: map,
    pluck: pluck,
    isList: isList,
    isFunction: isFunction,
    isObject: isObject,
    Global: Global
};

function make_assign() {
    if (Object.assign) {
        return Object.assign;
    } else {
        return function shimAssign(obj, props1, props2, etc) {
            for (var i = 1; i < arguments.length; i++) {
                each(Object(arguments[i]), function (val, key) {
                    obj[key] = val;
                });
            }
            return obj;
        };
    }
}

function make_create() {
    if (Object.create) {
        return function create(obj, assignProps1, assignProps2, etc) {
            var assignArgsList = slice(arguments, 1);
            return assign.apply(this, [Object.create(obj)].concat(assignArgsList));
        };
    } else {
        var F = function F() {}; // eslint-disable-line no-inner-declarations


        return function create(obj, assignProps1, assignProps2, etc) {
            var assignArgsList = slice(arguments, 1);
            F.prototype = obj;
            return assign.apply(this, [new F()].concat(assignArgsList));
        };
    }
}

function make_trim() {
    if (String.prototype.trim) {
        return function trim(str) {
            return String.prototype.trim.call(str);
        };
    } else {
        return function trim(str) {
            return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    }
}

function bind(obj, fn) {
    return function () {
        return fn.apply(obj, Array.prototype.slice.call(arguments, 0));
    };
}

function slice(arr, index) {
    return Array.prototype.slice.call(arr, index || 0);
}

function each(obj, fn) {
    pluck(obj, function (val, key) {
        fn(val, key);
        return false;
    });
}

function map(obj, fn) {
    var res = isList(obj) ? [] : {};
    pluck(obj, function (v, k) {
        res[k] = fn(v, k);
        return false;
    });
    return res;
}

function pluck(obj, fn) {
    if (isList(obj)) {
        for (var i = 0; i < obj.length; i++) {
            if (fn(obj[i], i)) {
                return obj[i];
            }
        }
    } else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (fn(obj[key], key)) {
                    return obj[key];
                }
            }
        }
    }
}

function isList(val) {
    return val != null && typeof val != 'function' && typeof val.length == 'number';
}

function isFunction(val) {
    return val && {}.toString.call(val) === '[object Function]';
}

function isObject(val) {
    return val && {}.toString.call(val) === '[object Object]';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
'use strict';

var util = require('../src/util');
var Global = util.Global;

module.exports = {
    name: 'localStorage',
    read: read,
    write: write,
    each: each,
    remove: remove,
    clearAll: clearAll
};

function localStorage() {
    return Global.localStorage;
}

function read(key) {
    return localStorage().getItem(key);
}

function write(key, data) {
    return localStorage().setItem(key, data);
}

function each(fn) {
    for (var i = localStorage().length - 1; i >= 0; i--) {
        var key = localStorage().key(i);
        fn(read(key), key);
    }
}

function remove(key) {
    return localStorage().removeItem(key);
}

function clearAll() {
    return localStorage().clear();
}

},{"../src/util":5}],7:[function(require,module,exports){
'use strict';

var util = require('../src/util');
var Global = util.Global;

module.exports = {
    name: 'sessionStorage',
    read: read,
    write: write,
    each: each,
    remove: remove,
    clearAll: clearAll
};

function sessionStorage() {
    return Global.sessionStorage;
}

function read(key) {
    return sessionStorage().getItem(key);
}

function write(key, data) {
    return sessionStorage().setItem(key, data);
}

function each(fn) {
    for (var i = sessionStorage().length - 1; i >= 0; i--) {
        var key = sessionStorage().key(i);
        fn(read(key), key);
    }
}

function remove(key) {
    return sessionStorage().removeItem(key);
}

function clearAll() {
    return sessionStorage().clear();
}

},{"../src/util":5}]},{},[1])(1)
});
