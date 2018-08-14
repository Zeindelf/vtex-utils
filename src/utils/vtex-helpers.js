
import {utilify} from './vendor.utilify.js';

const globalHelpers = utilify.globalHelpers;

export default {
    /**
     * Formats Vtex price
     *
     * @param {integer}             number              The number to format
     * @param {string}              [thousands = '.']   The thousands delimiter
     * @param {string}              [decimals = ',']    The decimal delimiter
     * @param {integer}             [length = 2]        The length of decimal
     * @param {string}              [currency = 'R$ ']  Set currency
     * @return {string} The formatted price
     */
    formatPrice(number, thousands, decimals, length, currency) {
        currency = globalHelpers.isString(currency) ? currency : 'R$ ';
        length = !globalHelpers.isNumber(length) ? 2 : length;

        const re = '\\d(?=(\\d{' + (3) + '})+' + (length > 0 ? '\\D' : '$') + ')';
        number = number / 100;
        number = (number * 1).toFixed(Math.max(0, ~~length));

        return currency + number.replace('.', (decimals || ',')).replace(new RegExp(re, 'g'), '$&' + (thousands || '.'));
    },

    /**
     * Unformat Vtex price
     *
     * @param {String|Array}    value                 Price formatted
     * @param {string}          [decimal=',']         The decimal delimiter
     * @param {integer}         [formatNumber=false]  Thousands separator (pt-BR default: '.')
     * @return {string|Array}   The unformatted price
     */
    unformatPrice(value, decimal, formatNumber = false) {
        // Recursively unformat arrays:
        if ( globalHelpers.isArray(value) ) {
            return value.map((val) => this.unformatPrice(val, decimal, formatNumber));
        }

        // Fails silently (need decent errors):
        value = value || 0;

        // Return the value as-is if it's already a number:
        if ( globalHelpers.isNumber(value) ) {
            return value;
        }

        decimal = decimal || ',';

         // Build regex to strip out everything except digits, decimal point and minus sign:
        const format = `[^0-9-${decimal}]`;
        const regex = new RegExp(format, ['g']);
        const unformatted = parseFloat(
                ('' + value)
                    .replace(/\((?=\d+)(.*)\)/, '-$1') // replace bracketed values with negatives
                    .replace(regex, '') // strip out any cruft
                    .replace(decimal, '.') // make sure decimal point is standard
            ).toFixed(2);

        const values = unformatted.toString().split('.');

        return {
            unformatted: globalHelpers.toNumber(values.join('')) * 1,
            real: ( formatNumber ) ? globalHelpers.formatNumber(values[0]) : values[0],
            cents: values[1] || '00',
        };
    },

    /**
     * Formats price from Vtex API `/api/catalog_system/pub/products/search/`
     * to a correct `formatPrice` method
     *
     * @param  {Number} val Value to convert
     * @return {Integer}
     */
    fixProductSearchPrice(val) {
        val = globalHelpers.toNumber(val);
        return val.toFixed(2).split('.').join('') * 1;
    },

    /**
     * Get first available SKU from Vtex API `/api/catalog_system/` end point
     *
     * @param  {Object}  product     Product full data
     * @return {Object|Boolean}      An available SKU data or false
     */
    getFirstAvailableSku(product) {
        // if ( !this._checkCamelize(product) ) {
        //     throw new Error(CONSTANTS.camelize);
        // }

        let newArr = {};

        if ( product.hasOwnProperty('items') ) {
            product.items.some((item, index, oldArr) => {
                if ( item.sellers[0].commertialOffer.availableQuantity > 0 ) {
                    newArr = oldArr[index];
                    return true;
                }

                return false;
            });
        }

        if ( product.hasOwnProperty('skus') ) {
            product.skus.some((item, index, oldArr) => {
                if ( item.available ) {
                    newArr = oldArr[index];
                    return true;
                }

                return false;
            });
        }

        if ( globalHelpers.length(newArr) > 0 ) {
            return newArr;
        }

        return false;
    },

    /**
     * Get the original VTEX image source from a thumb
     *
     * @param {string}      [src]   The source of the thumb
     * @return {string} The original image source
     * @example
     *     vtexHelpers.getOriginalImage('http://domain.vteximg.com.br/arquivos/ids/155242-292-292/image.png');
     *     // http://domain.vteximg.com.br/arquivos/ids/155242/image.png
     */
    getOriginalImage(src) {
        return globalHelpers.isString(src) ? src.replace(/(ids\/[0-9]+)-([0-9-]+)\//, '$1/') : src;
    },

    /**
     * Change the width & height from a given VTEX image source
     *
     * @param {string}      [src]       The source of the image
     * @param {int|string}  [width]     The new image with
     * @param {int|string}  [height]    The new image height
     * @return {string} The resized image source
     * @example
     *     vtexHelpers.getResizedImage('http://domain.vteximg.com.br/arquivos/ids/155242-292-292/image.png', 500, 600);
     *     // http://domain.vteximg.com.br/arquivos/ids/155242-500-600/image.png
     *
     *     vtexHelpers.getResizedImage('http://domain.vteximg.com.br/arquivos/ids/155242/image.png', 100, 100);
     *     // http://domain.vteximg.com.br/arquivos/ids/155242-100-100/image.png
     */
    getResizedImage(src, width, height) {
        if ( globalHelpers.isUndefined(width) || globalHelpers.isUndefined(height) || !globalHelpers.isString(src) ) {
            return src;
        }

        width = Math.round(width);
        height = Math.round(height);

        src = src.replace(/(?:ids\/[0-9]+)-([0-9]+)-([0-9]+)\//, (match, matchedWidth, matchedHeight) => {
            return match.replace('-' + matchedWidth + '-' + matchedHeight, '-' + width + '-' + height);
        });

        return src.replace(/(ids\/[0-9]+)\//, '$1-' + width + '-' + height + '/');
    },

    /**
     * Resize proportionally an VTEX image by aspect ratio
     *
     * @param {string}      [src]               The source of the image
     * @param {String}      [type]              Type to resize (width or height)
     * @param {Number}      [newSize]           New size to redimensioning
     * @param  {Number}     [aspectRatio]       Image aspect ratio (calculate by (width / height))
     * @return {string}                         The resized image source
     * @example
     *     var imgSrc = 'http://domain.vteximg.com.br/arquivos/ids/155242/image.png';
     *     vtexHelpers.getResizeImageProportionally(imgSrc, 'width', 150, (10/15));
     *     // http://domain.vteximg.com.br/arquivos/ids/155242-150-225/image.png
     *
     *     vtexHelpers.getResizeImageProportionally(imgSrc, 'height', 150, (10/15));
     *     // http://domain.vteximg.com.br/arquivos/ids/155242-99-150/image.png
     */
    getResizeImageByRatio(src, type, newSize, aspectRatio) {
        const newValue = globalHelpers.resizeImageByRatio(type, newSize, aspectRatio);

        return this.getResizedImage(src, newValue.width, newValue.height);
    },

    /**
     * Get the Vtex server time
     * @param {function} callback - The callback to call when the request finishes. The callback will a javascript Date object.
     * @return {promise} - jquery Ajax promise
     * @example
     *     vtexHelpers.getServerTime((date) => console.log(date.getFullYear()));
     */
    getServerTime(callback) {
        return $.ajax({
            url: '/no-cache/HoraAtualServidor.aspx',
            type: 'get',
        }).then((res) => {
            let monthBr = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

            let time = res.match(/([0-9]+):([0-5][0-9]):([0-5][0-9])/)[0];
            let day = parseInt(res.match(/[a-z]{3} ([0-9]{1,2})/)[1]);
            let month = monthBr.indexOf(res.match(/[a-z]{3}/)[0]) + 1;
            let year = parseInt(res.match(/[0-9]{4}/)[0]);

            if ( day < 10 ) {
                day = `0${day}`;
            }

            if ( month < 10 ) {
                month = `0${month}`;
            }

            if ( globalHelpers.isFunction(callback) ) {
                callback.call(null, new Date(`${year}/${month}/${day} ${time}`));
            }
        });
    },

    /**
     * Get category tree
     * @param [categoryId] - Return the specific Category
     * @param [depth=50] - The tree depth
     * @return {promise} Promise
     * @example
     *     vtexHelpers.getCategories().then((res) => console.log(res)) // Return all categories
     *     vtexHelpers.getCategories(1000001, 1).then((res) => console.log(res)) // Return 1 level from category id
     */
    getCategories(categoryId, depth) {
        /* eslint-disable */
        return $.Deferred((def) => {
            /* eslint-enable */
            return $.ajax({
                type: 'get',
                url: '/api/catalog_system/pub/category/tree/' + (depth || 50),
                dataType: 'json',
                headers: {
                    accept: 'application/json',
                    contentType: 'application/json; charset=utf-8',
                },
            })
            .done((res) => {
                if ( !globalHelpers.isUndefined(categoryId) ) {
                    def.resolve(globalHelpers.objectSearch(res, {
                        id: categoryId,
                    }));
                } else {
                    def.resolve(res);
                }
            })
            .fail((err) => def.reject(err));
        }).promise();
    },

    /**
     * Get product specification
     *
     * @param {Object}           [data]              Vtex API data from '/api/catalog_system/pub/products/search/' endpoint
     * @param {String}           [specName]          Specification name
     * @param {Boolean|String}   [defaultValue]      Value if spec doesn't exists
     * @returns spec value or false/defaultVal if spec doesn't exists
     */
    getProductSpec(data, specName, defaultVal = false) {
        if ( globalHelpers.isUndefined(data[specName]) ) {
            return defaultVal;
        }

        if ( globalHelpers.contains(specName, data.allSpecifications) ) {
            const specValue = data[specName] && data[specName][0];

            return ( !globalHelpers.isUndefined(specValue) ) ? specValue : defaultVal;
        }

        return defaultVal;
    },

    /**
     * Method to use with VtexCatalog
     *
     * Full methods:
     *     const sellerInfo = vtexHelpers.getProductSellerInfo(productData);
     *     const installments = vtexHelpers.getProductInstallments(sellerInfo) || vtexHelpers.getProductInstallments(productData);
     *     const bankInvoice = vtexHelpers.getProductBankInvoice(productData);
     *     const priceInfo = vtexHelpers.getProductPriceInfo(sellerInfo);
     *     const groupedInstallments = vtexHelpers.getGroupInstallments(productData);
     */
    getProductSellerInfo(product, sellerId = false) {
        const seller = ( sellerId ) ? sellerId : true;
        const sellerKey = ( sellerId ) ? 'sellerId' : 'sellerDefault';
        const availableProduct = this.getFirstAvailableSku(product);

        if ( availableProduct ) {
            return globalHelpers.objectSearch(availableProduct, {[sellerKey]: seller});
        }

        return false;
    },

    /**
     * Method to use with VtexCatalog
     */
    getProductInstallments(data, sellerId = false) {
        const commertialOffer = this._getCommertialInfo(data, sellerId);

        if ( globalHelpers.isUndefined(commertialOffer) ) {
            return false;
        }

        // Get by min price value
        return commertialOffer.installments.reduce((prev, current) => (prev.value < current.value) ? prev : current, {});
    },

    /**
     * Method to use with VtexCatalog
     */
    getProductBankInvoice(product, sellerId = false) {
        const sellerInfo = this.getProductSellerInfo(product, sellerId);

        if ( sellerInfo ) {
            return globalHelpers.objectSearch(sellerInfo.commertialOffer.installments, {paymentSystemName: 'Boleto Bancário'});
        }

        return false;
    },

    /**
     * Method to use with VtexCatalog
     */
    getProductPriceInfo(sellerInfo) {
        if ( !sellerInfo ) {
            return false;
        }

        const {commertialOffer: co} = sellerInfo;
        const installments = this.getProductInstallments(sellerInfo);
        const isInstallments = !globalHelpers.isObjectEmpty(installments);
        const qty = co.availableQuantity;
        const noListPrice = co.price === co.listPrice;
        const fix = this.fixProductSearchPrice;
        const format = this.formatPrice;

        return {
            available: (qty) ? true : false,
            availableQuantity: qty,

            sellerName: sellerInfo.sellerName,
            sellerId: sellerInfo.sellerId,

            bestPrice: (qty) ? fix(co.price) : 0,
            listPrice: (qty) ?
                ( (noListPrice) ? false : fix(co.listPrice) ) :
                0,

            installments: (qty && isInstallments) ? installments.numberOfInstallments : 0,
            installmentsInsterestRate: (qty && isInstallments) ? installments.interestRate : null,
            installmentsValue: (qty && isInstallments) ? fix(installments.value) : 0,

            bestPriceFormatted: (qty) ? format(fix(co.price)) : format(0),
            listPriceFormatted: (qty) ?
                ( (noListPrice) ? false : format(fix(co.listPrice)) ) :
                ( noListPrice) ? false : format(0),
            installmentsValueFormatted: (qty && isInstallments) ? format(fix(installments.value)) : format(0),
        };
    },

    /**
     * Method to use with VtexCatalog
     */
    getGroupInstallments(data, sellerId) {
        const commertialOffer = this._getCommertialInfo(data, sellerId);

        if ( globalHelpers.isUndefined(commertialOffer) ) {
            return false;
        }

        const groupedInstallments = commertialOffer.installments.reduce((r, a) => {
            r[a.paymentSystemName] = r[a.paymentSystemName] || [];
            r[a.paymentSystemName].push(a);
            return r;
        }, Object.create(null));

        return globalHelpers.camelize(groupedInstallments);
    },

    getShipping(postalCode, skuId, quantity) {
        if ( 'skuJson' in window ) {
            const firstSku = this.getFirstAvailableSku(skuJson);
            skuId = skuId || firstSku.sku;
        }

        /* eslint-disable */
        return $.Deferred((def) => {
            /* eslint-enable */
            return $.ajax({
                type: 'get',
                url: `/frete/calcula/${skuId}`,
                data: {
                    shippinCep: postalCode.replace(/[^A-Za-z0-9]/g, ''),
                    quantity: quantity || 1,
                },
            })
            .then((res) => {
                const $html = $($.parseHTML(res));
                const $tr = $html.find('tbody > tr');
                const $p = $html.find('.valor');

                const returnData = {
                    fullResponse: res,
                };

                const stripHtml = (str) => str.replace(/<\/?[^>]+(>|$)/g, '');

                if ( $p.length ) {
                    returnData.error = true;
                    returnData.formattedResponse = {
                        shippingText: globalHelpers.strCompact(stripHtml(res)),
                    };
                }

                if ( $tr.length ) {
                    returnData.error = false;
                    returnData.formattedResponse = $tr.map((index, item) => {
                        const $td = $(item).children('td');
                        const _shippingText = $td.eq(1).text().split(',');

                        const shippingValue = $td.eq(0).text();
                        const shippingType = _shippingText[0];
                        const shippingText = globalHelpers.ucfirst(globalHelpers.strCompact(_shippingText[1]));

                        return {shippingValue, shippingText, shippingType};
                    }).toArray();
                }

                return def.resolve(returnData);
            })
            .fail((err) => def.reject(err));
        }).promise();
    },

    /**
     * From '/api/catalog_system/pub/products/search/' endpoint
     *
     * @returns {Array}  A new instance of array with skus ordered
     */
    sortProductSearch(product, map, dimension, reverse = false) {
        if ( !globalHelpers.isString(dimension) ) {
            throw new TypeError(`'dimension' param must be a String value`);
        }

        if ( !product.hasOwnProperty('items') ) {
            throw new Error(`Product data must be an response from Vtex API '/api/catalog_system/pub/products/search/{productId}' endpoint`);
        }

        dimension = ( this._checkCamelize(product) ) ? globalHelpers.camelize(dimension) : dimension;
        return globalHelpers.objectArraySortByValue(product.items, map, dimension, reverse);
    },

    /**
     * From '/api/catalog_system/pub/products/variations/' endpoint (same as SkuJson)
     * If product data is camelized, set `map` manually or convert `dimensionsMap` prop to camelize too
     *
     * @returns {Array}  A new instance of array with skus ordered
     */
    sortProductVariations(product, map, dimension, reverse = false) {
        if ( !globalHelpers.isString(dimension) ) {
            throw new TypeError(`'dimension' param must be a String value`);
        }

        if ( !product.hasOwnProperty('skus') ) {
            throw new Error(`Product data must be an response from Vtex API '/api/catalog_system/pub/products/variations/{productId}' endpoint or global variable 'skuJson' on product page`);
        }

        map = (globalHelpers.isArray(map) && map.length) ? map : product.dimensionsMap[dimension];

        return globalHelpers.objectArraySortByValue(product.skus, map, `dimensions.${dimension}`, reverse);
    },

    /**
     * Replace break lines from product descriptions/more
     *
     * @param  {string}  str  String to replace
     * @return {string}       New string with <br /> break lines
     */
    replaceBreakLines(str) {
        str = ( str.replace ) ? str.replace(/(?:\r\n|\r|\n)/g, '<br />') : '';

        return str;
    },

    /**
     * Convert a string IDs given into an integer array values
     *
     * @param  {String} str              String with IDs
     * @param  {String} [separator=',']  Separator to split
     * @return {Array}
     * @example
     *     const str = '1, 2, 3, 4';
     *     stringIdsToArray(str); // [1, 2, 3, 4]
     *
     *     const str2 = '1 - 2 - 3 - 4';
     *     stringIdsToArray(str2); // [1, 2, 3, 4]
     */
    stringIdsToArray(str, separator = ',') {
        const splitStr = globalHelpers.explode(str, separator);
        const arr = splitStr.map((item) =>
            globalHelpers.toNumber(globalHelpers.strCompact(item)));

        return globalHelpers.arrayCompact(arr);
    },

    /**
     * Check if the user is logged into Vtex
     * @return {promise} jQuery Ajax Promise
     * @example
     *     vtexHelpers.checkLogin().then((res) => {
     *         // If user defined
     *         console.log(res);
     *     })
     *     .fail((err) => {
     *         // If user isn't defined
     *         console.log(err)
     *     });
     */
    checkLogin() {
        /* eslint-disable */
        return $.Deferred((def) => {
            /* eslint-enable */
            return $.ajax({
                type: 'get',
                url: '/no-cache/profileSystem/getProfile',
            })
            .done((res) => {
                if ( globalHelpers.isUndefined(res.IsUserDefined) || !res.IsUserDefined ) {
                    def.reject(res);
                } else {
                    def.resolve(res);
                }
            })
            .fail((err) => def.reject(err));
        }).promise();
    },

    /**
     * Open default Vtex popup login
     *
     * @param  {boolean}  [noReload = false]  Reload page after login
     * @return {void}
     */
    openPopupLogin(noReload, _url) {
        noReload = globalHelpers.isBoolean(noReload) ? noReload : false;
        _url = globalHelpers.isString(_url) ? _url : '/';
        _url = ( noReload ) ? window.location.href : _url;

        vtexid.start({
            returnUrl: _url,
        });
    },

    /**
     * Add items to cart
     *
     * @param  {Array}  items  Array of object with item(s)
     * @param  {Array}  [expectedOrderFormSections=null]  OrderForm fields to retrieve
     * @param  {Integer/String} [salesChannel=1]  Sales channel id
     * @return {promise}
     */
    addToCart(items, expectedOrderFormSections, salesChannel) {
        if ( !globalHelpers.isArray(items) ) {
            throw new TypeError(`Items must be an Array of Object(s) with item(s) to add, e.g. var items = [{id: 123, quantity: 1, seller: '1'}, {id: 321, quantity: 2, seller: '1'}]`);
        }

        if ( globalHelpers.length(items) < 1 ) {
            throw new Error(`Items can't be an empty Array.`);
        }

        expectedOrderFormSections = ( globalHelpers.isUndefined(expectedOrderFormSections) ) ? null : expectedOrderFormSections;
        salesChannel = ( globalHelpers.isUndefined ) ? 1 : salesChannel;

        /* eslint-disable */
        return $.Deferred((def) => {
            /* eslint-enable */
            return vtexjs.checkout.getOrderForm().done(() => {
                return vtexjs.checkout.addToCart(items, expectedOrderFormSections, salesChannel)
                    .done((orderForm) => def.resolve(orderForm))
                    .fail((err) => def.reject());
            }).fail((err) => def.reject(err));
        }).promise();
    },

    /**
     * Empty the cart
     *
     * @return {promise} Order Form
     */
    clearCart() {
        /* eslint-disable */
        return $.Deferred((def) => {
            /* eslint-enable */
            vtexjs.checkout.getOrderForm().done((orderForm) => {
                if ( orderForm.items.length ) {
                    return vtexjs.checkout.removeAllItems(orderForm.items)
                        .done((orderForm) => def.resolve(orderForm));
                }

                return def.resolve(orderForm);
            }).fail((err) => def.reject(err));
        }).promise();
    },

    /**
     * Send notify me data
     *
     * @param  {String} name  Customer name
     * @param  {String} email Customer e-mail
     * @param  {Integer} skuId Sku ID
     * @return {Promise}
     */
    notifyMe(name, email, skuId) {
        /* eslint-disable */
        return $.Deferred((def) => {
            /* eslint-enable */
            const successMessage = 'Cadastrado com sucesso. Assim que o produto for disponibilizado você receberá um email avisando.';
            const errorMessage = 'Não foi possível cadastrar. Tente mais tarde.';

            return $.ajax({
                url: '/no-cache/AviseMe.aspx',
                type: 'post',
                data: {
                    notifymeClientName: name,
                    notifymeClientEmail: email,
                    notifymeIdSku: skuId,
                },
            })
            .then((res) => def.resolve({successMessage}))
            .fail((err) => def.reject({errorMessage}));
        }).promise();
    },

    /**
     * PRIVATE
     */
    _checkCamelize(product) {
        if ( product.hasOwnProperty('isCamelized') && product.isCamelized ) {
            return true;
        }

        return false;
    },

    _getCommertialInfo(data, sellerId) {
        if ( !globalHelpers.isPlainObject(data) ) {
            throw new TypeError(`'data' must be an plain object`);
        }

        return ( data.hasOwnProperty('commertialOffer') ) ? data.commertialOffer : this.getProductSellerInfo(data, sellerId).commertialOffer;
    },
};
