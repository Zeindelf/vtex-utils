
import './utils/vendor.jquery-utils';
import './rivets/init.formatters';

import VtexHelpers from './class/VtexHelpers';
import {utilify} from './utils/vendor.utilify';

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
    this.version = '1.18.1';

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

    /**
         * Javascript Cookies
         * @type {Object}
         */
    this.cookies = utilify.cookies;
  }

  setRivetsUtilify(RivetsUtilify) {
    this.rivetsUtilify = new RivetsUtilify(utilify);
  }
}

export default VtexUtils;
