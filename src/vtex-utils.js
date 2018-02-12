
import './utils/rivets-formatters.js';
import {store} from './utils/vendor.store.js';

import VtexHelpers from './class/VtexHelpers.js';
import GlobalHelpers from './class/GlobalHelpers.js';
import VtexCatalog from './class/VtexCatalog.js';

/**
 * Create a VtexUtils class
 * Main class
 */
class VtexUtils {
    constructor() {
        /**
         * Version
         * @type {String}
         */
        this.version = '0.7.0';

        /**
         * Package name
         * @type {String}
         */
        this.name = '@VtexUtils';

        /**
         * Global Helpers instance
         * @type {GlobalHelpers}
         */
        this.globalHelpers = new GlobalHelpers();

        /**
         * Vtex Helpers instance
         * @type {VtexHelpers}
         */
        this.vtexHelpers = new VtexHelpers();

        /**
         * Local/Session Storage
         * @type {Object}
         */
        this.storage = store;

        /**
         * Vtex Catalog instance
         * @type {VtexCatalog}
         */
        this.vtexCatalog = new VtexCatalog(this.globalHelpers, this.vtexHelpers, this.storage);
    }
}

export default VtexUtils;
