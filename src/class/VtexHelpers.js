
import vtexHelpers from './../utils/vtex-helpers.js';

/**
 * Create a VtexHelpers class
 * Vtex utilities methods
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

    openPopupLogin(noReload) {
        return vtexHelpers.openPopupLogin(noReload);
    }

    addToCart(items, expectedOrderFormSections, salesChannel) {
        return vtexHelpers.addToCart(items, expectedOrderFormSections, salesChannel);
    }

    clearCart() {
        return vtexHelpers.clearCart();
    }
}

export default VtexHelpers;
