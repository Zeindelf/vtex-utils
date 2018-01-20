
import globalHelpers from './../utils/global-helpers.js';

/**
 * Create a GlobalHelpers class
 * Javascript utilities methods
 */
class GlobalHelpers {
    isString(value) {
        return globalHelpers.isString(value);
    }

    isNumber(value) {
        return globalHelpers.isNumber(value);
    }

    isUndefined(value) {
        return globalHelpers.isUndefined(value);
    }

    isObject(value) {
        return globalHelpers.isObject(value);
    }

    isObjectEmpty(obj) {
        return globalHelpers.isObjectEmpty(obj);
    }

    isPlainObject(value) {
        return globalHelpers.isPlainObject(value);
    }

    isFunction(value) {
        return globalHelpers.isFunction(value);
    }

    isEmail(email) {
        return globalHelpers.isEmail(email);
    }

    isJson(str) {
        return globalHelpers.isJson(str);
    }

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

    unescape(str) {
        return globalHelpers.unescape(str);
    }

    unserialize(str) {
        return globalHelpers.unserialize(str);
    }
}

export default GlobalHelpers;
