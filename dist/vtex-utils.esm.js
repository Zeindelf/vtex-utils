
/**
 * VtexUtils.js v0.1.0
 * https://github.com/zeindelf/vtex-utils
 *
 * Copyright (c) 2017-2018 Zeindelf
 * Released under the MIT license
 *
 * Date: 2018-01-07T05:16:22.619Z
 */

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
     * @returns {string} The modified string
     * @example
     *     capitalize('foo bar'); // 'Foo Bar'
     */
    capitalize: function capitalize(str) {
        return str.replace(/(?:^|\s)\S/g, function (match) {
            return match.toUpperCase();
        });
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
     * Join array elements with glue string - PHP implode alike
     * @param {object|array} pieces - The array|object to implode.  If object it will implode the values, not the keys.
     * @param {string} [glue=','] - The glue
     * @return {string} The imploded array|object
     * @example
     *     implode(['Foo', 'Bar']); // 'Foo,Bar'
     */
    implode: function implode(pieces, glue) {
        if (pieces instanceof Array) {
            return pieces.join(glue || ',');
        } else if ((typeof pieces === 'undefined' ? 'undefined' : _typeof(pieces)) === 'object') {
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
     * Verify if as objects is empty
     * @param {object} obj - The object to verify
     * @return {boolean}
     * @example
     *     isObjectEmpty({}); // true
     */
    isObjectEmpty: function isObjectEmpty(obj) {
        for (var x in obj) {
            if ({}.hasOwnProperty.call(obj, x)) {
                return false;
            }
        }

        return true;
    },


    /**
     * Check if a string is a valid mail
     * @param {string} email - The string to check
     * @return {boolean}
     */
    isEmail: function isEmail(email) {
        var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return regex.test(email);
    },


    /**
     * Return the length of an item (Object mostly)
     * @param {mixed}
     * @returns {int}
     */
    length: function length(item) {
        if (typeof item.length !== 'undefined') {
            return item.length;
        }

        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
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
            if (p == key) {
                if (object[p] == val) {
                    return object;
                }
            } else if (object[p] instanceof Object) {
                if (object.hasOwnProperty(p)) {
                    tRet = Utils.objectSearch(object[p], needle);
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
        var _accentMap;

        var accentMap = (_accentMap = {
            'ẚ': 'a', 'Á': 'a', 'á': 'a', 'À': 'a', 'à': 'a', 'Ă': 'a', 'ă': 'a', 'Ắ': 'a', 'ắ': 'a', 'Ằ': 'a', 'ằ': 'a', 'Ẵ': 'a', 'ẵ': 'a', 'Ẳ': 'a', 'ẳ': 'a', 'Â': 'a', 'â': 'a', 'Ấ': 'a', 'ấ': 'a', 'Ầ': 'a', 'ầ': 'a', 'Ẫ': 'a', 'ẫ': 'a', 'Ẩ': 'a', 'ẩ': 'a', 'Ǎ': 'a', 'ǎ': 'a', 'Å': 'a', 'å': 'a', 'Ǻ': 'a', 'ǻ': 'a', 'Ä': 'a', 'ä': 'a', 'Ǟ': 'a', 'ǟ': 'a', 'Ã': 'a', 'ã': 'a', 'Ȧ': 'a', 'ȧ': 'a', 'Ǡ': 'a', 'ǡ': 'a', 'Ą': 'a', 'ą': 'a', 'Ā': 'a', 'ā': 'a', 'Ả': 'a', 'ả': 'a', 'Ȁ': 'a', 'ȁ': 'a', 'Ȃ': 'a', 'ȃ': 'a', 'Ạ': 'a', 'ạ': 'a', 'Ặ': 'a', 'ặ': 'a', 'Ậ': 'a', 'ậ': 'a', 'Ḁ': 'a', 'ḁ': 'a', 'Ⱥ': 'a', 'ⱥ': 'a', 'Ǽ': 'a', 'ǽ': 'a', 'Ǣ': 'a', 'ǣ': 'a', 'Ḃ': 'b', 'ḃ': 'b',
            'Ḅ': 'b', 'ḅ': 'b', 'Ḇ': 'b', 'ḇ': 'b', 'Ƀ': 'b', 'ƀ': 'b', 'ᵬ': 'b', 'Ɓ': 'b', 'ɓ': 'b', 'Ƃ': 'b', 'ƃ': 'b',
            'Ć': 'c', 'ć': 'c', 'Ĉ': 'c', 'ĉ': 'c', 'Č': 'c', 'č': 'c', 'Ċ': 'c', 'ċ': 'c', 'Ç': 'c', 'ç': 'c', 'Ḉ': 'c', 'ḉ': 'c', 'Ȼ': 'c', 'ȼ': 'c', 'Ƈ': 'c', 'ƈ': 'c', 'ɕ': 'c',
            'Ď': 'd', 'ď': 'd', 'Ḋ': 'd', 'ḋ': 'd', 'Ḑ': 'd', 'ḑ': 'd', 'Ḍ': 'd', 'ḍ': 'd', 'Ḓ': 'd', 'ḓ': 'd', 'Ḏ': 'd', 'ḏ': 'd', 'Đ': 'd', 'đ': 'd', 'ᵭ': 'd', 'Ɖ': 'd', 'ɖ': 'd', 'Ɗ': 'd', 'ɗ': 'd', 'Ƌ': 'd', 'ƌ': 'd', 'ȡ': 'd', 'ð': 'd',
            'É': 'e', 'Ə': 'e', 'Ǝ': 'e', 'ǝ': 'e', 'é': 'e', 'È': 'e', 'è': 'e', 'Ĕ': 'e', 'ĕ': 'e', 'Ê': 'e', 'ê': 'e', 'Ế': 'e', 'ế': 'e', 'Ề': 'e', 'ề': 'e', 'Ễ': 'e', 'ễ': 'e', 'Ể': 'e', 'ể': 'e', 'Ě': 'e', 'ě': 'e', 'Ë': 'e', 'ë': 'e', 'Ẽ': 'e', 'ẽ': 'e', 'Ė': 'e', 'ė': 'e', 'Ȩ': 'e', 'ȩ': 'e', 'Ḝ': 'e', 'ḝ': 'e', 'Ę': 'e', 'ę': 'e', 'Ē': 'e', 'ē': 'e', 'Ḗ': 'e', 'ḗ': 'e', 'Ḕ': 'e', 'ḕ': 'e', 'Ẻ': 'e', 'ẻ': 'e', 'Ȅ': 'e', 'ȅ': 'e', 'Ȇ': 'e', 'ȇ': 'e', 'Ẹ': 'e', 'ẹ': 'e', 'Ệ': 'e', 'ệ': 'e', 'Ḙ': 'e', 'ḙ': 'e', 'Ḛ': 'e', 'ḛ': 'e', 'Ɇ': 'e', 'ɇ': 'e', 'ɚ': 'e', 'ɝ': 'e',
            'Ḟ': 'f', 'ḟ': 'f', 'ᵮ': 'f', 'Ƒ': 'f', 'ƒ': 'f',
            'Ǵ': 'g', 'ǵ': 'g', 'Ğ': 'g', 'ğ': 'g', 'Ĝ': 'g', 'ĝ': 'g', 'Ǧ': 'g', 'ǧ': 'g', 'Ġ': 'g', 'ġ': 'g', 'Ģ': 'g', 'ģ': 'g', 'Ḡ': 'g', 'ḡ': 'g', 'Ǥ': 'g', 'ǥ': 'g', 'Ɠ': 'g', 'ɠ': 'g',
            'Ĥ': 'h', 'ĥ': 'h', 'Ȟ': 'h', 'ȟ': 'h', 'Ḧ': 'h', 'ḧ': 'h', 'Ḣ': 'h', 'ḣ': 'h', 'Ḩ': 'h', 'ḩ': 'h', 'Ḥ': 'h', 'ḥ': 'h', 'Ḫ': 'h', 'ḫ': 'h', 'H': 'h', '̱': 'h', 'ẖ': 'h', 'Ħ': 'h', 'ħ': 'h', 'Ⱨ': 'h', 'ⱨ': 'h',
            'Í': 'i', 'í': 'i', 'Ì': 'i', 'ì': 'i', 'Ĭ': 'i', 'ĭ': 'i', 'Î': 'i', 'î': 'i', 'Ǐ': 'i', 'ǐ': 'i', 'Ï': 'i', 'ï': 'i', 'Ḯ': 'i', 'ḯ': 'i', 'Ĩ': 'i', 'ĩ': 'i', 'İ': 'i', 'i': 'i', 'Į': 'i', 'ı': 'i', 'į': 'i', 'Ī': 'i', 'ī': 'i', 'Ỉ': 'i', 'ỉ': 'i', 'Ȉ': 'i', 'ȉ': 'i', 'Ȋ': 'i', 'ȋ': 'i', 'Ị': 'i', 'ị': 'i', 'Ḭ': 'i', 'ḭ': 'i', 'I': 'i' }, defineProperty(_accentMap, '\u0131', 'i'), defineProperty(_accentMap, 'Ɨ', 'i'), defineProperty(_accentMap, 'ɨ', 'i'), defineProperty(_accentMap, 'Ĵ', 'j'), defineProperty(_accentMap, 'ĵ', 'j'), defineProperty(_accentMap, 'J', 'j'), defineProperty(_accentMap, '̌', 'j'), defineProperty(_accentMap, 'ǰ', 'j'), defineProperty(_accentMap, 'ȷ', 'j'), defineProperty(_accentMap, 'Ɉ', 'j'), defineProperty(_accentMap, 'ɉ', 'j'), defineProperty(_accentMap, 'ʝ', 'j'), defineProperty(_accentMap, 'ɟ', 'j'), defineProperty(_accentMap, 'ʄ', 'j'), defineProperty(_accentMap, 'Ḱ', 'k'), defineProperty(_accentMap, 'ḱ', 'k'), defineProperty(_accentMap, 'Ǩ', 'k'), defineProperty(_accentMap, 'ǩ', 'k'), defineProperty(_accentMap, 'Ķ', 'k'), defineProperty(_accentMap, 'ķ', 'k'), defineProperty(_accentMap, 'Ḳ', 'k'), defineProperty(_accentMap, 'ḳ', 'k'), defineProperty(_accentMap, 'Ḵ', 'k'), defineProperty(_accentMap, 'ḵ', 'k'), defineProperty(_accentMap, 'Ƙ', 'k'), defineProperty(_accentMap, 'ƙ', 'k'), defineProperty(_accentMap, 'Ⱪ', 'k'), defineProperty(_accentMap, 'ⱪ', 'k'), defineProperty(_accentMap, 'Ĺ', 'l'), defineProperty(_accentMap, 'ĺ', 'l'), defineProperty(_accentMap, 'Ľ', 'l'), defineProperty(_accentMap, 'ľ', 'l'), defineProperty(_accentMap, 'Ļ', 'l'), defineProperty(_accentMap, 'ļ', 'l'), defineProperty(_accentMap, 'Ḷ', 'l'), defineProperty(_accentMap, 'ḷ', 'l'), defineProperty(_accentMap, 'Ḹ', 'l'), defineProperty(_accentMap, 'ḹ', 'l'), defineProperty(_accentMap, 'Ḽ', 'l'), defineProperty(_accentMap, 'ḽ', 'l'), defineProperty(_accentMap, 'Ḻ', 'l'), defineProperty(_accentMap, 'ḻ', 'l'), defineProperty(_accentMap, 'Ł', 'l'), defineProperty(_accentMap, 'ł', 'l'), defineProperty(_accentMap, '\u0141', 'l'), defineProperty(_accentMap, '̣', 'l'), defineProperty(_accentMap, '\u0142', 'l'), defineProperty(_accentMap, '\u0323', 'l'), defineProperty(_accentMap, 'Ŀ', 'l'), defineProperty(_accentMap, 'ŀ', 'l'), defineProperty(_accentMap, 'Ƚ', 'l'), defineProperty(_accentMap, 'ƚ', 'l'), defineProperty(_accentMap, 'Ⱡ', 'l'), defineProperty(_accentMap, 'ⱡ', 'l'), defineProperty(_accentMap, 'Ɫ', 'l'), defineProperty(_accentMap, 'ɫ', 'l'), defineProperty(_accentMap, 'ɬ', 'l'), defineProperty(_accentMap, 'ɭ', 'l'), defineProperty(_accentMap, 'ȴ', 'l'), defineProperty(_accentMap, 'Ḿ', 'm'), defineProperty(_accentMap, 'ḿ', 'm'), defineProperty(_accentMap, 'Ṁ', 'm'), defineProperty(_accentMap, 'ṁ', 'm'), defineProperty(_accentMap, 'Ṃ', 'm'), defineProperty(_accentMap, 'ṃ', 'm'), defineProperty(_accentMap, 'ɱ', 'm'), defineProperty(_accentMap, 'Ń', 'n'), defineProperty(_accentMap, 'ń', 'n'), defineProperty(_accentMap, 'Ǹ', 'n'), defineProperty(_accentMap, 'ǹ', 'n'), defineProperty(_accentMap, 'Ň', 'n'), defineProperty(_accentMap, 'ň', 'n'), defineProperty(_accentMap, 'Ñ', 'n'), defineProperty(_accentMap, 'ñ', 'n'), defineProperty(_accentMap, 'Ṅ', 'n'), defineProperty(_accentMap, 'ṅ', 'n'), defineProperty(_accentMap, 'Ņ', 'n'), defineProperty(_accentMap, 'ņ', 'n'), defineProperty(_accentMap, 'Ṇ', 'n'), defineProperty(_accentMap, 'ṇ', 'n'), defineProperty(_accentMap, 'Ṋ', 'n'), defineProperty(_accentMap, 'ṋ', 'n'), defineProperty(_accentMap, 'Ṉ', 'n'), defineProperty(_accentMap, 'ṉ', 'n'), defineProperty(_accentMap, 'Ɲ', 'n'), defineProperty(_accentMap, 'ɲ', 'n'), defineProperty(_accentMap, 'Ƞ', 'n'), defineProperty(_accentMap, 'ƞ', 'n'), defineProperty(_accentMap, 'ɳ', 'n'), defineProperty(_accentMap, 'ȵ', 'n'), defineProperty(_accentMap, 'N', 'n'), defineProperty(_accentMap, '̈', 'n'), defineProperty(_accentMap, 'n', 'n'), defineProperty(_accentMap, '\u0308', 'n'), defineProperty(_accentMap, 'Ó', 'o'), defineProperty(_accentMap, 'ó', 'o'), defineProperty(_accentMap, 'Ò', 'o'), defineProperty(_accentMap, 'ò', 'o'), defineProperty(_accentMap, 'Ŏ', 'o'), defineProperty(_accentMap, 'ŏ', 'o'), defineProperty(_accentMap, 'Ô', 'o'), defineProperty(_accentMap, 'ô', 'o'), defineProperty(_accentMap, 'Ố', 'o'), defineProperty(_accentMap, 'ố', 'o'), defineProperty(_accentMap, 'Ồ', 'o'), defineProperty(_accentMap, 'ồ', 'o'), defineProperty(_accentMap, 'Ỗ', 'o'), defineProperty(_accentMap, 'ỗ', 'o'), defineProperty(_accentMap, 'Ổ', 'o'), defineProperty(_accentMap, 'ổ', 'o'), defineProperty(_accentMap, 'Ǒ', 'o'), defineProperty(_accentMap, 'ǒ', 'o'), defineProperty(_accentMap, 'Ö', 'o'), defineProperty(_accentMap, 'ö', 'o'), defineProperty(_accentMap, 'Ȫ', 'o'), defineProperty(_accentMap, 'ȫ', 'o'), defineProperty(_accentMap, 'Ő', 'o'), defineProperty(_accentMap, 'ő', 'o'), defineProperty(_accentMap, 'Õ', 'o'), defineProperty(_accentMap, 'õ', 'o'), defineProperty(_accentMap, 'Ṍ', 'o'), defineProperty(_accentMap, 'ṍ', 'o'), defineProperty(_accentMap, 'Ṏ', 'o'), defineProperty(_accentMap, 'ṏ', 'o'), defineProperty(_accentMap, 'Ȭ', 'o'), defineProperty(_accentMap, 'ȭ', 'o'), defineProperty(_accentMap, 'Ȯ', 'o'), defineProperty(_accentMap, 'ȯ', 'o'), defineProperty(_accentMap, 'Ȱ', 'o'), defineProperty(_accentMap, 'ȱ', 'o'), defineProperty(_accentMap, 'Ø', 'o'), defineProperty(_accentMap, 'ø', 'o'), defineProperty(_accentMap, 'Ǿ', 'o'), defineProperty(_accentMap, 'ǿ', 'o'), defineProperty(_accentMap, 'Ǫ', 'o'), defineProperty(_accentMap, 'ǫ', 'o'), defineProperty(_accentMap, 'Ǭ', 'o'), defineProperty(_accentMap, 'ǭ', 'o'), defineProperty(_accentMap, 'Ō', 'o'), defineProperty(_accentMap, 'ō', 'o'), defineProperty(_accentMap, 'Ṓ', 'o'), defineProperty(_accentMap, 'ṓ', 'o'), defineProperty(_accentMap, 'Ṑ', 'o'), defineProperty(_accentMap, 'ṑ', 'o'), defineProperty(_accentMap, 'Ỏ', 'o'), defineProperty(_accentMap, 'ỏ', 'o'), defineProperty(_accentMap, 'Ȍ', 'o'), defineProperty(_accentMap, 'ȍ', 'o'), defineProperty(_accentMap, 'Ȏ', 'o'), defineProperty(_accentMap, 'ȏ', 'o'), defineProperty(_accentMap, 'Ơ', 'o'), defineProperty(_accentMap, 'ơ', 'o'), defineProperty(_accentMap, 'Ớ', 'o'), defineProperty(_accentMap, 'ớ', 'o'), defineProperty(_accentMap, 'Ờ', 'o'), defineProperty(_accentMap, 'ờ', 'o'), defineProperty(_accentMap, 'Ỡ', 'o'), defineProperty(_accentMap, 'ỡ', 'o'), defineProperty(_accentMap, 'Ở', 'o'), defineProperty(_accentMap, 'ở', 'o'), defineProperty(_accentMap, 'Ợ', 'o'), defineProperty(_accentMap, 'ợ', 'o'), defineProperty(_accentMap, 'Ọ', 'o'), defineProperty(_accentMap, 'ọ', 'o'), defineProperty(_accentMap, 'Ộ', 'o'), defineProperty(_accentMap, 'ộ', 'o'), defineProperty(_accentMap, 'Ɵ', 'o'), defineProperty(_accentMap, 'ɵ', 'o'), defineProperty(_accentMap, 'Ṕ', 'p'), defineProperty(_accentMap, 'ṕ', 'p'), defineProperty(_accentMap, 'Ṗ', 'p'), defineProperty(_accentMap, 'ṗ', 'p'), defineProperty(_accentMap, 'Ᵽ', 'p'), defineProperty(_accentMap, 'Ƥ', 'p'), defineProperty(_accentMap, 'ƥ', 'p'), defineProperty(_accentMap, 'P', 'p'), defineProperty(_accentMap, '̃', 'p'), defineProperty(_accentMap, 'p', 'p'), defineProperty(_accentMap, '\u0303', 'p'), defineProperty(_accentMap, 'ʠ', 'q'), defineProperty(_accentMap, 'Ɋ', 'q'), defineProperty(_accentMap, 'ɋ', 'q'), defineProperty(_accentMap, 'Ŕ', 'r'), defineProperty(_accentMap, 'ŕ', 'r'), defineProperty(_accentMap, 'Ř', 'r'), defineProperty(_accentMap, 'ř', 'r'), defineProperty(_accentMap, 'Ṙ', 'r'), defineProperty(_accentMap, 'ṙ', 'r'), defineProperty(_accentMap, 'Ŗ', 'r'), defineProperty(_accentMap, 'ŗ', 'r'), defineProperty(_accentMap, 'Ȑ', 'r'), defineProperty(_accentMap, 'ȑ', 'r'), defineProperty(_accentMap, 'Ȓ', 'r'), defineProperty(_accentMap, 'ȓ', 'r'), defineProperty(_accentMap, 'Ṛ', 'r'), defineProperty(_accentMap, 'ṛ', 'r'), defineProperty(_accentMap, 'Ṝ', 'r'), defineProperty(_accentMap, 'ṝ', 'r'), defineProperty(_accentMap, 'Ṟ', 'r'), defineProperty(_accentMap, 'ṟ', 'r'), defineProperty(_accentMap, 'Ɍ', 'r'), defineProperty(_accentMap, 'ɍ', 'r'), defineProperty(_accentMap, 'ᵲ', 'r'), defineProperty(_accentMap, 'ɼ', 'r'), defineProperty(_accentMap, 'Ɽ', 'r'), defineProperty(_accentMap, 'ɽ', 'r'), defineProperty(_accentMap, 'ɾ', 'r'), defineProperty(_accentMap, 'ᵳ', 'r'), defineProperty(_accentMap, 'ß', 's'), defineProperty(_accentMap, 'Ś', 's'), defineProperty(_accentMap, 'ś', 's'), defineProperty(_accentMap, 'Ṥ', 's'), defineProperty(_accentMap, 'ṥ', 's'), defineProperty(_accentMap, 'Ŝ', 's'), defineProperty(_accentMap, 'ŝ', 's'), defineProperty(_accentMap, 'Š', 's'), defineProperty(_accentMap, 'š', 's'), defineProperty(_accentMap, 'Ṧ', 's'), defineProperty(_accentMap, 'ṧ', 's'), defineProperty(_accentMap, 'Ṡ', 's'), defineProperty(_accentMap, 'ṡ', 's'), defineProperty(_accentMap, 'ẛ', 's'), defineProperty(_accentMap, 'Ş', 's'), defineProperty(_accentMap, 'ş', 's'), defineProperty(_accentMap, 'Ṣ', 's'), defineProperty(_accentMap, 'ṣ', 's'), defineProperty(_accentMap, 'Ṩ', 's'), defineProperty(_accentMap, 'ṩ', 's'), defineProperty(_accentMap, 'Ș', 's'), defineProperty(_accentMap, 'ș', 's'), defineProperty(_accentMap, 'ʂ', 's'), defineProperty(_accentMap, 'S', 's'), defineProperty(_accentMap, '̩', 's'), defineProperty(_accentMap, 's', 's'), defineProperty(_accentMap, '\u0329', 's'), defineProperty(_accentMap, 'Þ', 't'), defineProperty(_accentMap, 'þ', 't'), defineProperty(_accentMap, 'Ť', 't'), defineProperty(_accentMap, 'ť', 't'), defineProperty(_accentMap, 'T', 't'), defineProperty(_accentMap, '\u0308', 't'), defineProperty(_accentMap, 'ẗ', 't'), defineProperty(_accentMap, 'Ṫ', 't'), defineProperty(_accentMap, 'ṫ', 't'), defineProperty(_accentMap, 'Ţ', 't'), defineProperty(_accentMap, 'ţ', 't'), defineProperty(_accentMap, 'Ṭ', 't'), defineProperty(_accentMap, 'ṭ', 't'), defineProperty(_accentMap, 'Ț', 't'), defineProperty(_accentMap, 'ț', 't'), defineProperty(_accentMap, 'Ṱ', 't'), defineProperty(_accentMap, 'ṱ', 't'), defineProperty(_accentMap, 'Ṯ', 't'), defineProperty(_accentMap, 'ṯ', 't'), defineProperty(_accentMap, 'Ŧ', 't'), defineProperty(_accentMap, 'ŧ', 't'), defineProperty(_accentMap, 'Ⱦ', 't'), defineProperty(_accentMap, 'ⱦ', 't'), defineProperty(_accentMap, 'ᵵ', 't'), defineProperty(_accentMap, 'ƫ', 't'), defineProperty(_accentMap, 'Ƭ', 't'), defineProperty(_accentMap, 'ƭ', 't'), defineProperty(_accentMap, 'Ʈ', 't'), defineProperty(_accentMap, 'ʈ', 't'), defineProperty(_accentMap, 'ȶ', 't'), defineProperty(_accentMap, 'Ú', 'u'), defineProperty(_accentMap, 'ú', 'u'), defineProperty(_accentMap, 'Ù', 'u'), defineProperty(_accentMap, 'ù', 'u'), defineProperty(_accentMap, 'Ŭ', 'u'), defineProperty(_accentMap, 'ŭ', 'u'), defineProperty(_accentMap, 'Û', 'u'), defineProperty(_accentMap, 'û', 'u'), defineProperty(_accentMap, 'Ǔ', 'u'), defineProperty(_accentMap, 'ǔ', 'u'), defineProperty(_accentMap, 'Ů', 'u'), defineProperty(_accentMap, 'ů', 'u'), defineProperty(_accentMap, 'Ü', 'u'), defineProperty(_accentMap, 'ü', 'u'), defineProperty(_accentMap, 'Ǘ', 'u'), defineProperty(_accentMap, 'ǘ', 'u'), defineProperty(_accentMap, 'Ǜ', 'u'), defineProperty(_accentMap, 'ǜ', 'u'), defineProperty(_accentMap, 'Ǚ', 'u'), defineProperty(_accentMap, 'ǚ', 'u'), defineProperty(_accentMap, 'Ǖ', 'u'), defineProperty(_accentMap, 'ǖ', 'u'), defineProperty(_accentMap, 'Ű', 'u'), defineProperty(_accentMap, 'ű', 'u'), defineProperty(_accentMap, 'Ũ', 'u'), defineProperty(_accentMap, 'ũ', 'u'), defineProperty(_accentMap, 'Ṹ', 'u'), defineProperty(_accentMap, 'ṹ', 'u'), defineProperty(_accentMap, 'Ų', 'u'), defineProperty(_accentMap, 'ų', 'u'), defineProperty(_accentMap, 'Ū', 'u'), defineProperty(_accentMap, 'ū', 'u'), defineProperty(_accentMap, 'Ṻ', 'u'), defineProperty(_accentMap, 'ṻ', 'u'), defineProperty(_accentMap, 'Ủ', 'u'), defineProperty(_accentMap, 'ủ', 'u'), defineProperty(_accentMap, 'Ȕ', 'u'), defineProperty(_accentMap, 'ȕ', 'u'), defineProperty(_accentMap, 'Ȗ', 'u'), defineProperty(_accentMap, 'ȗ', 'u'), defineProperty(_accentMap, 'Ư', 'u'), defineProperty(_accentMap, 'ư', 'u'), defineProperty(_accentMap, 'Ứ', 'u'), defineProperty(_accentMap, 'ứ', 'u'), defineProperty(_accentMap, 'Ừ', 'u'), defineProperty(_accentMap, 'ừ', 'u'), defineProperty(_accentMap, 'Ữ', 'u'), defineProperty(_accentMap, 'ữ', 'u'), defineProperty(_accentMap, 'Ử', 'u'), defineProperty(_accentMap, 'ử', 'u'), defineProperty(_accentMap, 'Ự', 'u'), defineProperty(_accentMap, 'ự', 'u'), defineProperty(_accentMap, 'Ụ', 'u'), defineProperty(_accentMap, 'ụ', 'u'), defineProperty(_accentMap, 'Ṳ', 'u'), defineProperty(_accentMap, 'ṳ', 'u'), defineProperty(_accentMap, 'Ṷ', 'u'), defineProperty(_accentMap, 'ṷ', 'u'), defineProperty(_accentMap, 'Ṵ', 'u'), defineProperty(_accentMap, 'ṵ', 'u'), defineProperty(_accentMap, 'Ʉ', 'u'), defineProperty(_accentMap, 'ʉ', 'u'), defineProperty(_accentMap, 'Ṽ', 'v'), defineProperty(_accentMap, 'ṽ', 'v'), defineProperty(_accentMap, 'Ṿ', 'v'), defineProperty(_accentMap, 'ṿ', 'v'), defineProperty(_accentMap, 'Ʋ', 'v'), defineProperty(_accentMap, 'ʋ', 'v'), defineProperty(_accentMap, 'Ẃ', 'w'), defineProperty(_accentMap, 'ẃ', 'w'), defineProperty(_accentMap, 'Ẁ', 'w'), defineProperty(_accentMap, 'ẁ', 'w'), defineProperty(_accentMap, 'Ŵ', 'w'), defineProperty(_accentMap, 'ŵ', 'w'), defineProperty(_accentMap, 'W', 'w'), defineProperty(_accentMap, '̊', 'w'), defineProperty(_accentMap, 'ẘ', 'w'), defineProperty(_accentMap, 'Ẅ', 'w'), defineProperty(_accentMap, 'ẅ', 'w'), defineProperty(_accentMap, 'Ẇ', 'w'), defineProperty(_accentMap, 'ẇ', 'w'), defineProperty(_accentMap, 'Ẉ', 'w'), defineProperty(_accentMap, 'ẉ', 'w'), defineProperty(_accentMap, 'Ẍ', 'x'), defineProperty(_accentMap, 'ẍ', 'x'), defineProperty(_accentMap, 'Ẋ', 'x'), defineProperty(_accentMap, 'ẋ', 'x'), defineProperty(_accentMap, 'Ý', 'y'), defineProperty(_accentMap, 'ý', 'y'), defineProperty(_accentMap, 'Ỳ', 'y'), defineProperty(_accentMap, 'ỳ', 'y'), defineProperty(_accentMap, 'Ŷ', 'y'), defineProperty(_accentMap, 'ŷ', 'y'), defineProperty(_accentMap, 'Y', 'y'), defineProperty(_accentMap, '\u030A', 'y'), defineProperty(_accentMap, 'ẙ', 'y'), defineProperty(_accentMap, 'Ÿ', 'y'), defineProperty(_accentMap, 'ÿ', 'y'), defineProperty(_accentMap, 'Ỹ', 'y'), defineProperty(_accentMap, 'ỹ', 'y'), defineProperty(_accentMap, 'Ẏ', 'y'), defineProperty(_accentMap, 'ẏ', 'y'), defineProperty(_accentMap, 'Ȳ', 'y'), defineProperty(_accentMap, 'ȳ', 'y'), defineProperty(_accentMap, 'Ỷ', 'y'), defineProperty(_accentMap, 'ỷ', 'y'), defineProperty(_accentMap, 'Ỵ', 'y'), defineProperty(_accentMap, 'ỵ', 'y'), defineProperty(_accentMap, 'ʏ', 'y'), defineProperty(_accentMap, 'Ɏ', 'y'), defineProperty(_accentMap, 'ɏ', 'y'), defineProperty(_accentMap, 'Ƴ', 'y'), defineProperty(_accentMap, 'ƴ', 'y'), defineProperty(_accentMap, 'Ź', 'z'), defineProperty(_accentMap, 'ź', 'z'), defineProperty(_accentMap, 'Ẑ', 'z'), defineProperty(_accentMap, 'ẑ', 'z'), defineProperty(_accentMap, 'Ž', 'z'), defineProperty(_accentMap, 'ž', 'z'), defineProperty(_accentMap, 'Ż', 'z'), defineProperty(_accentMap, 'ż', 'z'), defineProperty(_accentMap, 'Ẓ', 'z'), defineProperty(_accentMap, 'ẓ', 'z'), defineProperty(_accentMap, 'Ẕ', 'z'), defineProperty(_accentMap, 'ẕ', 'z'), defineProperty(_accentMap, 'Ƶ', 'z'), defineProperty(_accentMap, 'ƶ', 'z'), defineProperty(_accentMap, 'Ȥ', 'z'), defineProperty(_accentMap, 'ȥ', 'z'), defineProperty(_accentMap, 'ʐ', 'z'), defineProperty(_accentMap, 'ʑ', 'z'), defineProperty(_accentMap, 'Ⱬ', 'z'), defineProperty(_accentMap, 'ⱬ', 'z'), defineProperty(_accentMap, 'Ǯ', 'z'), defineProperty(_accentMap, 'ǯ', 'z'), defineProperty(_accentMap, 'ƺ', 'z'), defineProperty(_accentMap, '２', '2'), defineProperty(_accentMap, '６', '6'), defineProperty(_accentMap, 'Ｂ', 'B'), defineProperty(_accentMap, 'Ｆ', 'F'), defineProperty(_accentMap, 'Ｊ', 'J'), defineProperty(_accentMap, 'Ｎ', 'N'), defineProperty(_accentMap, 'Ｒ', 'R'), defineProperty(_accentMap, 'Ｖ', 'V'), defineProperty(_accentMap, 'Ｚ', 'Z'), defineProperty(_accentMap, 'ｂ', 'b'), defineProperty(_accentMap, 'ｆ', 'f'), defineProperty(_accentMap, 'ｊ', 'j'), defineProperty(_accentMap, 'ｎ', 'n'), defineProperty(_accentMap, 'ｒ', 'r'), defineProperty(_accentMap, 'ｖ', 'v'), defineProperty(_accentMap, 'ｚ', 'z'), defineProperty(_accentMap, '１', '1'), defineProperty(_accentMap, '５', '5'), defineProperty(_accentMap, '９', '9'), defineProperty(_accentMap, 'Ａ', 'A'), defineProperty(_accentMap, 'Ｅ', 'E'), defineProperty(_accentMap, 'Ｉ', 'I'), defineProperty(_accentMap, 'Ｍ', 'M'), defineProperty(_accentMap, 'Ｑ', 'Q'), defineProperty(_accentMap, 'Ｕ', 'U'), defineProperty(_accentMap, 'Ｙ', 'Y'), defineProperty(_accentMap, 'ａ', 'a'), defineProperty(_accentMap, 'ｅ', 'e'), defineProperty(_accentMap, 'ｉ', 'i'), defineProperty(_accentMap, 'ｍ', 'm'), defineProperty(_accentMap, 'ｑ', 'q'), defineProperty(_accentMap, 'ｕ', 'u'), defineProperty(_accentMap, 'ｙ', 'y'), defineProperty(_accentMap, '０', '0'), defineProperty(_accentMap, '４', '4'), defineProperty(_accentMap, '８', '8'), defineProperty(_accentMap, 'Ｄ', 'D'), defineProperty(_accentMap, 'Ｈ', 'H'), defineProperty(_accentMap, 'Ｌ', 'L'), defineProperty(_accentMap, 'Ｐ', 'P'), defineProperty(_accentMap, 'Ｔ', 'T'), defineProperty(_accentMap, 'Ｘ', 'X'), defineProperty(_accentMap, 'ｄ', 'd'), defineProperty(_accentMap, 'ｈ', 'h'), defineProperty(_accentMap, 'ｌ', 'l'), defineProperty(_accentMap, 'ｐ', 'p'), defineProperty(_accentMap, 'ｔ', 't'), defineProperty(_accentMap, 'ｘ', 'x'), defineProperty(_accentMap, '３', '3'), defineProperty(_accentMap, '７', '7'), defineProperty(_accentMap, 'Ｃ', 'C'), defineProperty(_accentMap, 'Ｇ', 'G'), defineProperty(_accentMap, 'Ｋ', 'K'), defineProperty(_accentMap, 'Ｏ', 'O'), defineProperty(_accentMap, 'Ｓ', 'S'), defineProperty(_accentMap, 'Ｗ', 'W'), defineProperty(_accentMap, 'ｃ', 'c'), defineProperty(_accentMap, 'ｇ', 'g'), defineProperty(_accentMap, 'ｋ', 'k'), defineProperty(_accentMap, 'ｏ', 'o'), defineProperty(_accentMap, 'ｓ', 's'), defineProperty(_accentMap, 'ｗ', 'w'), _accentMap);

        if (str !== null) {
            return str.replace(/[\W\[\] ]/g, function (a) {
                return accentMap[a] || a;
            });
        }
    },


    /**
     * Randomize a array elements with Fisher–Yates shuffle algorithm base
     * @param {array} array - The array to randomize
     * @return {array} The modified array
     * @example
     *     const arr = [1, 2, 3, 4];
     *     shuffleArray(arr); // [3, 2, 4, 1]
     */
    shuffleArray: function shuffleArray(array) {
        var j = 0;
        var temp = [];

        for (var i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];

            array[i] = array[j];
            array[j] = temp;
        }

        return array;
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
     * @example stripHost("http://test.com.br/contact/test"); //  "/contact/test"
     */
    stripHost: function stripHost(url) {
        return url.toString().replace(/https?:\/\/.*?\//i, '/');
    },


    /**
     * Removes the protocol from an url
     * @param {string} url - The url
     * @return {string} The modified string
     * @example
     *     stripHttp('http://test.com.br/contact/test'); // '//test.com.br/contact/test'
     */
    stripHttp: function stripHttp(url) {
        return url.replace(/^https?:/, '');
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

        if (search instanceof Array) {
            for (var i = 0; i < search.length; i++) {
                search[i] = search[i].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
                regex = new RegExp(search[i], 'g');
                subject = subject.replace(regex, replace instanceof Array ? replace[i] : replace);
            }
        } else {
            search = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            regex = new RegExp(search, 'g');
            subject = subject.replace(regex, replace instanceof Array ? replace[0] : replace);
        }

        return subject;
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
        currency = typeof currency === 'string' ? currency + ' ' : 'R$ ';
        length = typeof length !== 'number' ? 2 : length;

        var re = '\\d(?=(\\d{' + 3 + '})+' + (length > 0 ? '\\D' : '$') + ')';
        number = number / 100;
        number = (number * 1).toFixed(Math.max(0, ~~length));

        return currency + number.replace('.', decimals || ',').replace(new RegExp(re, 'g'), '$&' + (thousands || '.'));
    },


    /**
     * Check if the given price is valid
     *
     * @param {string}      price               The price to check
     * @param {string}      [thousand = ','']   The thousands separator
     * @param {string}      [decimal = '.'']    The decimal separator
     * @param {int}         [decimalLength = 2] The decimal length
     * @return {boolean}
     */
    isValidPrice: function isValidPrice(price, thousands, decimal, decimalLength) {
        // ^[0-9]{1,3}(?:\,(?:(?:[0-9]{3}(?:,|))+))?(?:\.[0-9]{0,2})?$
        thousands = thousands || ',';
        decimal = decimal || '.';
        decimalLength = typeof decimalLength !== 'number' ? 2 : decimalLength;
        var regex = new RegExp('^[0-9]{1,3}(?:\\' + thousands + '(?:(?:[0-9]{3}(?:' + thousands + '|))+))?(?:\\' + decimal + '[0-9]{0,' + decimalLength + '})?$');
        return regex.test(price.toString());
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
        return typeof src === 'string' ? src.replace(/(ids\/[0-9]+)-([0-9-]+)\//, '$1/') : src;
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
        if (width === undefined || height === undefined || typeof src != 'string') {
            return src;
        }

        src = src.replace(/(?:ids\/[0-9]+)-([0-9]+)-([0-9]+)\//, function (match, matchedWidth, matchedHeight) {
            return match.replace('-' + matchedWidth + '-' + matchedHeight, '-' + width + '-' + height);
        });

        return src.replace(/(ids\/[0-9]+)\//, '$1-' + width + '-' + height + '/');
    },


    /**
     * Get the VTEX server time
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

            if (typeof callback === 'function') {
                callback.call(null, new Date(year + '/' + month + '/' + day + ' ' + time));
            }
        });
    },


    /**
     * Get category tree
     * @param [depth=50] - The tree depth
     * @param [categoryId] - Return the specific Category
     * @return {promise} Promise
     * @example
     *     vtexHelpers.getCategories().then((res) => console.log(res)) // Return all categories
     *     vtexHelpers.getCategories(1, 1000001).then((res) => console.log(res)) // Return 1 level from category id
     */
    getCategories: function getCategories(depth, categoryId) {
        /* eslint-disable */
        return $.Deferred(function (def) {
            /* eslint-enable */
            return $.ajax({
                type: 'GET',
                url: '/api/catalog_system/pub/category/tree/' + (depth || 50),
                dataType: 'json',
                headers: {
                    accept: 'application/json',
                    contentType: 'application/json; charset=utf-8'
                }
            }).done(function (res) {
                if (typeof categoryId !== 'undefined') {
                    def.resolve(globalHelpers.objectSearch(res, {
                        id: categoryId
                    }));
                } else {
                    def.resolve(res);
                }
            }).fail(function (err) {
                def.reject();
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
        src = str.replace ? str.replace(/(?:\r\n|\r|\n)/g, '<br />') : '';

        return str;
    },


    /**
     * Check if the user is logged into VTEX
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
                if (typeof res.IsUserDefined === 'undefined' || !res.IsUserDefined) {
                    def.reject(res);
                } else {
                    def.resolve(res);
                }
            }).fail(function (err) {
                def.reject();
            });
        }).promise();
    },


    /**
     * Open default Vtex popup login
     * @return {void}
     */
    openPopupLogin: function openPopupLogin() {
        vtexid.start({
            returnUrl: '/',
            userEmail: '',
            locale: 'pt-BR',
            forceReload: false
        });
    }
};

/**
 * Create a new VtexHelpers
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
        value: function openPopupLogin() {
            return vtexHelpers.openPopupLogin();
        }
    }]);
    return VtexHelpers;
}();

var GlobalHelpers = function () {
    function GlobalHelpers() {
        classCallCheck(this, GlobalHelpers);
    }

    createClass(GlobalHelpers, [{
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
        key: 'implode',
        value: function implode(pieces, glue) {
            return globalHelpers.implode(pieces, glue);
        }
    }, {
        key: 'isObjectEmpty',
        value: function isObjectEmpty(obj) {
            return globalHelpers.isObjectEmpty(obj);
        }
    }, {
        key: 'isEmail',
        value: function isEmail(email) {
            return globalHelpers.isEmail(email);
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
    }]);
    return GlobalHelpers;
}();

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

var VtexUtils = function VtexUtils() {
    classCallCheck(this, VtexUtils);

    this.version = '0.1.0';
    this.globalHelpers = new GlobalHelpers();
    this.vtexHelpers = new VtexHelpers();
};

export default VtexUtils;
