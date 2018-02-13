
/*!!
 * VtexUtils.js v0.9.0
 * https://github.com/zeindelf/vtex-utils
 *
 * Copyright (c) 2017-2018 Zeindelf
 * Released under the MIT license
 *
 * Date: 2018-02-13T04:03:00.257Z
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VTEX = global.VTEX || {}, global.VTEX.VtexUtils = factory());
}(this, (function () { 'use strict';

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



























var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// cache some methods to call later on
var toString = Object.prototype.toString;

var validateHelpers = {
    // is a given value Arguments?
    isArguments: function isArguments(value) {
        // fallback check is for IE
        return toString.call(value) === '[object Arguments]' || value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && 'callee' in value;
    },


    /**
     * Check if the given value is an array.
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


    /**
     * Check if the given value is a boolean value.
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
     */
    isBoolean: function isBoolean(value) {
        return value === true || value === false || toString.call(value) === '[object Boolean]';
    },


    // is a given value Char?
    isChar: function isChar(value) {
        return this.isString(value) && value.length === 1;
    },


    // is a given value Date Object?
    isDate: function isDate(value) {
        return toString.call(value) === '[object Date]';
    },


    // is a given object a DOM node?
    isDomNode: function isDomNode(object) {
        return this.isObject(object) && object.nodeType > 0;
    },


    /**
     * Check if a string is a valid mail.
     * @param {string} email - The string to check
     * @return {boolean}
     */
    isEmail: function isEmail(email) {
        var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        return regex.test(email);
    },


    // is a given value empty? Objects, arrays, strings
    isEmpty: function isEmpty(value) {
        if (this.isObject(value)) {
            var length = Object.getOwnPropertyNames(value).length;

            if (length === 0 || length === 1 && this.isArray(value) || length === 2 && this.isArguments(value)) {
                return true;
            }

            return false;
        }

        return value === '';
    },


    // is a given value Error object?
    isError: function isError(value) {
        return toString.call(value) === '[object Error]';
    },


    /**
     * Check if the given value is a function.
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a function, else 'false'.
     */
    isFunction: function isFunction(value) {
        // fallback check is for IE
        return toString.call(value) === '[object Function]' || typeof value === 'function';
    },


    /**
     * Check if a string is a valid JSON.
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


    // is a given value null?
    isNull: function isNull(value) {
        return value === null;
    },


    /**
     * Check if the given value is a number.
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a number, else 'false'.
     */
    isNumber: function isNumber(value) {
        var isNaN = Number.isNaN || window.isNaN;

        return typeof value === 'number' && !isNaN(value);
    },


    /**
     * Check if the given value is an object
     * @param {*} value - The value to check
     * @return {boolean} Returns 'true' if the given value is an object, else 'false'
     */
    isObject: function isObject(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
    },


    /**
     * Verify if as objects is empty
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
     * Check if the given value is a plain object.
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


    // is a given value RegExp?
    isRegexp: function isRegexp(value) {
        return toString.call(value) === '[object RegExp]';
    },


    // are given values same type?
    isSameType: function isSameType(value, other) {
        var tag = toString.call(value);

        if (tag !== toString.call(other)) {
            return false;
        }

        return true;
    },


    /**
     * Check if the given value is a string.
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
     */
    isString: function isString(value) {
        return toString.call(value) === '[object String]';
    },


    /**
     * Check if the given value is undefined.
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is undefined, else 'false'.
     */
    isUndefined: function isUndefined(value) {
        return value === undefined;
    }
};

// cache some methods to call later on
var slice = Array.prototype.slice;

