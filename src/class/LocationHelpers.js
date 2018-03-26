
import locationHelpers from './../utils/location-helpers.js';

/**
 * Create a LocationHelpers class
 */
class LocationHelpers {
    constructor(store) {
        this._storage = store;
    }

    getUserLocation(cache) {
        return locationHelpers.getUserLocation(cache, this._storage);
    }

    getStates() {
        return locationHelpers.getStates();
    }

    getRegions() {
        return locationHelpers.getRegions();
    }

    filteredState(state) {
        return locationHelpers.filteredState(state);
    }

    filteredRegion(state) {
        return locationHelpers.filteredRegion(state);
    }
}

export default LocationHelpers;
