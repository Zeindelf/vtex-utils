
import VtexHelpers from './class/VtexHelpers.js';
import GlobalHelpers from './class/GlobalHelpers.js';
import './utils/rivets-formatters.js';

/**
 * Create a VtexUtils class
 * Main class
 */
class VtexUtils {
    constructor() {
        this.version = '0.2.1';
        this.globalHelpers = new GlobalHelpers();
        this.vtexHelpers = new VtexHelpers();
    }
}

export default VtexUtils;