var globalHelpers = {
    /**
     * Return an array with unique values
     * @param {Array} arr - The array
     * @return {Array}
     */
    arrayUnique: function arrayUnique(arr) {
        return arr.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
    },


    /**
     * Capitalize a string
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
     * Creates an array of elements split into groups the length of size.
     * If array can't be split evenly, the final chunk will be the remaining elements.
     * @param  {Array}    array  The array to proccess.
     * @param  {Integer}  size   The length of each chunk.
     * @return {Array}           Returns the new array of chunks.
     */
    chunk: function chunk(array, size) {
        if (validateHelpers.isNull(size) || this.lenght(size) < 1) {
            return [];
        }

        var result = [];
        var i = 0;
        var len = array.length;
        while (i < len) {
            result.push(slice.call(array, i, i += size));
        }

        return result;
    },


    /**
     * Removes empty index from a array
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
     * Check if value contains in an element
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
     * Replace <, >, &, ', " and / with HTML entities.
     * @param {string} str - The string to check
     * @return {boolean}
     */
    escape: function escape(str) {
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
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
     * Get url params from a query string
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
        entryPoint = !validateHelpers.isString(entryPoint) ? window.location.href : entryPoint;
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(entryPoint);

        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },


    /**
     * Join array elements with glue string - PHP implode alike
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
     * Search through an object recursively and return the first match of the key:value passed
     * @access public
     * @param {Object} object - The haystack
     * @param {Object} needle - Key value pair that will be searched
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
        var p = void 0;
        var key = void 0;
        var val = void 0;
        var tRet = void 0;

        for (p in needle) {
            if (needle.hasOwnProperty(p)) {
                key = p;
                val = needle[p];
            }
        }

        for (p in object) {
            if (p === key) {
                if (object[p] === val) {
                    return object;
                }
            } else if (object[p] instanceof Object) {
                if (object.hasOwnProperty(p)) {
                    tRet = this.objectSearch(object[p], needle);
                    if (tRet) {
                        return tRet;
                    }
                }
            }
        }

        return false;
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
     * Randomize a array elements with Fisher–Yates shuffle algorithm base
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
        var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
        var to = 'aaaaeeeeiiiioooouuuunc------';

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
     * Removes the host from an url
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
     * Replaces HTML encoded entities with <, >, &, ', " and /.
     * @param {string} str - The string to check
     * @return {boolean}
     */
    unescape: function unescape(str) {
        return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#x5C;/g, '\\').replace(/&#96;/g, '`');
    },


    /**
     * Unserialize a query string into an object
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
        currency = validateHelpers.isString(currency) ? currency : 'R$ ';
        length = !validateHelpers.isNumber(length) ? 2 : length;

        var re = '\\d(?=(\\d{' + 3 + '})+' + (length > 0 ? '\\D' : '$') + ')';
        number = number / 100;
        number = (number * 1).toFixed(Math.max(0, ~~length));

        return currency + number.replace('.', decimals || ',').replace(new RegExp(re, 'g'), '$&' + (thousands || '.'));
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
        return validateHelpers.isString(src) ? src.replace(/(ids\/[0-9]+)-([0-9-]+)\//, '$1/') : src;
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
        if (validateHelpers.isUndefined(width) || validateHelpers.isUndefined(height) || !validateHelpers.isString(src)) {
            return src;
        }

        src = src.replace(/(?:ids\/[0-9]+)-([0-9]+)-([0-9]+)\//, function (match, matchedWidth, matchedHeight) {
            return match.replace('-' + matchedWidth + '-' + matchedHeight, '-' + width + '-' + height);
        });

        return src.replace(/(ids\/[0-9]+)\//, '$1-' + width + '-' + height + '/');
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

            if (validateHelpers.isFunction(callback)) {
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
                if (!validateHelpers.isUndefined(categoryId)) {
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
                if (validateHelpers.isUndefined(res.IsUserDefined) || !res.IsUserDefined) {
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
    openPopupLogin: function openPopupLogin(noReload) {
        noReload = validateHelpers.isBoolean(noReload) ? noReload : false;
        var _url = noReload ? window.location.href : '/';

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
        if (!validateHelpers.isArray(items)) {
            throw new TypeError('Items must be an Array of Object(s) with item(s) to add, e.g. var items = [{id: 123, quantity: 1, seller: \'1\'}, {id: 321, quantity: 2, seller: \'1\'}]');
        }

        if (globalHelpers.length(items) < 1) {
            throw new Error('Items can\'t be an empty Array.');
        }

        expectedOrderFormSections = validateHelpers.isUndefined(expectedOrderFormSections) ? null : expectedOrderFormSections;
        salesChannel = validateHelpers.isUndefined ? 1 : salesChannel;

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
    }
};

var _arguments = arguments;

if ('rivets' in window) {
    rivets.formatters['!'] = function (value) {
        return !value;
    };

    rivets.formatters.eq = function (value, args) {
        return value === args;
    };

    rivets.formatters.neq = function (value, args) {
        return value !== args;
    };

    rivets.formatters.gt = function (value, args) {
        return value > args;
    };

    rivets.formatters.gte = function (value, args) {
        return value >= args;
    };

    rivets.formatters.lt = function (value, args) {
        return value < args;
    };

    rivets.formatters.lte = function (value, args) {
        return value <= args;
    };

    rivets.formatters.or = function (value, args) {
        return value || args;
    };

    rivets.formatters.isEmpty = function (value) {
        return typeof value === 'undefined' || value === null || typeof value === 'string' && value.length === 0;
    };

    rivets.formatters.isNotEmpty = function (value) {
        return !rivets.formatters.isEmpty(value);
    };

    rivets.formatters.pass = function (value, args) {
        return args;
    };

    rivets.formatters.json = function (value, intendation) {
        return JSON.stringify(value, null, intendation || 0);
    };

    rivets.formatters.prefix = function (value, prefix) {
        return '' + prefix + value;
    };

    rivets.formatters.suffix = function (value, suffix) {
        return '' + value + suffix;
    };

    rivets.formatters.ucFirst = function (value) {
        return value.substr(0, 1).toUpperCase() + value.substr(1);
    };

    rivets.formatters['+'] = function (value, args) {
        return value + args;
    };

    rivets.formatters['-'] = function (value, args) {
        return value - args;
    };

    rivets.formatters['*'] = function (value, args) {
        return value * args;
    };

    rivets.formatters['/'] = function (value, args) {
        return value / args;
    };

    rivets.formatters.round = function (value, decimals) {
        if (decimals) {
            var exp = Math.pow(10, decimals);
            value = Math.round(value * exp) / exp;
        } else {
            value = Math.round(value);
        }

        return value;
    };

    rivets.formatters.get = function (obj, key) {
        if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
            return obj[key];
        }

        return null;
    };

    rivets.formatters.set = function (obj, key, value) {
        if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
            obj[key] = value;
        }

        return obj;
    };

    rivets.formatters['.'] = rivets.formatters.get;

    rivets.formatters.keys = function (obj) {
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
            return Object.keys(obj);
        }

        return [];
    };

    rivets.formatters.length = function (value) {
        return value ? value.length || 0 : 0;
    };

    rivets.formatters.sort = function () /* value[, by][, direction]*/{
        var args = Array.from(_arguments);
        var value = args.shift();
        var by = args.shift();
        var direction = args.shift();

        if (!direction && (by == 'asc' || by == 'desc')) {
            direction = by;
            by = null;
        }

        if (!by) {
            value.sort();
        } else {
            value.sort(function (a, b) {
                if (a[by] === b[by]) {
                    return 0;
                }

                return a[by] < b[by] ? -1 : 1;
            });
        }

        if (direction == 'desc') {
            value.reverse();
        }

        return value;
    };

    rivets.formatters.default = function (value, args) {
        return typeof value !== 'undefined' && value !== null ? value : args;
    };

    rivets.formatters.contains = function (value, search) {
        if (Array.isArray(value)) {
            return value.indexOf(search) !== -1;
        }

        return false;
    };

    rivets.formatters.percent = function (value, decimals) {
        return number_format(value * 100, decimals || 0, ',') + '%';
    };

    rivets.formatters.bind = function () /* fn, thisArg[, arg1, arg2, ..., argN]*/{
        var args = Array.from(_arguments);
        var fn = args.shift();
        var self = args.shift();

        if (typeof fn === 'function') {
            return function () {
                fn.apply(self, args);
            };
        }

        return fn;
    };

    rivets.formatters.with = function () /* fn, arg1, arg2, ..., argN*/{
        var args = Array.from(_arguments);
        var fn = args.shift();

        if (typeof fn === 'function') {
            return fn.bind(null, args);
        }

        return fn;
    };

    rivets.formatters.slice = function () {
        var args = Array.from(_arguments);
        var arr = args.shift();
        return Array.prototype.slice.apply(arr, args);
    };

    rivets.formatters.formatPrice = function (val) {
        return vtexHelpers.formatPrice(val);
    };

    rivets.formatters.productImgSize = function (val, arg1, arg2) {
        return vtexHelpers.getResizedImage(val, arg1, arg2);
    };
}

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

