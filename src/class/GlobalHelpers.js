
import validateHelpers from './../utils/validate-helpers.js';
import globalHelpers from './../utils/global-helpers.js';

/**
 * Create a GlobalHelpers class
 * Javascript utilities methods
 */
class GlobalHelpers {
    /**
     * Validate type methods
     */
    isArguments(value) {
        return validateHelpers.isArguments(value);
    }

    isArray(value) {
        return validateHelpers.isArray(value);
    }

    isBoolean(value) {
        return validateHelpers.isBoolean(value);
    }

    isChar(value) {
        return validateHelpers.isChar(value);
    }

    isDate(value) {
        return validateHelpers.isDate(value);
    }

    isDomNode(object) {
        return validateHelpers.isDomNode(object);
    }

    isEmail(email) {
        return validateHelpers.isEmail(email);
    }

    isEmpty(value) {
        return validateHelpers.isEmpty(value);
    }

    isError(value) {
        return validateHelpers.isError(value);
    }

    isFunction(value) {
        return validateHelpers.isFunction(value);
    }

    isJson(str) {
        return validateHelpers.isJson(str);
    }

    isNull(value) {
        return validateHelpers.isNull(value);
    }

    isNumber(value) {
        return validateHelpers.isNumber(value);
    }

    isObject(value) {
        return validateHelpers.isObject(value);
    }

    isObjectEmpty(obj) {
        return validateHelpers.isObjectEmpty(obj);
    }

    isPlainObject(value) {
        return validateHelpers.isPlainObject(value);
    }

    isRegexp(value) {
        return validateHelpers.isRegexp(value);
    }

    isSameType(value, other) {
        return validateHelpers.isSameType(value, other);
    }

    isString(value) {
        return validateHelpers.isString(value);
    }

    isUndefined(value) {
        return validateHelpers.isUndefined(value);
    }

    /**
     * Global Methods
     */
    arrayUnique(arr) {
        return globalHelpers.arrayUnique(arr);
    }

    capitalize(str) {
        return globalHelpers.capitalize(str);
    }

    cleanArray(array) {
        return globalHelpers.cleanArray(array);
    }

    escape(str) {
        return globalHelpers.escape(str);
    }

    extend(obj, ...args) {
        return globalHelpers.extend(obj, ...args);
    }

    getUrlParameter(name, entryPoint) {
        return globalHelpers.getUrlParameter(name, entryPoint);
    }

    implode(pieces, glue) {
        return globalHelpers.implode(pieces, glue);
    }

    length(item) {
        return globalHelpers.length(item);
    }

    objectSearch(object, needle) {
        return globalHelpers.objectSearch(object, needle);
    }

    removeAccent(str) {
        return globalHelpers.removeAccent(str);
    }

    shuffleArray(array) {
        return globalHelpers.shuffleArray(array);
    }

    slugifyText(str) {
        return globalHelpers.slugifyText(str);
    }

    stripHost(url) {
        return globalHelpers.stripHost(url);
    }

    stripHttp(url) {
        return globalHelpers.stripHttp(url);
    }

    strReplace(search, replace, subject) {
        return globalHelpers.strReplace(search, replace, subject);
    }

    throttle(callback, wait, context = this) {
        return globalHelpers._throttle(callback, wait, context);
    }

    unescape(str) {
        return globalHelpers.unescape(str);
    }

    unserialize(str) {
        return globalHelpers.unserialize(str);
    }
}

export default GlobalHelpers;
