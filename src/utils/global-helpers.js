
import validateHelpers from './validate-helpers.js';

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
    chunk(array, size) {
        size = Math.max(size, 0);
        const length = array === null ? 0 : array.length;

        if ( ! length || size < 1 ) {
            return [];
        }

        let index = 0;
        let resIndex = 0;
        const result = new Array(Math.ceil(length / size));

        while ( index < length ) {
            result[resIndex++] = this.slice(array, index, (index += size));
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
     * From Lodash
     *
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
    debounce(func, wait, options) {
        let lastArgs;
        let lastThis;
        let maxWait;
        let result;
        let timerId;
        let lastCallTime;

        let lastInvokeTime = 0;
        let leading = false;
        let maxing = false;
        let trailing = true;

        // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
        const useRAF = ( ! wait && wait !== 0 && typeof window.requestAnimationFrame === 'function' );

        if ( typeof func != 'function' ) {
            throw new TypeError('Expected a function');
        }

        wait = +wait || 0;
        if ( validateHelpers.isObject(options) ) {
            leading = !! options.leading;
            maxing = 'maxWait' in options;
            maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
        }

        function invokeFunc(time) {
            const args = lastArgs;
            const thisArg = lastThis;

            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
        }

        function startTimer(pendingFunc, wait) {
            if ( useRAF ) {
                return window.requestAnimationFrame(pendingFunc);
            }

            return setTimeout(pendingFunc, wait);
        }

        function cancelTimer(id) {
            if ( useRAF ) {
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
            const timeSinceLastCall = time - lastCallTime;
            const timeSinceLastInvoke = time - lastInvokeTime;
            const timeWaiting = wait - timeSinceLastCall;

            return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }

        function shouldInvoke(time) {
            const timeSinceLastCall = time - lastCallTime;
            const timeSinceLastInvoke = time - lastInvokeTime;

            // Either this is the first call, activity has stopped and we're at the
            // trailing edge, the system time has gone backwards and we're treating
            // it as the trailing edge, or we've hit the `maxWait` limit.
            return ( lastCallTime === undefined || ( timeSinceLastCall >= wait ) || ( timeSinceLastCall < 0 ) || ( maxing && timeSinceLastInvoke >= maxWait ) );
        }

        function timerExpired() {
            const time = Date.now();
            if ( shouldInvoke(time) ) {
                return trailingEdge(time);
            }

            // Restart the timer.
            timerId = startTimer(timerExpired, remainingWait(time));
        }

        function trailingEdge(time) {
            timerId = undefined;

            // Only invoke if we have `lastArgs` which means `func` has been
            // debounced at least once.
            if ( trailing && lastArgs ) {
                return invokeFunc(time);
            }

            lastArgs = lastThis = undefined;
            return result;
        }

        function cancel() {
            if ( timerId !== undefined ) {
                cancelTimer(timerId);
            }

            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined;
        }

        function flush() {
            return ( timerId === undefined ) ? result : trailingEdge(Date.now());
        }

        function pending() {
            return timerId !== undefined;
        }

        function debounced(...args) {
            const time = Date.now();
            const isInvoking = shouldInvoke(time);

            lastArgs = args;
            /* eslint-disable */
            lastThis = this;
            /* eslint-enable */
            lastCallTime = time;

            if ( isInvoking ) {
                if ( timerId === undefined ) {
                    return leadingEdge(lastCallTime);
                }

                if ( maxing ) {
                    // Handle invocations in a tight loop.
                    timerId = startTimer(timerExpired, wait);
                    return invokeFunc(lastCallTime);
                }
            }

            if ( timerId === undefined ) {
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
        entryPoint = ! validateHelpers.isString(entryPoint) ? window.location.href :
            ( entryPoint.substring(0, 1) === '?' ) ? entryPoint : `?${entryPoint}`;
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
     * Zero padding number
     *
     * @param  {integer} number     Number to format
     * @param  {integer} [size=2]   Digits limit
     * @return {string}             Formatted num with zero padding
     */
    pad(number, size) {
        let stringNum = String(number);

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
    removeAccent(str) {
        const reAccents = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g;

        // Prefixed with some char to avoid off-by-one:
        const replacements = '_aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';

        return str.replace(reAccents, (match) => {
            return replacements[reAccents.source.indexOf(match)];
        });
    },

    /**
     * Resize image by aspect ratio
     *
     * @param  {String} type          Resize by 'width' or 'height'
     * @param  {Number} newSize       New value to resize
     * @param  {Number} aspectRatio   Image aspect ratio (calculate by (width / height))
     * @return {Object}               Object with new 'width' and 'height'
     */
    resizeImageByRatio(type, newSize, aspectRatio) {
        if ( ! validateHelpers.isNumber(newSize) || ! validateHelpers.isNumber(aspectRatio) ) {
            throw new Error(`'newSize' and 'aspectRatio' must de a Number`);
        }

        const dimensions = {};

        switch ( type ) {
            case 'width':
                dimensions.width = parseFloat(newSize);
                dimensions.height = parseFloat((newSize / aspectRatio));

                break;

            case 'height':
                dimensions.width = parseFloat((newSize * aspectRatio));
                dimensions.height = parseFloat(newSize);

                break;

            default:
                throw new Error(`'type' needs to be 'width' or 'height'`);
        }

        return dimensions;
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
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of
     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are returned.
     *
     * From Lodash
     *
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position. A negative index will be treated as an offset from the end.
     * @param {number} [end=array.length] The end position. A negative index will be treated as an offset from the end.
     * @returns {Array} Returns the slice of `array`.
     */
    slice(array, start, end) {
        let length = array == null ? 0 : array.length;

        if ( ! length ) {
            return [];
        }
        start = start == null ? 0 : start;
        end = end === undefined ? length : end;

        if ( start < 0 ) {
            start = -start > length ? 0 : (length + start);
        }

        end = end > length ? length : end;

        if ( end < 0 ) {
            end += length;
        }

        length = start > end ? 0 : ((end - start) >>> 0);
        start >>>= 0;

        let index = -1;
        const result = new Array(length);

        while ( ++index < length ) {
            result[index] = array[index + start];
        }

        return result;
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
        const from = 'àáäâãèéëêìíïîòóöôõùúüûýÿñç·/_,:;';
        const to = 'aaaaaeeeeiiiiooooouuuuyync------';

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
     * From Lodash
     *
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
    throttle(func, wait, options) {
        let leading = true;
        let trailing = true;

        if ( typeof func !== 'function' ) {
            throw new TypeError('Expected a function');
        }

        if ( validateHelpers.isObject(options) ) {
            leading = ( 'leading' in options ) ? !! options.leading : leading;
            trailing = ( 'trailing' in options ) ? !! options.trailing : trailing;
        }

        return this.debounce(func, wait, {
            'leading': leading,
            'maxWait': wait,
            'trailing': trailing,
        });
    },

    /**
     * Invokes the iteratee `n` times, returning an array of the results of
     * each invocation. The iteratee is invoked with one argumentindex).
     *
     * From Lodash
     *
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
    times(n, iteratee) {
        /** Used as references for various `Number` constants. */
        const MAX_SAFE_INTEGER = 9007199254740991;
        /** Used as references for the maximum length and index of an array. */
        const MAX_ARRAY_LENGTH = 4294967295;

        if ( n < 1 || n > MAX_SAFE_INTEGER ) {
            return [];
        }

        let index = -1;
        const length = Math.min(n, MAX_ARRAY_LENGTH);
        const result = new Array(length);

        while ( ++index < length ) {
            result[index] = iteratee(index);
        }

        index = MAX_ARRAY_LENGTH;
        n -= MAX_ARRAY_LENGTH;

        while ( ++index < n ) {
            iteratee(index);
        }

        return result;
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
