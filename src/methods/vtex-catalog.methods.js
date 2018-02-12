
import validateHelpers from './../utils/validate-helpers.js';
import Private from './vtex-catalog.private.js';

const _private = new Private();

export default {
    /**
     * Sets Catalog instance
     * @return {Void}
     */
    _setInstance(catalogCache) {
        catalogCache = validateHelpers.isUndefined(catalogCache) ? false : catalogCache;

        _private._getInstance(this);
        _private._setSessionCache(catalogCache);
    },

    getProductCache() {
        return _private._getProductCache();
    },

    getSkusProductId() {
        return _private._getSkuCache();
    },

    /**
     * Search by product ID
     * @param  {Number} productId ID of the product to search
     * @return {Promise}                    Promise with search results
     */
    searchProduct(productId) {
        if ( validateHelpers.isUndefined(productId) ) {
            return _private._error('productIdNotDefined');
        }

        /* eslint-disable */
        const def = $.Deferred();
        /* eslint-enable */

        def.then(() => _private._requestProductStartEvent());

        const _productCache = _private._getProductCache();

        if ( _productCache[productId] ) {
            def.resolve(_productCache[productId]);
        } else {
            let params = {
                fq: [`productId:${productId}`],
            };

            const search = _private._search(params);

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
        if ( validateHelpers.isUndefined(skuId) ) {
            return _private._error('skuIdNotDefined');
        }

        /* eslint-disable */
        const def = $.Deferred();
        /* eslint-enable */

        def.then(() => _private._requestSkuStartEvent());

        const _productCache = _private._getProductCache();
        const _skuCache = _private._getSkuCache();

        if ( _skuCache[skuId] ) {
            def.resolve(_productCache[_skuCache[skuId]]);
        } else {
            let params = {
                fq: [`skuId:${skuId}`],
            };

            const search = _private._search(params);

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
        if ( validateHelpers.isUndefined(productIdArray) ) {
            return _private._error('productIdArrayNotDefined');
        }

        if ( ! validateHelpers.isArray(productIdArray) ) {
            return _private._error('productIdArrayNotAnArray');
        }

        /* eslint-disable */
        const def = $.Deferred();
        /* eslint-enable */

        def.then(() => _private._requestProductArrayStartEvent());

        let productData = {};
        let params = {fq: []};
        const _productCache = _private._getProductCache();

        for ( let i = 0, len = productIdArray.length; i < len; i += 1 ) {
            if ( validateHelpers.isUndefined(_productCache[productIdArray[i]]) ) {
                params.fq.push(`productId:${productIdArray[i]}`);
            } else {
                productData[productIdArray[i]] = _productCache[productIdArray[i]];
            }
        }

        if ( params.fq.length ) {
            const search = _private._search(params);

            search.done((products) => {
                for ( let i = 0, len = products.length; i < len; i += 1 ) {
                    productData[products[i].productId] = products[i];
                }

                def.resolve(productData);
            });
        } else {
            def.resolve(productData);
        }

        def.always(() => _private._requestProductArrayEndEvent());

        return def.promise();
    },

    /**
     * Search by sku ID array
     * @param  {Array} skuIdArray Array IDs of the skus to search
     * @return {Promise}                    Promise with search results
     */
    searchSkuArray(skuIdArray) {
        if ( validateHelpers.isUndefined(skuIdArray) ) {
            return _private._error('skuIdArrayNotDefined');
        }

        if ( ! validateHelpers.isArray(skuIdArray) ) {
            return _private._error('skuIdArrayNotAnArray');
        }

        /* eslint-disable */
        const def = $.Deferred();
        /* eslint-enable */

        def.then(() => _private._requestSkuArrayStartEvent());

        let productData = {};
        let params = {fq: []};
        const _productCache = _private._getProductCache();
        const _skuCache = _private._getSkuCache();

        for ( let i = 0, len = skuIdArray.length; i < len; i += 1 ) {
            if ( ! _skuCache[skuIdArray[i]] ) {
                params.fq.push(`skuId:${skuIdArray[i]}`);
            } else {
                const productId = _skuCache[skuIdArray[i]];
                productData[productId] = _productCache[productId];
            }
        }

        if ( params.fq.length ) {
            const search = _private._search(params);

            search.done((products) => {
                for ( let i = 0, len = products.length; i < len; i += 1 ) {
                    productData[products[i].productId] = products[i];
                }

                def.resolve(productData);
            });
        } else {
            def.resolve(productData);
        }

        def.always(() => _private._requestSkuArrayEndEvent());

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
        if ( validateHelpers.isUndefined(params) ) {
            return _private._error('searchParamsNotDefined');
        }

        if ( ! validateHelpers.isObject(params) ) {
            return _private._error('paramsNotAnObject');
        }

        if ( validateHelpers.isUndefined(params.fq) ) {
            return _private._error('fqPropertyNotFound');
        }

        let mapParam = {map: []};

        // Loop each parameter
        for ( let i = 0, len = params.fq.length; i < len; i += 1 ) {
            let param = params.fq[i];

            // If param is the category one
            if ( param.match('C:')) {
                // Generate a 'c' param in the 'mapParam' for each category
                let categoryIds = param.split('/');

                for ( let z = 0, len = categoryIds.length; z < len; z += 1 ) {
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
                xhr.setRequestHeader('resources', '0-49');
            },
        });

        return search;
    },
};
