
import './utils/rivets-formatters.js';
import store from './utils/vendor.store.js';

import VtexHelpers from './class/VtexHelpers.js';
import GlobalHelpers from './class/GlobalHelpers.js';

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
        this.version = '0.9.1';

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
    }
}

export default VtexUtils;
