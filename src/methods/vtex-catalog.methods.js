
import Private from './vtex-catalog.private.js';

const _private = new Private();

export default {
    /**
     * Sets Catalog instance
     * @return {Void}
     */
    setInstance() {
        _private._getInstance(this);
    },

    /**
     * Init and validate Session Store Cache
     * @return {Void}
     */
    initStorage() {
        if ( this.sessionCache ) {
            this.productCacheName = 'PRODUCT_CACHE';
            this.skuCacheName = 'SKU_CACHE';

            if ( this.globalHelpers.isNull(this.session.get(this.productCacheName)) ) {
                this.session.set(this.productCacheName, {});
            }

            if ( this.globalHelpers.isNull(this.session.get(this.skuCacheName)) ) {
                this.session.set(this.skuCacheName, {});
            }
        }
    },

    /**
     * Search by product ID
     * @param  {Number} productId ID of the product to search
     * @return {Promise}                    Promise with search results
     */
    searchProduct(productId) {
        if ( ! productId ) {
            return _private._error('productIdNotDefined');
        }

        /* eslint-disable */
        let def = $.Deferred();
        /* eslint-enable */

        // Check if productId is in cache
        const _productCache = ( this.sessionCache ) ? this.session.get(this.productCacheName) : this.productCache;
        if ( _productCache[productId] ) {
            def.resolve(_productCache[productId]);
        } else {
            // Search product
            let params = {
                fq: [`productId:${productId}`],
            };

            let search = _private._search(params);

            // Since it should be only 1 item set index is 0
            search.done((products) => def.resolve(products[0]));
        }

        def.always(() => _private._requestProductEndEvent());

        return def.promise();
    },

    /**
     * Search by sku ID
     * Sku methods stores in
     * @param  {Number} skuId ID of the sku to search
     * @return {Promise}            Promise with search results
     */
    searchSku(skuId) {
        if ( ! skuId ) {
            return _private._error('skuIdNotDefined');
        }

        /* eslint-disable */
        let def = $.Deferred();
        /* eslint-enable */

        // Check if skuId is in skusProductIds map
        const _productCache = ( this.sessionCache ) ? this.session.get(this.productCacheName) : this.productCache;
        if ( this.skusProductIds[skuId] ) {
            def.resolve(_productCache[this.skusProductIds[skuId]]);
        } else {
            // Search product
            let params = {
                fq: [`skuId:${skuId}`],
            };

            let search = _private._search(params);

            // Since it should be only 1 item set index is 0
            search.done((products) => def.resolve(products[0]));
        }

        def.always(() => _private._requestSkuEndEvent());

        return def.promise();
    },

    /**
     * Search by product ID array
     * @param  {Array} productIdArray Array IDs of the prodcuts to search
     * @return {Promise}                            Promise with search results
     */
    searchProductArray(productIdArray) {
        if ( ! productIdArray ) {
            return _private._error('productIdArrayNotDefined');
        }

        if ( ! Array.isArray(productIdArray) ) {
            return _private._error('productIdArrayNotAnArray');
        }

        /* eslint-disable */
        let def = $.Deferred();
        /* eslint-enable */

        // Product data object to resolve
        let productData = {};

        // Request product params
        let params = {
            fq: [],
        };

        const _productCache = this.session.get(this.productCacheName);

        for ( let i = 0; i < productIdArray.length; i++ ) {
            // Check if product was already gotten
            // If not, add productId into the params object
            // if ( this.productCache[productIdArray[i]] === undefined ) {
            if ( _productCache[productIdArray[i]] === undefined ) {
                params.fq.push(`productId:${productIdArray[i]}`);
            } else {
                // If gotten add it into the productData
                // productData[productIdArray[i]] = this.productCache[productIdArray[i]];
                productData[productIdArray[i]] = _productCache[productIdArray[i]];
            }
        }

        if ( params.fq.length ) {
            let search = _private._search(params);

            search.done((products) => {
                // Loop product data
                for ( let i = 0; i < products.length; i++ ) {
                    productData[products[i].productId] = products[i];
                }

                def.resolve(productData);
            });
        } else {
            def.resolve(productData);
        }

        return def.promise();
    },

    /**
     * Search by sku ID array
     * @param  {Array} skuIdArray Array IDs of the skus to search
     * @return {Promise}                    Promise with search results
     */
    searchSkuArray(skuIdArray) {
        if ( ! skuIdArray ) {
            return _private._error('skuIdArrayNotDefined');
        }

        if ( ! Array.isArray(skuIdArray) ) {
            return _private._error('skuIdArrayNotAnArray');
        }

        /* eslint-disable */
        let def = $.Deferred();
        /* eslint-enable */

        // Product data object to resolve
        let productData = {};

        // Request product params
        let params = {
            fq: [],
        };

        for ( let i = 0; i < skuIdArray.length; i++ ) {
            // Check if sku was already gotten
            // If not add skuId into the params object
            if ( ! this.skusProductIds[skuIdArray[i]] ) {
                params.fq.push(`skuId:${skuIdArray[i]}`);
            } else {
                let productId = this.skusProductIds[skuIdArray[i]];

                productData[productId] = this.productCache[productId];
            }
        }

        if ( params.fq.length ) {
            let search = _private._search(params);

            search.done((products) => {
                // Loop product data
                for ( let i = 0; i < products.length; i++ ) {
                    productData[products[i].productId] = products[i];
                }

                def.resolve(productData);
            });
        } else {
            def.resolve(productData);
        }

        return def.promise();
    },

    /**
     * Perform a full search
     * @param  {Object} params   An Object with the category search param and pricerRange if necessary
     * @return {Promise}         Promise with search results
     * @example
     *     vtexCatalog.fullSearch({fq: ['H:143', 'C:8/81/84', 'P:[0 TO 500]']})
     *         .then((res) => window.console.log(res))
     *         .fail((err) => window.console.log(err));
     */
    fullSearch(params) {
        if ( ! params ) {
            return _private._error('searchParamsNotDefined');
        }

        if ( typeof params !== 'object' ) {
            return _private._error('paramsNotAnObject');
        }

        if ( ! params.fq ) {
            return _private._error('fqPropertyNotFound');
        }

        // Generate map parameter
        let mapParam = {
            map: [],
        };

        // Loop each parameter
        for ( let i = 0; i < params.fq.length; i++ ) {
            let param = params.fq[i];

            // If param is the category one
            if ( param.match('C:')) {
                // Generate a 'c' param in the 'mapParam' for each category
                let categoryIds = param.split('/');

                for ( let z = 0; z < categoryIds.length; z++ ) {
                    // If the 'categoryId' is a number
                    if ( categoryIds[z].match(/\d.+/gi) ) {
                        mapParam.map.push('c');
                    }
                }
            }

            // If param is priceFrom
            if ( param.match(/P\[.+[\d\w\s]?\]/g) ) {
                mapParam.map.push('priceFrom');
            }
        }

        // Join mapParam map to generate a string and push it into the params object
        mapParam.map = mapParam.map.join(',');

        // Join params and mapParam
        $.extend(params, mapParam);

        // Search
        let search = $.ajax({
            url: '/api/catalog_system/pub/products/search/',
            data: $.param(params, true),
            beforeSend(xhr) {
                // Set resources header
                xhr.setRequestHeader('resources', '0-49');
            },
        });

        return search;
    },
};
