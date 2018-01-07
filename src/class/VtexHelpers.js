
import vtexHelpers from './../utils/vtex-helpers.js';

/**
 * Create a new VtexHelpers
 */
class VtexHelpers {
    formatPrice(number, thousands, decimals, length, currency) {
        return vtexHelpers.formatPrice(number, thousands, decimals, length, currency);
    }

    isValidPrice(price, thousands, decimal, decimalLength) {
        return vtexHelpers.isValidPrice(price, thousands, decimal, decimalLength);
    }

    getOriginalImage(src) {
        return vtexHelpers.getOriginalImage(src);
    }

    getResizedImage(src, width, height) {
        return vtexHelpers.getResizedImage(src, width, height);
    }

    getServerTime(callback) {
        return vtexHelpers.getServerTime(callback);
    }

    getCategories(depth, categoryId) {
        return vtexHelpers.getCategories(depth, categoryId);
    }

    replaceBreakLines(str) {
        return vtexHelpers.replaceBreakLines(str);
    }

    checkLogin() {
        return vtexHelpers.checkLogin();
    }

    openPopupLogin() {
        return vtexHelpers.openPopupLogin();
    }
}

export default VtexHelpers;
