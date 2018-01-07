
import globalHelpers from './../utils/global-helpers.js';

class GlobalHelpers {
    arrayUnique(arr) {
        return globalHelpers.arrayUnique(arr);
    }

    capitalize(str) {
        return globalHelpers.capitalize(str);
    }

    cleanArray(array) {
        return globalHelpers.cleanArray(array);
    }

    implode(pieces, glue) {
        return globalHelpers.implode(pieces, glue);
    }

    isObjectEmpty(obj) {
        return globalHelpers.isObjectEmpty(obj);
    }

    isEmail(email) {
        return globalHelpers.isEmail(email);
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
}

export default GlobalHelpers;
