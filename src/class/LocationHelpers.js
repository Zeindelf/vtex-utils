
import locationHelpers from './../utils/location-helpers.js';

/**
 * Create a LocationHelpers class
 */
class LocationHelpers {
    getUserLocation() {
        return locationHelpers.getUserLocation();
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
