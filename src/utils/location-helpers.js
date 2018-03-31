
import globalHelpers from './global-helpers.js';
import validateHelpers from './validate-helpers.js';

const CONSTANTS = {
    STORAGE_NAME: '__location',
    EXPIRE_TIME: 60 * 60 * 4, // Seconds * Minutes * Hours (default: 4h)
};

export default {
    /**
     * Get user location by HTML5 Geolocate API and translate coordinates to
     * Brazilian State, City and Region
     *
     * @return {Promise}  When success, response are an object with State, City, Region and user Coordinates
     * @example
     *     locationHelpers.getCityState()
     *         .then(function(res) {
     *             window.console.log(res);
     *         })
     *         .fail(function(err) {
     *             window.console.log(err);
     *         });
     */
    getUserLocation(cache, storage) {
        if ( cache ) {
            this._initLocationStorage(storage);
        }

        const store = storage.session.get(CONSTANTS.STORAGE_NAME);

        /* eslint-disable */
        return $.Deferred((def) => {
            /* eslint-enable */
            if ( ! validateHelpers.isObjectEmpty(store) ) {
                def.resolve(store);
            } else {
                if ( window.navigator.geolocation ) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;

                        if ( ! window.google ) {
                            return def.reject('Google Maps Javascript API not found. Follow tutorial: https://developers.google.com/maps/documentation/javascript');
                        }

                        const latlng = new google.maps.LatLng(lat, lng);
                        const geocoder = new google.maps.Geocoder();

                        geocoder.geocode({'latLng': latlng}, (results, status) => {
                            if ( status === google.maps.GeocoderStatus.OK ) {
                                if ( results[1] ) {
                                    for ( let i = 0, len = results.length; i < len; i += 1 ) {
                                        if ( results[i].types[0] === 'locality' ) {
                                            const city = results[i].address_components[0].short_name;
                                            const state = results[i].address_components[2].short_name;
                                            const storeLocation = {
                                                coords: {lat: lat, lng: lng},
                                                city: city,
                                                state: state,
                                                region: this.filteredRegion(state),
                                            };

                                            if ( cache ) {
                                                storage.session.set(CONSTANTS.STORAGE_NAME, storeLocation, CONSTANTS.EXPIRE_TIME);
                                            }

                                            def.resolve(storeLocation);
                                        }
                                    }
                                } else {
                                    def.reject('No reverse geocode results.');
                                }
                            } else {
                                def.reject(`Geocoder failed: ${status}`);
                            }
                        });
                    }, (err) => {
                        def.reject('Geolocation not available.');
                    });
                } else {
                    def.reject(`Geolocation isn't available`);
                }
            }
        }).promise();
    },

    /**
     * Get Brazilian region for an state initials given
     *
     * @param  {String}  state  Initials state (e.g. 'SP')
     * @return {String}         Region (Norte, Sul, etc.)
     * @example
     *     locationHelpers.filteredRegion('SP'); // Sudeste
     */
    filteredRegion(state) {
        this._validateStateInitials(state);

        let filteredRegion = '';

        for ( let region in this._regionMap ) {
            if ( {}.hasOwnProperty.call(this._regionMap, region) ) {
                this._regionMap[region].some((el, i, arr) => {
                    if ( globalHelpers.removeAccent(el.toLowerCase()) === globalHelpers.removeAccent(state.toLowerCase()) ) {
                        filteredRegion = region;
                    }
                });
            }
        }

        return filteredRegion;
    },

    /**
     * Get Brazilian name state and region for an state initials given
     *
     * @param  {String}  state  Initials state (e.g. 'SP')
     * @return {Object}         Object with state name, state initials and state region
     * @example
     *     locationHelpers.filteredState('SP') // {initials: 'SP', name: 'São Paulo', region: 'Sudeste'}
     */
    filteredState(state) {
        this._validateStateInitials(state);

        return globalHelpers.objectSearch(this._stateMap, {initials: state.toUpperCase()});
    },

    getStates() {
        return this._stateMap;
    },

    getRegions() {
        return this._regionMap;
    },

    /**
     * Validate if state is an initials
     *
     * @param  {String} state State to validate
     * @return {Error}        Return an error if state not an initials
     */
    _validateStateInitials(state) {
        if ( state.length !== 2 ) {
            throw new Error(`'state' must be two letters. e.g. 'SP'`);
        }
    },

    _stateMap: [
        {name: 'Acre', initials: 'AC', region: 'Norte'},
        {name: 'Alagoas', initials: 'AL', region: 'Nordeste'},
        {name: 'Amapá', initials: 'AP', region: 'Norte'},
        {name: 'Amazonas', initials: 'AM', region: 'Norte'},
        {name: 'Bahia', initials: 'BA', region: 'Nordeste'},
        {name: 'Ceará', initials: 'CE', region: 'Nordeste'},
        {name: 'Distrito Federal', initials: 'DF', region: 'Centro Oeste'},
        {name: 'Espírito Santo', initials: 'ES', region: 'Sudeste'},
        {name: 'Goiás', initials: 'GO', region: 'Centro Oeste'},
        {name: 'Maranhão', initials: 'MA', region: 'Nordeste'},
        {name: 'Mato Grosso', initials: 'MT', region: 'Centro Oeste'},
        {name: 'Mato Grosso do Sul', initials: 'MS', region: 'Centro Oeste'},
        {name: 'Minas Gerais', initials: 'MG', region: 'Sudeste'},
        {name: 'Pará', initials: 'PA', region: 'Norte'},
        {name: 'Paraíba', initials: 'PB', region: 'Nordeste'},
        {name: 'Paraná', initials: 'PR', region: 'Sul'},
        {name: 'Pernambuco', initials: 'PE', region: 'Nordeste'},
        {name: 'Piauí', initials: 'PI', region: 'Nordeste'},
        {name: 'Rio de Janeiro', initials: 'RJ', region: 'Sudeste'},
        {name: 'Rio Grande do Norte', initials: 'RN', region: 'Nordeste'},
        {name: 'Rio Grande do Sul', initials: 'RS', region: 'Sul'},
        {name: 'Rondônia', initials: 'RO', region: 'Norte'},
        {name: 'Roraima', initials: 'RR', region: 'Norte'},
        {name: 'Santa Catarina', initials: 'SC', region: 'Sul'},
        {name: 'São Paulo', initials: 'SP', region: 'Sudeste'},
        {name: 'Sergipe', initials: 'SE', region: 'Nordeste'},
        {name: 'Tocantins', initials: 'TO', region: 'Norte'},
    ],

    _regionMap: {
        ['Norte']: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
        ['Nordeste']: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
        ['Centro Oeste']: ['DF', 'GO', 'MT', 'MS'],
        ['Sudeste']: ['ES', 'MG', 'RJ', 'SP'],
        ['Sul']: ['PR', 'RS', 'SC'],
    },

    _initLocationStorage(storage) {
        if ( validateHelpers.isNull(storage.session.get(CONSTANTS.STORAGE_NAME)) ) {
            storage.session.set(CONSTANTS.STORAGE_NAME, {});
        }
    },
};
