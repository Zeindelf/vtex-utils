
import globalHelpers from './../utils/global-helpers.js';
import vtexCatalogMethods from './../methods/vtex-catalog.methods.js';

/**
 * Create a VtexCatalog class
 * Vtex utilities methods
 */
class VtexCatalog {
    constructor(catalogCache) {
        /**
         * Object with data of the products searched
         * @type {Object}
         */
        this.productCache = {};

        /**
         * Sku ID map to productId
         * To avoid looping the products in cache in order to find the
         * needed sku, use this object to store the product ID of each sku ID
         * @type {Object}
         */
        this.skusProductIds = {};

        /**
         * Extend public methods
         * @type {Method}
         */
        globalHelpers.extend(VtexCatalog.prototype, vtexCatalogMethods);

        /**
         * Sets instance for private Methods
         * @type {Method}
         */
        this._setInstance(catalogCache);
    }
}

export default VtexCatalog;
