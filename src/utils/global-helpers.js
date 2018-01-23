
import validateHelpers from './validate-helpers.js';

// cache some methods to call later on
const slice = Array.prototype.slice;

export default {
    /**
     * Return an array with unique values
     * @param {Array} arr - The array
     * @return {Array}
     */
    arrayUnique(arr) {
        return arr.filter((value, index, self) => {
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
    capitalize(str) {
        return str.replace(/(?:^|\s)\S/g, (match) => {
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
    chunk(array, size) {
        if ( validateHelpers.isNull(size) || this.lenght(size) < 1 ) {
            return [];
        }

        let result = [];
        let i = 0;
        const len = array.length;
        while ( i < len ) {
            result.push(slice.call(array, i, i += size));
        }

        return result;
    },

    /**
     * Removes empty index from a array
     * @param {Array} arr - The array
     * @return {Array}
     */
    cleanArray(array) {
        let newArray = [];

        for ( let i = 0, len = array.length; i < len; i += 1 ) {
            if ( array[i] ) {
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
    contains(value, elem) {
        if ( validateHelpers.isArray(elem) ) {
            for ( let i = 0, len = elem.length; i < len; i += 1 ) {
                if ( elem[i] === value ) {
                    return true;
                }
            }
        }

        if ( validateHelpers.isString(elem) ) {
            return elem.indexOf(value) >= 0;
        }

        return false;
    },

    /**
     * Replace <, >, &, ', " and / with HTML entities.
     * @param {string} str - The string to check
     * @return {boolean}
     */
    escape(str) {
        return (str.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\//g, '&#x2F;')
            .replace(/\\/g, '&#x5C;')
            .replace(/`/g, '&#96;'));
    },

    /**
     * Extend the given object
     * @param {object} obj - The object to be extended
     * @param {*} args - The rest objects which will be merged to the first object
     * @return {object} The extended object
     */
    extend(obj, ...args) {
        if ( validateHelpers.isObject(obj) && args.length > 0 ) {
            if ( Object.assign ) {
                return Object.assign(obj, ...args);
            }

            args.forEach((arg) => {
                if ( validateHelpers.isObject(arg) ) {
                    Object.keys(arg).forEach((key) => {
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
    getUrlParameter(name, entryPoint) {
        entryPoint = ! validateHelpers.isString(entryPoint) ? window.location.href : entryPoint;
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(entryPoint);

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
    implode(pieces, glue) {
        if ( validateHelpers.isArray(pieces) ) {
            return pieces.join(glue || ',');
        } else if ( validateHelpers.isObject(pieces) ) {
            let arr = [];
            for ( let o in pieces ) {
                if ( object.hasOwnProperty(o) ) {
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
    length(item) {
        if ( ! validateHelpers.isUndefined(item.length) ) {
            return item.length;
        }

        if ( validateHelpers.isObject(item) ) {
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
    objectSearch(object, needle) {
        let p;
        let key;
        let val;
        let tRet;

        for ( p in needle ) {
            if ( needle.hasOwnProperty(p) ) {
                key = p;
                val = needle[p];
            }
        }

        for ( p in object ) {
            if ( p === key ) {
                if ( object[p] === val ) {
                    return object;
                }
            } else if ( object[p] instanceof Object ) {
                if ( object.hasOwnProperty(p) ) {
                    tRet = this.objectSearch(object[p], needle);
                    if ( tRet ) {
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
    removeAccent(str) {
        const reAccents = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g;

        // Prefixed with some char to avoid off-by-one:
        const replacements = '_aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';

        return str.replace(reAccents, (match) => {
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
    shuffleArray(array) {
        let j = 0;
        let temp = [];
        let newArray = [];

        for ( let i = array.length - 1; i > 0; i-- ) {
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
    slugifyText(str) {
        str = str.replace(/^\s+|\s+$/g, '') // trim
            .toLowerCase()
            .replace(/\./g, '-') // Replace a dot for a -
            .replace(/\*/g, '-') // Replace a * for a -
            .replace(/\+/g, '-'); // Replace a + for a -

        // Remove accents, swap ñ for n, etc
        const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
        const to = 'aaaaeeeeiiiioooouuuunc------';

        for ( let i = 0, len = from.length; i < len; i += 1 ) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
            .replace(/\s+/g, '-') // Collapse whitespace and replace by -
            .replace(/-+/g, '-'); // Collapse dashes

        if ( str.charAt(0) === '-') str = str.substr(1);
        if ( str.charAt(str.length - 1) === '-') str = str.substr(0, str.length - 1);

        return str;
    },

    /**
     * Removes the host from an url
     * @param {string} url - The url
     * @return {string} The modified string
     * @example
     *     stripHost("http://test.com.br/contact/test"); //  "/contact/test"
     */
    stripHost(url) {
        let newUrl = url;
        return newUrl.toString().replace(/https?:\/\/.*?\//i, '/');
    },

    /**
     * Removes the protocol from an url
     * @param {string} url - The url
     * @return {string} The modified string
     * @example
     *     stripHttp('http://test.com.br/contact/test'); // '//test.com.br/contact/test'
     */
    stripHttp(url) {
        let newUrl = url;
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
    strReplace(search, replace, subject) {
        let regex;

        if ( validateHelpers.isArray(search) ) {
            for ( let i = 0; i < search.length; i++ ) {
                search[i] = search[i].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
                regex = new RegExp(search[i], 'g');
                subject = subject.replace(regex, (validateHelpers.isArray(replace) ? replace[i] : replace));
            }
        } else {
            search = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            regex = new RegExp(search, 'g');
            subject = subject.replace(regex, (validateHelpers.isArray(replace) ? replace[0] : replace));
        }

        return subject;
    },

    /**
     * Replaces HTML encoded entities with <, >, &, ', " and /.
     * @param {string} str - The string to check
     * @return {boolean}
     */
    unescape(str) {
        return (str.replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, '\'')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#x2F;/g, '/')
            .replace(/&#x5C;/g, '\\')
            .replace(/&#96;/g, '`'));
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
    unserialize(str) {
        str = ! validateHelpers.isString(str) ? window.location.href : str;

        if ( str.indexOf('?') < 0 ) {
            return {};
        }

        str = ( str.indexOf('?') === 0 ) ? str.substr(1) : str.slice(str.indexOf('?') + 1);

        let query = {};
        let parts = str.split('&');

        for ( let i = 0, len = parts.length; i < len; i += 1 ) {
            let part = parts[i].split('=');
            query[decodeURIComponent(part[0])] = decodeURIComponent(part[1] || '');
        }

        return query;
    },
};
