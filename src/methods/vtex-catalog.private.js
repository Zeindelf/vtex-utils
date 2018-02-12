
class Private {
    constructor() {
        /**
         * API limits request
         * @type {Number}
         */
        this._maxParamsPerRequest = 50;

        /**
         * Array to store the empty params
         * @type {Array}
         */
        this._emptyFetchedParams = [];

        /**
         * Array to store the pending params to fetch
         * @type {Array}
         */
        this._pendingParamsToFetch = [];

        /**
         * Array to store the fetched params
         * @type {Array}
         */
        this._fetchedParams = [];

        /**
         * Array to store the XHR requests
         * @type {Array}
         */
        this._pendingFetchArray = [];

        this._errors = {
            searchParamsNotDefined: `Search parameters is not defined`,
            paramsNotAnObject: `Param is not a valid Object`,
            productIdNotDefined: `Product ID is not defined`,
            skuIdNotDefined: `Sku ID is not defined`,
            productIdArrayNotAnArray: `'productIdArray' is not an array`,
            skuIdArrayNotAnArray: `'skuIdArray' is not an array`,
            productIdArrayNotDefined: `'productIdArray' is not an defined`,
            skuIdArrayNotDefined: `'skuIdArray' is not an defined`,
            fqPropertyNotFound: `The property 'fq' was not found`,
        };
    }

    _getInstance(catalog) {
        this._catalog = catalog;
    }

    _error(type) {
        throw new Error(this._errors[type]);
    }

    /**
     * Store products into Session Storage
     */
    _setProductCache(products) {
        let productCache = this._catalog.session.get(this._catalog.productCacheName);

        for ( let id in products ) {
            if ( ! productCache.hasOwnProperty(id) ) {
                productCache[id] = products[id];
            }
        }

        this._catalog.session.set(this._catalog.productCacheName, productCache);
    }

    /**
     * Store SKUs ID into Session Storage
     */
    _setSkuCache(productsId) {
        if ( this._catalog.sessionCache ) {
            let productIdCache = this._catalog.session.get(this._catalog.skuCacheName);

            for ( let id in productsId ) {
                if ( ! productIdCache.hasOwnProperty(id) ) {
                    productIdCache[id] = productsId[id];
                }
            }

            this._catalog.session.set(this._catalog.skuCacheName, productIdCache);
        }
    }

    /**
     * Search products in Catalog
     * @param  {Object} params       Object with search parameters. Valid params: C:/{a}/{b} (Category), fq=specificationFilter_{a}:{b} (Filter), fq=P:[{a} TO {b}] (Price)
     * @param  {Object} [headers={}] Request headers
     * @return {Promise}             Promise with search results
     */
    _search(params, headers = {}) {
        // HELPER FUNCTIONS
        const storeInCache = (product) => {
            const { productId, items } = product;

            // Store in cache
            this._catalog.productCache[productId] = product;

            if ( this._catalog.sessionCache ) {
                this._setProductCache(this._catalog.productCache);
            }

            // Add skus product IDs map for each item
            items.forEach((item) => {
                const { itemId } = item;

                this._catalog.skusProductIds[itemId] = productId;
            });
        };

        // START HERE
        if ( ! params ) {
            return this._error('searchParamsNotDefined');
        }

        if ( typeof params !== 'object' ) {
            return this._error('paramsNotAnObject');
        }

        if ( ! params.fq ) {
            return this._error('fqPropertyNotFound');
        }

        let paramsFormatted = $.extend({}, params);

        // Request array
        let xhrArray = this._pendingFetchArray;

        // Product data object to resolve
        let productData = [];

        // Loop each query type in params
        for ( let queryType in params ) {
            if ( queryType === 'map' ) {
                continue;
            }

            // Loop each query and filter the ones that are already fetched
            // or are pending
            paramsFormatted[queryType] = params[queryType].filter((query) => {
                // Check if query was already fetched and the response was empty
                if ( ~this._emptyFetchedParams.indexOf(query) ) {
                    return false;
                }

                // NOTE: Two step validation, the first IF statement checks if the query
                // was already gotten and if the query is still pending
                if ( ~this._fetchedParams.indexOf(query) ) {
                    return false;
                } else {
                    if ( !~this._pendingParamsToFetch.indexOf(query) ) {
                        this._pendingParamsToFetch.push(query);
                        return true;
                    } else {
                        return false;
                    }
                }
            });
        }

        let paramsLength = 1;

        // If params fq is an array get the length
        if ( Array.isArray(params.fq) ) {
            paramsLength = paramsFormatted.fq.length;
        }

        let requestAmount = Math.ceil(paramsLength / this._maxParamsPerRequest);

        // Loop for each requestAmount
        for ( let i = 0; i < requestAmount; i++ ) {
            let resources = `${i * this._maxParamsPerRequest}-${((i + 1) * this._maxParamsPerRequest) - 1}`;

            /* eslint-disable */
            const searchRequest = $.Deferred();
            /* eslint-enable */

            $.ajax({
                url: '/api/catalog_system/pub/products/search/',
                data: $.param(paramsFormatted, true),
                beforeSend(xhr) {
                    for ( let header in headers ) {
                        if ( {}.hasOwnProperty.call(headers, header) ) {
                            xhr.setRequestHeader(header, headers[header]);
                        }
                    }

                    // Set resources header
                    xhr.setRequestHeader('resources', resources);
                },
                success(products) {
                    searchRequest.resolve(products);
                },
            });

            // Push request to request array
            xhrArray.push(searchRequest.promise());
        }

        /* eslint-disable */
        const def = $.Deferred();
        /* eslint-enable */

        $.when(...xhrArray)
            .done((...requests) => {
                requests.forEach((request, index) => {
                    const products = request;

                    // Loop each product and store in cache
                    products.forEach(storeInCache);

                    // Remove resolved fetch from array
                    xhrArray.splice(index, 1);
                });

                for ( let queryType in params ) {
                    if ( {}.hasOwnProperty.call(params, queryType) ) {
                        params[queryType].forEach((query) => {
                            const [queryField, queryValue] = query.split(':');
                            let product;

                            // Add fetched params
                            this._fetchedParams.push(query);

                            switch (queryField) {
                                case 'skuId': {
                                    const productId = this._catalog.skusProductIds[queryValue];
                                    product = this._catalog.productCache[productId];
                                    break;
                                }
                                case 'productId': {
                                    product = this._catalog.productCache[queryValue];
                                    break;
                                }
                            }

                            // Send products to resolve
                            if ( ! product ) {
                                this._emptyFetchedParams.push(query);
                            } else {
                                productData.push(product);
                            }
                        });
                    }
                }

                if ( productData.length ) {
                    this._setSkuCache(this._catalog.skusProductIds);

                    def.resolve(productData);
                } else {
                    def.reject();
                }
            });

        def.always(() => this._requestSearchEndEvent());

        return def.promise();
    }

    /**
     * Events
     */
    _requestSearchEndEvent() {
        /* eslint-disable */
        const ev = $.Event('vtexCatalog.requestSearchEnd');
        /* eslint-enable */

        $(document).trigger(ev);
    }

    _requestProductEndEvent() {
        /* eslint-disable */
        const ev = $.Event('vtexCatalog.requestProductEnd');
        /* eslint-enable */

        $(document).trigger(ev);
    }

    _requestSkuEndEvent() {
        /* eslint-disable */
        const ev = $.Event('vtexCatalog.requestSkuEnd');
        /* eslint-enable */

        $(document).trigger(ev);
    }
}

export default Private;
