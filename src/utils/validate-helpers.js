
// cache some methods to call later on
const toString = Object.prototype.toString;

export default {
    // is a given value Arguments?
    isArguments(value) { // fallback check is for IE
        return toString.call(value) === '[object Arguments]' ||
            (value != null && typeof value === 'object' && 'callee' in value);
    },

    /**
     * Check if the given value is an array.
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
     */
    isArray(value) { // check native isArray first
        if ( Array.isArray ) {
            return Array.isArray(value);
        }

        return toString.call(value) === '[object Array]';
    },

    /**
     * Check if the given value is a boolean value.
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
     */
    isBoolean(value) {
        return value === true || value === false || toString.call(value) === '[object Boolean]';
    },

    // is a given value Char?
    isChar(value) {
        return this.isString(value) && value.length === 1;
    },

    // is a given value Date Object?
    isDate(value) {
        return toString.call(value) === '[object Date]';
    },

    // is a given object a DOM node?
    isDomNode(object) {
        return this.isObject(object) && object.nodeType > 0;
    },

    /**
     * Check if a string is a valid mail.
     * @param {string} email - The string to check
     * @return {boolean}
     */
    isEmail(email) {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        return regex.test(email);
    },

    // is a given value empty? Objects, arrays, strings
    isEmpty(value) {
        if ( this.isObject(value) ) {
            const length = Object.getOwnPropertyNames(value).length;

            if ( length === 0 || (length === 1 && this.isArray(value) ) ||
                    (length === 2 && this.isArguments(value))) {
                return true;
            }

            return false;
        }

        return value === '';
    },

    // is a given value Error object?
    isError(value) {
        return toString.call(value) === '[object Error]';
    },

    /**
     * Check if the given value is a function.
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a function, else 'false'.
     */
    isFunction(value) { // fallback check is for IE
        return toString.call(value) === '[object Function]' || typeof value === 'function';
    },

    /**
     * Check if a string is a valid JSON.
     * @param {string} str - The string to check
     * @return {boolean}
     */
    isJson(str) {
        try {
            const obj = JSON.parse(str);
            return this.isObject(obj);
        } catch (e) {/* ignore */}

        return false;
    },

    // is a given value null?
    isNull(value) {
        return value === null;
    },

    /**
     * Check if the given value is a number.
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a number, else 'false'.
     */
    isNumber(value) {
        const isNaN = Number.isNaN || window.isNaN;

        return typeof value === 'number' && ! isNaN(value);
    },

    /**
     * Check if the given value is an object
     * @param {*} value - The value to check
     * @return {boolean} Returns 'true' if the given value is an object, else 'false'
     */
    isObject(value) {
        return typeof value === 'object' && value !== null;
    },

    /**
     * Verify if as objects is empty
     * @param {object} obj - The object to verify
     * @return {boolean}
     * @example
     *     isObjectEmpty({}); // true
     */
    isObjectEmpty(obj) {
        if ( ! this.isObject(obj) ) {
            return false;
        }

        for ( let x in obj ) {
            if ( {}.hasOwnProperty.call(obj, x) ) {
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
    isPlainObject(value) {
        if ( ! this.isObject(value) ) {
            return false;
        }

        try {
            const {constructor} = value;
            const {prototype} = constructor;

            return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
        } catch (e) {
            return false;
        }
    },

    // is a given value RegExp?
    isRegexp(value) {
        return toString.call(value) === '[object RegExp]';
    },

    // are given values same type?
    isSameType(value, other) {
        const tag = toString.call(value);

        if ( tag !== toString.call(other) ) {
            return false;
        }

        return true;
    },

    /**
     * Check if the given value is a string.
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
     */
    isString(value) {
        return toString.call(value) === '[object String]';
    },

    /**
     * Check if the given value is undefined.
     * @param {*} value - The value to check.
     * @return {boolean} Returns 'true' if the given value is undefined, else 'false'.
     */
    isUndefined(value) {
        return value === void 0;
    },
};
