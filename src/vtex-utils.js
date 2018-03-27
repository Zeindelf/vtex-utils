
import './utils/rivets-formatters.js';
import store from './utils/vendor.store.js';

import VtexHelpers from './class/VtexHelpers.js';
import GlobalHelpers from './class/GlobalHelpers.js';
import LocationHelpers from './class/LocationHelpers.js';

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
        this.version = '1.4.5';

        /**
         * Package name
         * @type {String}
         */
        this.name = '@VtexUtils';

        /**
         * Vtex Helpers instance
         * @type {VtexHelpers}
         */
        this.vtexHelpers = new VtexHelpers();

        /**
         * Global Helpers instance
         * @type {GlobalHelpers}
         */
        this.globalHelpers = new GlobalHelpers();

        /**
         * Location Helpers instance
         * @type {LocationHelpers}
         */
        this.locationHelpers = new LocationHelpers(store);

        /**
         * Local/Session Storage
         * @type {Object}
         */
        this.storage = store;
    }
}

export default VtexUtils;
