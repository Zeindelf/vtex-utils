
import utilify from './vendor.utilify.js';

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

        src = src.replace(/(?:ids\/[0-9]+)-([0-9]+)-([0-9]+)\//, function(match, matchedWidth, matchedHeight) {
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
    getProductSpec(data, specName, defaultVal) {
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
};
