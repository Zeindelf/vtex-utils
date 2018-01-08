
import VtexHelpers from './class/VtexHelpers.js';
import GlobalHelpers from './class/GlobalHelpers.js';
import './utils/rivets-formatters.js';

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
        this.version = '0.2.7';

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
    }
}

export default VtexUtils;
