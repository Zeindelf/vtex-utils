
import vtexCatalogMethods from './../methods/vtex-catalog.methods.js';

/**
 * Create a VtexCatalog class
 * Vtex utilities methods
 */
class VtexCatalog {
    constructor(globalHelpers, vtexHelpers, storage) {
        /**
         * Set Helpers
         */
        this.globalHelpers = globalHelpers;
        this.vtexHelpers = vtexHelpers;
        this.storage = storage;

        // Session Cache
        this.sessionCache = true;

        /**
         * Cache products on Session Storage
         * @type {Object}
         */
        this.session = this.storage.session;

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
        this.globalHelpers.extend(VtexCatalog.prototype, vtexCatalogMethods);

        /**
         * Sets instance for private Methods
         * @type {Method}
         */
        this.setInstance();

        /**
         * Init Session Sorage AJAX Cache
         * @type {Method}
         */
        this.initStorage();
    }
}

export default VtexCatalog;
