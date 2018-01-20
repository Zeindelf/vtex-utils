
import globalHelpers from './global-helpers.js';

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
        currency = typeof currency === 'string' ? currency : 'R$ ';
        length = typeof length !== 'number' ? 2 : length;

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
        return typeof src === 'string' ? src.replace(/(ids\/[0-9]+)-([0-9-]+)\//, '$1/') : src;
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
        if ( width === undefined || height === undefined || typeof src != 'string' ) {
            return src;
        }

        src = src.replace(/(?:ids\/[0-9]+)-([0-9]+)-([0-9]+)\//, function(match, matchedWidth, matchedHeight) {
            return match.replace('-' + matchedWidth + '-' + matchedHeight, '-' + width + '-' + height);
        });

        return src.replace(/(ids\/[0-9]+)\//, '$1-' + width + '-' + height + '/');
    },

    /**
     * Get the VTEX server time
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

            if ( typeof callback === 'function' ) {
                callback.call(null, new Date(`${year}/${month}/${day} ${time}`));
            }
        });
    },

    /**
     * Get category tree
     * @param [depth=50] - The tree depth
     * @param [categoryId] - Return the specific Category
     * @return {promise} Promise
     * @example
     *     vtexHelpers.getCategories().then((res) => console.log(res)) // Return all categories
     *     vtexHelpers.getCategories(1, 1000001).then((res) => console.log(res)) // Return 1 level from category id
     */
    getCategories(depth, categoryId) {
        /* eslint-disable */
        return $.Deferred((def) => {
            /* eslint-enable */
            return $.ajax({
                type: 'GET',
                url: '/api/catalog_system/pub/category/tree/' + (depth || 50),
                dataType: 'json',
                headers: {
                    accept: 'application/json',
                    contentType: 'application/json; charset=utf-8',
                },
            }).done((res) => {
                if ( typeof categoryId !== 'undefined' ) {
                    def.resolve(globalHelpers.objectSearch(res, {
                        id: categoryId,
                    }));
                } else {
                    def.resolve(res);
                }
            }).fail((err) => {
                def.reject();
            });
        }).promise();
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
     * Check if the user is logged into VTEX
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
            }).done((res) => {
                if ( typeof res.IsUserDefined === 'undefined' || ! res.IsUserDefined ) {
                    def.reject(res);
                } else {
                    def.resolve(res);
                }
            }).fail((err) => {
                def.reject();
            });
        }).promise();
    },

    /**
     * Open default Vtex popup login
     * @return {void}
     */
    openPopupLogin() {
        vtexid.start({
            returnUrl: '/',
            userEmail: '',
            locale: 'pt-BR',
            forceReload: false,
        });
    },
};
