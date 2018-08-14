
import vtexHelpers from './../utils/vtex-helpers.js';

/**
 * Create a VtexHelpers class
 * Vtex utilities methods
 */
class VtexHelpers {
    formatPrice(number, thousands, decimals, length, currency) {
        return vtexHelpers.formatPrice(number, thousands, decimals, length, currency);
    }

    unformatPrice(value, decimal, formatNumber) {
        return vtexHelpers.unformatPrice(value, decimal, formatNumber);
    }

    fixProductSearchPrice(val) {
        return vtexHelpers.fixProductSearchPrice(val);
    }

    getFirstAvailableSku(product) {
        return vtexHelpers.getFirstAvailableSku(product);
    }

    getOriginalImage(src) {
        return vtexHelpers.getOriginalImage(src);
    }

    getResizedImage(src, width, height) {
        return vtexHelpers.getResizedImage(src, width, height);
    }

    getResizeImageByRatio(src, type, newSize, aspectRatio) {
        return vtexHelpers.getResizeImageByRatio(src, type, newSize, aspectRatio);
    }

    getServerTime(callback) {
        return vtexHelpers.getServerTime(callback);
    }

    getCategories(depth, categoryId) {
        return vtexHelpers.getCategories(depth, categoryId);
    }

    getProductSpec(data, specName, defaultVal) {
        return vtexHelpers.getProductSpec(data, specName, defaultVal);
    }

    getProductSellerInfo(product, sellerId) {
        return vtexHelpers.getProductSellerInfo(product, sellerId);
    }

    getProductInstallments(product, sellerId) {
        return vtexHelpers.getProductInstallments(product, sellerId);
    }

    getProductBankInvoice(product, sellerId) {
        return vtexHelpers.getProductBankInvoice(product, sellerId);
    }

    getProductPriceInfo(sellerInfo) {
        return vtexHelpers.getProductPriceInfo(sellerInfo);
    }

    getGroupInstallments(data, sellerId) {
        return vtexHelpers.getGroupInstallments(data, sellerId);
    }

    getShipping(postalCode, skuId, quantity) {
        return vtexHelpers.getShipping(postalCode, skuId, quantity);
    }

    sortProductSearch(product, map, dimension, reverse) {
        return vtexHelpers.sortProductSearch(product, map, dimension, reverse);
    }

    sortProductVariations(product, map, dimension, reverse) {
        return vtexHelpers.sortProductVariations(product, map, dimension, reverse);
    }

    replaceBreakLines(str) {
        return vtexHelpers.replaceBreakLines(str);
    }

    stringIdsToArray(str, separator) {
        return vtexHelpers.stringIdsToArray(str, separator);
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

    notifyMe(name, email, skuId) {
        return vtexHelpers.notifyMe(name, email, skuId);
    }
}

export default VtexHelpers;