var store =
// safely set this up (throws error in IE10/32bit mode for local files)
_.Store("local", function () {
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

/**
 * Create a VtexHelpers class
 * Vtex utilities methods
 */

var VtexHelpers = function () {
    function VtexHelpers() {
        classCallCheck(this, VtexHelpers);
    }

    createClass(VtexHelpers, [{
        key: 'formatPrice',
        value: function formatPrice(number, thousands, decimals, length, currency) {
            return vtexHelpers.formatPrice(number, thousands, decimals, length, currency);
        }
    }, {
        key: 'isValidPrice',
        value: function isValidPrice(price, thousands, decimal, decimalLength) {
            return vtexHelpers.isValidPrice(price, thousands, decimal, decimalLength);
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
        key: 'replaceBreakLines',
        value: function replaceBreakLines(str) {
            return vtexHelpers.replaceBreakLines(str);
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
    }]);
    return VtexHelpers;
}();

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
        value: function isEmpty(value) {
            return validateHelpers.isEmpty(value);
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
        key: 'isPlainObject',
        value: function isPlainObject(value) {
            return validateHelpers.isPlainObject(value);
        }
    }, {
        key: 'isRegexp',
        value: function isRegexp(value) {
            return validateHelpers.isRegexp(value);
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
        key: 'arrayUnique',
        value: function arrayUnique(arr) {
            return globalHelpers.arrayUnique(arr);
        }
    }, {
        key: 'capitalize',
        value: function capitalize(str) {
            return globalHelpers.capitalize(str);
        }
    }, {
        key: 'cleanArray',
        value: function cleanArray(array) {
            return globalHelpers.cleanArray(array);
        }
    }, {
        key: 'escape',
        value: function escape(str) {
            return globalHelpers.escape(str);
        }
    }, {
        key: 'extend',
        value: function extend(obj) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            return globalHelpers.extend.apply(globalHelpers, [obj].concat(args));
        }
    }, {
        key: 'getUrlParameter',
        value: function getUrlParameter(name, entryPoint) {
            return globalHelpers.getUrlParameter(name, entryPoint);
        }
    }, {
        key: 'implode',
        value: function implode(pieces, glue) {
            return globalHelpers.implode(pieces, glue);
        }
    }, {
        key: 'length',
        value: function length(item) {
            return globalHelpers.length(item);
        }
    }, {
        key: 'objectSearch',
        value: function objectSearch(object, needle) {
            return globalHelpers.objectSearch(object, needle);
        }
    }, {
        key: 'removeAccent',
        value: function removeAccent(str) {
            return globalHelpers.removeAccent(str);
        }
    }, {
        key: 'shuffleArray',
        value: function shuffleArray(array) {
            return globalHelpers.shuffleArray(array);
        }
    }, {
        key: 'slugifyText',
        value: function slugifyText(str) {
            return globalHelpers.slugifyText(str);
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
        key: 'strReplace',
        value: function strReplace(search, replace, subject) {
            return globalHelpers.strReplace(search, replace, subject);
        }
    }, {
        key: 'unescape',
        value: function unescape(str) {
            return globalHelpers.unescape(str);
        }
    }, {
        key: 'unserialize',
        value: function unserialize(str) {
            return globalHelpers.unserialize(str);
        }
    }]);
    return GlobalHelpers;
}();

var Private = function () {
    function Private() {
        classCallCheck(this, Private);

        /**
         * API limits request
         * @type {Number}
         */
        this._maxParamsPerRequest = 50;

        /**
         * Array to store the empty params
         * @type {Array}
         */
        this._emptyFetchedParams = [];

        /**
         * Array to store the pending params to fetch
         * @type {Array}
         */
        this._pendingParamsToFetch = [];

        /**
         * Array to store the fetched params
         * @type {Array}
         */
        this._fetchedParams = [];

        /**
         * Array to store the XHR requests
         * @type {Array}
         */
        this._pendingFetchArray = [];

        this._errors = {
            searchParamsNotDefined: 'Search parameters is not defined',
            paramsNotAnObject: 'Param is not a valid Object',
            productIdNotDefined: 'Product ID is not defined',
            skuIdNotDefined: 'Sku ID is not defined',
            productIdArrayNotAnArray: '\'productIdArray\' is not an array',
            skuIdArrayNotAnArray: '\'skuIdArray\' is not an array',
            productIdArrayNotDefined: '\'productIdArray\' is not an defined',
            skuIdArrayNotDefined: '\'skuIdArray\' is not an defined',
            fqPropertyNotFound: 'The property \'fq\' was not found'
        };

        this._productCacheName = 'vtexCatalog.productCache';
        this._skuCacheName = 'vtexCatalog.skuCache';

        this._storage = store;
        this._session = this._storage.session;
    }

    createClass(Private, [{
        key: '_getInstance',
        value: function _getInstance(catalog) {
            this._catalog = catalog;
        }
    }, {
        key: '_error',
        value: function _error(type) {
            throw new Error(this._errors[type]);
        }
    }, {
        key: '_setSessionCache',
        value: function _setSessionCache(catalogCache) {
            this._catalogCache = catalogCache;
            this._initStorage(this._catalogCache);
        }

        /**
         * Init and validate Session Store Cache
         * @return {Void}
         */

    }, {
        key: '_initStorage',
        value: function _initStorage(catalogCache) {
            if (catalogCache) {
                if (validateHelpers.isNull(this._session.get(this._productCacheName))) {
                    this._session.set(this._productCacheName, {});
                }

                if (validateHelpers.isNull(this._session.get(this._skuCacheName))) {
                    this._session.set(this._skuCacheName, {});
                }
            } else {
                this._session.remove(this._productCacheName);
                this._session.remove(this._skuCacheName);
            }
        }

        /**
         * Store products into Session Storage
         */

    }, {
        key: '_setProductCache',
        value: function _setProductCache(products) {
            if (this._catalogCache) {
                var productCache = this._session.get(this._productCacheName);

                for (var id in products) {
                    if (!productCache.hasOwnProperty(id)) {
                        productCache[id] = products[id];
                    }
                }

                this._session.set(this._productCacheName, productCache);
            }
        }

        /**
         * Store SKUs ID into Session Storage
         */

    }, {
        key: '_setSkuCache',
        value: function _setSkuCache(productsId) {
            if (this._catalogCache) {
                var productIdCache = this._session.get(this._skuCacheName);

                for (var id in productsId) {
                    if (!productIdCache.hasOwnProperty(id)) {
                        productIdCache[id] = productsId[id];
                    }
                }

                this._session.set(this._skuCacheName, productIdCache);
            }
        }
    }, {
        key: '_getProductCache',
        value: function _getProductCache() {
            return this._catalogCache ? this._session.get(this._productCacheName) : this._catalog.productCache;
        }
    }, {
        key: '_getSkuCache',
        value: function _getSkuCache() {
            return this._catalogCache ? this._session.get(this._skuCacheName) : this._catalog.skusProductIds;
        }

        /**
         * Cache Products/SKUs Id
         * @param {Object} product Product to cache
         */

    }, {
        key: '_setCache',
        value: function _setCache(product) {
            var _this = this;

            var productId = product.productId,
                items = product.items;

            this._catalog.productCache[productId] = product;

            if (this._catalogCache) {
                this._setProductCache(this._catalog.productCache);
            }

            items.forEach(function (item) {
                var itemId = item.itemId;

                _this._catalog.skusProductIds[itemId] = productId;
            });
        }

        /**
         * Search products in Catalog
         * @param  {Object} params       Object with search parameters. Valid params: C:/{a}/{b} (Category), fq=specificationFilter_{a}:{b} (Filter), fq=P:[{a} TO {b}] (Price)
         * @param  {Object} [headers={}] Request headers
         * @return {Promise}             Promise with search results
         */

    }, {
        key: '_search',
        value: function _search(params) {
            var _this2 = this,
                _$;

            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (validateHelpers.isUndefined(params)) {
                return this._error('searchParamsNotDefined');
            }

            if (!validateHelpers.isObject(params)) {
                return this._error('paramsNotAnObject');
            }

            if (validateHelpers.isUndefined(params.fq)) {
                return this._error('fqPropertyNotFound');
            }

            var paramsFormatted = $.extend({}, params);
            var xhrArray = this._pendingFetchArray;
            var productData = [];

            for (var queryType in params) {
                if (queryType === 'map') {
                    continue;
                }

                // Loop each query and filter the ones that are already fetched
                // or are pending
                paramsFormatted[queryType] = params[queryType].filter(function (query) {
                    // Check if query was already fetched and the response was empty
                    if (~_this2._emptyFetchedParams.indexOf(query)) {
                        return false;
                    }

                    // NOTE: Two step validation, the first IF statement checks if the query
                    // was already gotten and if the query is still pending
                    if (~_this2._fetchedParams.indexOf(query)) {
                        return false;
                    } else {
                        if (!~_this2._pendingParamsToFetch.indexOf(query)) {
                            _this2._pendingParamsToFetch.push(query);
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
            }

            var paramsLength = 1;

            // If params fq is an array get the length
            if (validateHelpers.isArray(params.fq)) {
                paramsLength = paramsFormatted.fq.length;
            }

            var requestAmount = Math.ceil(paramsLength / this._maxParamsPerRequest);

            // Loop for each requestAmount

            var _loop = function _loop(i) {
                var resources = i * _this2._maxParamsPerRequest + '-' + ((i + 1) * _this2._maxParamsPerRequest - 1);

                /* eslint-disable */
                var searchRequest = $.Deferred();
                /* eslint-enable */

                $.ajax({
                    url: '/api/catalog_system/pub/products/search/',
                    data: $.param(paramsFormatted, true),
                    beforeSend: function beforeSend(xhr) {
                        for (var header in headers) {
                            if ({}.hasOwnProperty.call(headers, header)) {
                                xhr.setRequestHeader(header, headers[header]);
                            }
                        }
                        xhr.setRequestHeader('resources', resources);
                    },
                    success: function success(products) {
                        searchRequest.resolve(products);
                    }
                });

                xhrArray.push(searchRequest.promise());
            };

            for (var i = 0; i < requestAmount; i += 1) {
                _loop(i);
            }

            /* eslint-disable */
            var def = $.Deferred();
            /* eslint-enable */

            (_$ = $).when.apply(_$, toConsumableArray(xhrArray)).done(function () {
                for (var _len = arguments.length, requests = Array(_len), _key = 0; _key < _len; _key++) {
                    requests[_key] = arguments[_key];
                }

                requests.forEach(function (request, index) {
                    var products = request;
                    products.forEach(function (product) {
                        return _this2._setCache(product);
                    });

                    // Remove resolved fetch from array
                    xhrArray.splice(index, 1);
                });

                for (var _queryType in params) {
                    if ({}.hasOwnProperty.call(params, _queryType)) {
                        params[_queryType].forEach(function (query) {
                            var _query$split = query.split(':'),
                                _query$split2 = slicedToArray(_query$split, 2),
                                queryField = _query$split2[0],
                                queryValue = _query$split2[1];

                            var product = void 0;

                            // Add fetched params
                            _this2._fetchedParams.push(query);

                            switch (queryField) {
                                case 'skuId':
                                    {
                                        var productId = _this2._catalog.skusProductIds[queryValue];
                                        product = _this2._catalog.productCache[productId];
                                        break;
                                    }
                                case 'productId':
                                    {
                                        product = _this2._catalog.productCache[queryValue];
                                        break;
                                    }
                            }

                            if (validateHelpers.isUndefined(product)) {
                                _this2._emptyFetchedParams.push(query);
                            } else {
                                productData.push(product);
                            }
                        });
                    }
                }

                if (productData.length) {
                    _this2._setSkuCache(_this2._catalog.skusProductIds);

                    def.resolve(productData);
                } else {
                    def.reject();
                }
            });

            return def.promise();
        }

        /**
         * Request End Events
         * @param  {String} type  Register specific event type
         */

    }, {
        key: '_requestEndEvent',
        value: function _requestEndEvent(type) {
            /* eslint-disable */
            var ev = $.Event('request' + type + 'End.vtexCatalog');
            /* eslint-enable */

            setTimeout(function () {
                $(document).trigger(ev);
            }, 0);
        }
    }]);
    return Private;
}();

var _private = new Private();

var vtexCatalogMethods = {
    /**
     * Sets Catalog instance
     * @return {Void}
     */
    _setInstance: function _setInstance(catalogCache) {
        catalogCache = validateHelpers.isUndefined(catalogCache) ? false : catalogCache;

        _private._getInstance(this);
        _private._setSessionCache(catalogCache);
    },
    getProductCache: function getProductCache() {
        return _private._getProductCache();
    },
    getSkusProductId: function getSkusProductId() {
        return _private._getSkuCache();
    },


    /**
     * Search by product ID
     * @param  {Number} productId ID of the product to search
     * @return {Promise}                    Promise with search results
     */
    searchProduct: function searchProduct(productId) {
        if (validateHelpers.isUndefined(productId)) {
            return _private._error('productIdNotDefined');
        }

        /* eslint-disable */
        var def = $.Deferred();
        /* eslint-enable */

        var _productCache = _private._getProductCache();

        if (_productCache[productId]) {
            def.resolve(_productCache[productId]);
        } else {
            var params = {
                fq: ['productId:' + productId]
            };

            var search = _private._search(params);

            // Since it should be only 1 item set index is 0
            search.done(function (products) {
                return def.resolve(products[0]);
            });
        }

        def.then(function () {
            return _private._requestEndEvent('Product');
        });

        return def.promise();
    },


    /**
     * Search by sku ID
     * Sku methods stores in
     * @param  {Number} skuId ID of the sku to search
     * @return {Promise}            Promise with search results
     */
    searchSku: function searchSku(skuId) {
        if (validateHelpers.isUndefined(skuId)) {
            return _private._error('skuIdNotDefined');
        }

        /* eslint-disable */
        var def = $.Deferred();
        /* eslint-enable */

        var _productCache = _private._getProductCache();
        var _skuCache = _private._getSkuCache();

        if (_skuCache[skuId]) {
            def.resolve(_productCache[_skuCache[skuId]]);
        } else {
            var params = {
                fq: ['skuId:' + skuId]
            };

            var search = _private._search(params);

            // Since it should be only 1 item set index is 0
            search.done(function (products) {
                return def.resolve(products[0]);
            });
        }

        def.then(function () {
            return _private._requestEndEvent('Sku');
        });

        return def.promise();
    },


    /**
     * Search by product ID array
     * @param  {Array} productIdArray Array IDs of the prodcuts to search
     * @return {Promise}                            Promise with search results
     */
    searchProductArray: function searchProductArray(productIdArray) {
        if (validateHelpers.isUndefined(productIdArray)) {
            return _private._error('productIdArrayNotDefined');
        }

        if (!validateHelpers.isArray(productIdArray)) {
            return _private._error('productIdArrayNotAnArray');
        }

        /* eslint-disable */
        var def = $.Deferred();
        /* eslint-enable */

        var productData = {};
        var params = { fq: [] };
        var _productCache = _private._getProductCache();

        for (var i = 0, len = productIdArray.length; i < len; i += 1) {
            if (validateHelpers.isUndefined(_productCache[productIdArray[i]])) {
                params.fq.push('productId:' + productIdArray[i]);
            } else {
                productData[productIdArray[i]] = _productCache[productIdArray[i]];
            }
        }

        if (params.fq.length) {
            var search = _private._search(params);

            search.done(function (products) {
                for (var _i = 0, _len = products.length; _i < _len; _i += 1) {
                    productData[products[_i].productId] = products[_i];
                }

                def.resolve(productData);
            });
        } else {
            def.resolve(productData);
        }

        def.then(function () {
            return _private._requestEndEvent('ProductArray');
        });

        return def.promise();
    },


    /**
     * Search by sku ID array
     * @param  {Array} skuIdArray Array IDs of the skus to search
     * @return {Promise}                    Promise with search results
     */
    searchSkuArray: function searchSkuArray(skuIdArray) {
        if (validateHelpers.isUndefined(skuIdArray)) {
            return _private._error('skuIdArrayNotDefined');
        }

        if (!validateHelpers.isArray(skuIdArray)) {
            return _private._error('skuIdArrayNotAnArray');
        }

        /* eslint-disable */
        var def = $.Deferred();
        /* eslint-enable */

        var productData = {};
        var params = { fq: [] };
        var _productCache = _private._getProductCache();
        var _skuCache = _private._getSkuCache();

        for (var i = 0, len = skuIdArray.length; i < len; i += 1) {
            if (!_skuCache[skuIdArray[i]]) {
                params.fq.push('skuId:' + skuIdArray[i]);
            } else {
                var productId = _skuCache[skuIdArray[i]];
                productData[productId] = _productCache[productId];
            }
        }

        if (params.fq.length) {
            var search = _private._search(params);

            search.done(function (products) {
                for (var _i2 = 0, _len2 = products.length; _i2 < _len2; _i2 += 1) {
                    productData[products[_i2].productId] = products[_i2];
                }

                def.resolve(productData);
            });
        } else {
            def.resolve(productData);
        }

        def.then(function () {
            return _private._requestEndEvent('SkuArray');
        });

        return def.promise();
    },


    /**
     * Perform a full search
     * @param  {Object} params   An Object with the category search param and pricerRange if necessary
     * @return {Promise}         Promise with search results
     * @example
     *     vtexCatalog.fullSearch({fq: ['H:143', 'C:8/81/84', 'P:[0 TO 500]']})
     *         .then((res) => window.console.log(res))
     *         .fail((err) => window.console.log(err));
     */
    fullSearch: function fullSearch(params) {
        if (validateHelpers.isUndefined(params)) {
            return _private._error('searchParamsNotDefined');
        }

        if (!validateHelpers.isObject(params)) {
            return _private._error('paramsNotAnObject');
        }

        if (validateHelpers.isUndefined(params.fq)) {
            return _private._error('fqPropertyNotFound');
        }

        var mapParam = { map: [] };

        // Loop each parameter
        for (var i = 0, len = params.fq.length; i < len; i += 1) {
            var param = params.fq[i];

            // If param is the category one
            if (param.match('C:')) {
                // Generate a 'c' param in the 'mapParam' for each category
                var categoryIds = param.split('/');

                for (var z = 0, _len3 = categoryIds.length; z < _len3; z += 1) {
                    // If the 'categoryId' is a number
                    if (categoryIds[z].match(/\d.+/gi)) {
                        mapParam.map.push('c');
                    }
                }
            }

            // If param is priceFrom
            if (param.match(/P\[.+[\d\w\s]?\]/g)) {
                mapParam.map.push('priceFrom');
            }
        }

        // Join mapParam map to generate a string and push it into the params object
        mapParam.map = mapParam.map.join(',');

        // Join params and mapParam
        $.extend(params, mapParam);

        // Search
        var search = $.ajax({
            url: '/api/catalog_system/pub/products/search/',
            data: $.param(params, true),
            beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader('resources', '0-49');
            }
        });

        return search;
    }
};

/**
 * Create a VtexCatalog class
 * Vtex utilities methods
 */

var VtexCatalog = function VtexCatalog(catalogCache) {
  classCallCheck(this, VtexCatalog);

  /**
   * Object with data of the products searched
   * @type {Object}
   */
  this.productCache = {};

  /**
   * Sku ID map to productId
   * To avoid looping the products in cache in order to find the
   * needed sku, use this object to store the product ID of each sku ID
   * @type {Object}
   */
  this.skusProductIds = {};

  /**
   * Extend public methods
   * @type {Method}
   */
  globalHelpers.extend(VtexCatalog.prototype, vtexCatalogMethods);

  /**
   * Sets instance for private Methods
   * @type {Method}
   */
  this._setInstance(catalogCache);
};

/**
 * Create a VtexUtils class
 * Main class
 */

var VtexUtils = function VtexUtils() {
  classCallCheck(this, VtexUtils);

  /**
   * Version
   * @type {String}
   */
  this.version = '0.9.0';

  /**
   * Package name
   * @type {String}
   */
  this.name = '@VtexUtils';

  /**
   * Global Helpers instance
   * @type {GlobalHelpers}
   */
  this.globalHelpers = new GlobalHelpers();

  /**
   * Vtex Helpers instance
   * @type {VtexHelpers}
   */
  this.vtexHelpers = new VtexHelpers();

  /**
   * Local/Session Storage
   * @type {Object}
   */
  this.storage = store;

  /**
   * Vtex Catalog
   * @type {VtexCatalog}
   */
  this.VtexCatalog = VtexCatalog;
};

return VtexUtils;

})));
