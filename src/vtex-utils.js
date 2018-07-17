
import './rivets/init.formatters.js';

import VtexHelpers from './class/VtexHelpers.js';
import {utilify} from './utils/vendor.utilify.js';

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
        this.version = '1.13.0';

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
        this.globalHelpers = utilify.globalHelpers;

        /**
         * Location Helpers instance
         * @type {LocationHelpers}
         */
        this.locationHelpers = utilify.locationHelpers;

        /**
         * Local/Session Storage
         * @type {Object}
         */
        this.storage = utilify.storage;
    }

    setRivetsUtilify(RivetsUtilify) {
        this.rivetsUtilify = new RivetsUtilify(utilify);
    }
}

export default VtexUtils;
