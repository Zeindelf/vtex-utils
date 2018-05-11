
import vtexHelpers from './vtex-helpers.js';
import utilify from './vendor.utilify.js';

if ( typeof window !== 'object' ) {
    global.window = global;
    global.window.navigator = {};
}

if ( 'rivets' in window ) {
    rivets.formatters['!'] = (value) => {
        return !value;
    };

    rivets.formatters.eq = (value, args) => {
        return value === args;
    };

    rivets.formatters.neq = (value, args) => {
        return value !== args;
    };

    rivets.formatters.gt = (value, args) => {
        return value > args;
    };

    rivets.formatters.gte = (value, args) => {
        return value >= args;
    };

    rivets.formatters.lt = (value, args) => {
        return value < args;
    };

    rivets.formatters.lte = (value, args) => {
        return value <= args;
    };

    rivets.formatters.or = (value, args) => {
        return value || args;
    };

    rivets.formatters.isEmpty = (value) => {
        return ( typeof value === 'undefined' || value === null || ( typeof value === 'string' && value.length === 0 ) );
    };

    rivets.formatters.isNotEmpty = (value) => {
        return !rivets.formatters.isEmpty(value);
    };

    rivets.formatters.pass = (value, args) => {
        return args;
    };

    rivets.formatters.json = (value, intendation) => {
        return JSON.stringify(value, null, intendation || 0);
    };

    rivets.formatters.prefix = (value, prefix) => {
        return '' + prefix + value;
    };

    rivets.formatters.suffix = (value, suffix) => {
        return '' + value + suffix;
    };

    rivets.formatters.ucFirst = (value) => {
        return value.substr(0, 1).toUpperCase() + value.substr(1);
    };

    rivets.formatters['+'] = (value, args) => {
        return value + args;
    };

    rivets.formatters['-'] = (value, args) => {
        return value - args;
    };

    rivets.formatters['*'] = (value, args) => {
        return value * args;
    };

    rivets.formatters['/'] = (value, args) => {
        return value / args;
    };

    rivets.formatters.round = (value, decimals) => {
        if ( decimals ) {
            const exp = Math.pow(10, decimals);
            value = Math.round(value * exp) / exp;
        } else {
            value = Math.round(value);
        }

        return value;
    };

    rivets.formatters.get = (obj, key) => {
        if ( obj && typeof obj === 'object' ) {
            return obj[key];
        }

        return null;
    };

    rivets.formatters.set = (obj, key, value) => {
        if ( obj && typeof obj === 'object' ) {
            obj[key] = value;
        }

        return obj;
    };

    rivets.formatters['.'] = rivets.formatters.get;

    rivets.formatters.keys = (obj) => {
        if ( typeof obj === 'object' ) {
            return Object.keys(obj);
        }

        return [];
    };

    rivets.formatters.length = (value) => {
        return value ? ( value.length || 0 ) : 0;
    };

    rivets.formatters.sort = (/* value[, by][, direction]*/) => {
        const args = Array.from(arguments);
        const value = args.shift();
        let by = args.shift();
        let direction = args.shift();

        if ( !direction && ( by == 'asc' || by == 'desc' ) ) {
            direction = by;
            by = null;
        }

        if ( !by ) {
            value.sort();
        } else {
            value.sort((a, b) => {
                if ( a[by] === b[by] ) {
                    return 0;
                }

                return ( a[by] < b[by] ) ? -1 : 1;
            });
        }

        if ( direction == 'desc' ) {
            value.reverse();
        }

        return value;
    };

    rivets.formatters.default = (value, args) => {
        return ( typeof value !== 'undefined' && value !== null ) ? value : args;
    };

    rivets.formatters.contains = (value, search) => {
        if ( Array.isArray(value) ) {
            return ( value.indexOf(search) !== -1 );
        }

        return false;
    };

    rivets.formatters.percent = (value, decimals) => {
        return number_format(value * 100, decimals || 0, ',') + '%';
    };

    rivets.formatters.bind = (/* fn, thisArg[, arg1, arg2, ..., argN]*/) => {
        const args = Array.from(arguments);
        const fn = args.shift();
        const self = args.shift();

        if ( typeof fn === 'function' ) {
            return () => {
                fn.apply(self, args);
            };
        }

        return fn;
    };

    rivets.formatters.with = (/* fn, arg1, arg2, ..., argN*/) => {
        const args = Array.from(arguments);
        const fn = args.shift();

        if ( typeof fn === 'function' ) {
            return fn.bind(null, args);
        }

        return fn;
    };

    rivets.formatters.slice = () => {
        const args = Array.from(arguments);
        const arr = args.shift();
        return Array.prototype.slice.apply(arr, args);
    };

    rivets.formatters.objProp = (val, key) => {
        return val[key];
    };

    rivets.formatters.formatPrice = (val) => {
        return vtexHelpers.formatPrice(val);
    };

    rivets.formatters.productImgSize = (val, arg1, arg2) => {
        return vtexHelpers.getResizedImage(val, arg1, arg2);
    };

    rivets.formatters.getResizedImage = (val, arg1, arg2) => {
        return vtexHelpers.getResizedImage(val, arg1, arg2);
    };

    rivets.formatters.getResizeImageByRatio = (src, type, newSize, aspectRatio) => {
        return vtexHelpers.getResizeImageByRatio(src, type, newSize, aspectRatio);
    };

    rivets.formatters.replaceBreakLines = (val) => {
        return vtexHelpers.replaceBreakLines(val);
    };

    rivets.formatters.pad = (val) => {
        return utilify.globalHelpers.pad(val);
    };

    rivets.formatters.capitalize = (val) => {
        return utilify.globalHelpers.capitalize(val);
    };
}
