
/*!!
 * VtexUtils.js v1.15.1
 * https://github.com/zeindelf/vtex-utils
 *
 * Copyright (c) 2017-2018 Zeindelf
 * Released under the MIT license
 *
 * Date: 2018-09-06T22:55:54.371Z
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VTEX = global.VTEX || {}, global.VTEX.VtexUtils = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var jquery = createCommonjsModule(function (module) {
	/*!
	 * jQuery JavaScript Library v2.2.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-05-20T17:23Z
	 */

	(function( global, factory ) {

		{
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : commonjsGlobal, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "2.2.4",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},

		isPlainObject: function( obj ) {
			var key;

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			// Not own constructor property must be Object
			if ( obj.constructor &&
					!hasOwn.call( obj, "constructor" ) &&
					!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for ( key in obj ) {}

			return key === undefined || hasOwn.call( obj, key );
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add( function() {

						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	} );


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {

		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function( owner, initial ) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;

			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key === undefined ) {
				this.register( owner );

			} else {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );

					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;

				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :

						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

					if ( data !== undefined ) {
						return data;
					}

					camelKey = jQuery.camelCase( key );

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {

			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([\w:-]+)/ );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName( "tbody" )[ 0 ] ||
				elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );


	var iframe,
		elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */

	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			display = jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var documentElement = document.documentElement;



	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );
		}

		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

				documentElement.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;

				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		window.clearInterval( timerId );

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {

						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




	var rclass = /[\t\r\n\f]/g;

	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace( rreturn, "" ) :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :

						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);

			jQuery.event.trigger( e, null, elem );
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// The jqXHR state
				state = 0,

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {

									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );

					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );


	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {

				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );

	jQuery.fn.andSelf = jQuery.fn.addBack;



	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
	}));
	});

	var vender_jqueryAjaxRetry = createCommonjsModule(function (module, exports) {
	  /*
	   * jquery.ajax-retry
	   * https://github.com/johnkpaul/jquery-ajax-retry
	   *
	   * Copyright (c) 2012 John Paul
	   * Licensed under the MIT license.
	   */
	  /* eslint-disable */
	  (function (factory) {
	    {
	      // Node/CommonJS
	      factory(jquery);
	    }
	  })(function ($) {

	    // enhance all ajax requests with our retry API
	    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
	      jqXHR.retry = function (opts) {
	        if (opts.timeout) {
	          this.timeout = opts.timeout;
	        }
	        if (opts.statusCodes) {
	          this.statusCodes = opts.statusCodes;
	        }
	        return this.pipe(null, pipeFailRetry(this, opts));
	      };
	    });

	    // generates a fail pipe function that will retry `jqXHR` `times` more times
	    function pipeFailRetry(jqXHR, opts) {
	      var times = opts.times;
	      var timeout = jqXHR.timeout;

	      // takes failure data as input, returns a new deferred
	      return function (input, status, msg) {
	        var ajaxOptions = this;
	        var output = new $.Deferred();
	        var retryAfter = jqXHR.getResponseHeader('Retry-After');

	        // whenever we do make this request, pipe its output to our deferred
	        function nextRequest() {
	          $.ajax(ajaxOptions).retry({ times: times - 1, timeout: opts.timeout, statusCodes: opts.statusCodes }).pipe(output.resolve, output.reject);
	        }

	        if (times > 1 && (!jqXHR.statusCodes || $.inArray(input.status, jqXHR.statusCodes) > -1)) {
	          // implement Retry-After rfc
	          // http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.37
	          if (retryAfter) {
	            // it must be a date
	            if (isNaN(retryAfter)) {
	              timeout = new Date(retryAfter).getTime() - $.now();
	              // its a number in seconds
	            } else {
	              timeout = parseInt(retryAfter, 10) * 1000;
	            }
	            // ensure timeout is a positive number
	            if (isNaN(timeout) || timeout < 0) {
	              timeout = jqXHR.timeout;
	            }
	          }

	          if (timeout !== undefined) {
	            setTimeout(nextRequest, timeout);
	          } else {
	            nextRequest();
	          }
	        } else {
	          // no times left, reject our deferred with the current arguments
	          output.rejectWith(this, arguments);
	        }

	        return output;
	      };
	    }
	  });
	});

	var utilify = createCommonjsModule(function (module, exports) {
	/*!!
	 * Utilify.js v0.7.1
	 * https://github.com/zeindelf/utilify-js
	 *
	 * Copyright (c) 2017-2018 Zeindelf
	 * Released under the MIT license
	 *
	 * Date: 2018-08-24T19:40:18.527Z
	 */

	(function (global, factory) {
		module.exports = factory();
	}(commonjsGlobal, (function () {
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var defineProperty = function (obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	var toConsumableArray = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	};

	/* ! store2 - v2.7.0 - 2018-02-08
	* Copyright (c) 2018 Nathan Bubna; Licensed (MIT OR GPL-3.0) */
	/* eslint-disable */
	var _ = {
	    version: "2.7.0",
	    areas: {},
	    apis: {},

	    // utilities
	    inherit: function inherit(api, o) {
	        for (var p in api) {
	            if (!o.hasOwnProperty(p)) {
	                o[p] = api[p];
	            }
	        }
	        return o;
	    },
	    stringify: function stringify(d) {
	        return d === undefined || typeof d === "function" ? d + '' : JSON.stringify(d);
	    },
	    parse: function parse(s) {
	        // if it doesn't parse, return as is
	        try {
	            return JSON.parse(s);
	        } catch (e) {
	            return s;
	        }
	    },

	    // extension hooks
	    fn: function fn(name, _fn) {
	        _.storeAPI[name] = _fn;
	        for (var api in _.apis) {
	            _.apis[api][name] = _fn;
	        }
	    },
	    get: function get$$1(area, key) {
	        return area.getItem(key);
	    },
	    set: function set$$1(area, key, string) {
	        area.setItem(key, string);
	    },
	    remove: function remove(area, key) {
	        area.removeItem(key);
	    },
	    key: function key(area, i) {
	        return area.key(i);
	    },
	    length: function length(area) {
	        return area.length;
	    },
	    clear: function clear(area) {
	        area.clear();
	    },

	    // core functions
	    Store: function Store(id, area, namespace) {
	        var store = _.inherit(_.storeAPI, function (key, data, overwrite) {
	            if (arguments.length === 0) {
	                return store.getAll();
	            }
	            if (typeof data === "function") {
	                return store.transact(key, data, overwrite);
	            } // fn=data, alt=overwrite
	            if (data !== undefined) {
	                return store.set(key, data, overwrite);
	            }
	            if (typeof key === "string" || typeof key === "number") {
	                return store.get(key);
	            }
	            if (!key) {
	                return store.clear();
	            }
	            return store.setAll(key, data); // overwrite=data, data=key
	        });
	        store._id = id;
	        try {
	            var testKey = '_safariPrivate_';
	            area.setItem(testKey, 'sucks');
	            store._area = area;
	            area.removeItem(testKey);
	        } catch (e) {}
	        if (!store._area) {
	            store._area = _.inherit(_.storageAPI, { items: {}, name: 'fake' });
	        }
	        store._ns = namespace || '';
	        if (!_.areas[id]) {
	            _.areas[id] = store._area;
	        }
	        if (!_.apis[store._ns + store._id]) {
	            _.apis[store._ns + store._id] = store;
	        }
	        return store;
	    },
	    storeAPI: {
	        // admin functions
	        area: function area(id, _area) {
	            var store = this[id];
	            if (!store || !store.area) {
	                store = _.Store(id, _area, this._ns); //new area-specific api in this namespace
	                if (!this[id]) {
	                    this[id] = store;
	                }
	            }
	            return store;
	        },
	        namespace: function namespace(_namespace, noSession) {
	            if (!_namespace) {
	                return this._ns ? this._ns.substring(0, this._ns.length - 1) : '';
	            }
	            var ns = _namespace,
	                store = this[ns];
	            if (!store || !store.namespace) {
	                store = _.Store(this._id, this._area, this._ns + ns + '.'); //new namespaced api
	                if (!this[ns]) {
	                    this[ns] = store;
	                }
	                if (!noSession) {
	                    store.area('session', _.areas.session);
	                }
	            }
	            return store;
	        },
	        isFake: function isFake() {
	            return this._area.name === 'fake';
	        },
	        toString: function toString() {
	            return 'store' + (this._ns ? '.' + this.namespace() : '') + '[' + this._id + ']';
	        },

	        // storage functions
	        has: function has(key) {
	            if (this._area.has) {
	                return this._area.has(this._in(key)); //extension hook
	            }
	            return !!(this._in(key) in this._area);
	        },
	        size: function size() {
	            return this.keys().length;
	        },
	        each: function each(fn, value) {
	            // value is used by keys(fillList) and getAll(fillList))
	            for (var i = 0, m = _.length(this._area); i < m; i++) {
	                var key = this._out(_.key(this._area, i));
	                if (key !== undefined) {
	                    if (fn.call(this, key, value || this.get(key)) === false) {
	                        break;
	                    }
	                }
	                if (m > _.length(this._area)) {
	                    m--;i--;
	                } // in case of removeItem
	            }
	            return value || this;
	        },
	        keys: function keys(fillList) {
	            return this.each(function (k, list) {
	                list.push(k);
	            }, fillList || []);
	        },
	        get: function get$$1(key, alt) {
	            var s = _.get(this._area, this._in(key));
	            return s !== null ? _.parse(s) : alt || s; // support alt for easy default mgmt
	        },
	        getAll: function getAll(fillObj) {
	            return this.each(function (k, all) {
	                all[k] = this.get(k);
	            }, fillObj || {});
	        },
	        transact: function transact(key, fn, alt) {
	            var val = this.get(key, alt),
	                ret = fn(val);
	            this.set(key, ret === undefined ? val : ret);
	            return this;
	        },
	        set: function set$$1(key, data, overwrite) {
	            var d = this.get(key);
	            if (d != null && overwrite === false) {
	                return data;
	            }
	            return _.set(this._area, this._in(key), _.stringify(data), overwrite) || d;
	        },
	        setAll: function setAll(data, overwrite) {
	            var changed, val;
	            for (var key in data) {
	                val = data[key];
	                if (this.set(key, val, overwrite) !== val) {
	                    changed = true;
	                }
	            }
	            return changed;
	        },
	        add: function add(key, data) {
	            var d = this.get(key);
	            if (d instanceof Array) {
	                data = d.concat(data);
	            } else if (d !== null) {
	                var type = typeof d === "undefined" ? "undefined" : _typeof(d);
	                if (type === (typeof data === "undefined" ? "undefined" : _typeof(data)) && type === 'object') {
	                    for (var k in data) {
	                        d[k] = data[k];
	                    }
	                    data = d;
	                } else {
	                    data = d + data;
	                }
	            }
	            _.set(this._area, this._in(key), _.stringify(data));
	            return data;
	        },
	        remove: function remove(key) {
	            var d = this.get(key);
	            _.remove(this._area, this._in(key));
	            return d;
	        },
	        clear: function clear() {
	            if (!this._ns) {
	                _.clear(this._area);
	            } else {
	                this.each(function (k) {
	                    _.remove(this._area, this._in(k));
	                }, 1);
	            }
	            return this;
	        },
	        clearAll: function clearAll() {
	            var area = this._area;
	            for (var id in _.areas) {
	                if (_.areas.hasOwnProperty(id)) {
	                    this._area = _.areas[id];
	                    this.clear();
	                }
	            }
	            this._area = area;
	            return this;
	        },

	        // internal use functions
	        _in: function _in(k) {
	            if (typeof k !== "string") {
	                k = _.stringify(k);
	            }
	            return this._ns ? this._ns + k : k;
	        },
	        _out: function _out(k) {
	            return this._ns ? k && k.indexOf(this._ns) === 0 ? k.substring(this._ns.length) : undefined : // so each() knows to skip it
	            k;
	        }
	    }, // end _.storeAPI
	    storageAPI: {
	        length: 0,
	        has: function has(k) {
	            return this.items.hasOwnProperty(k);
	        },
	        key: function key(i) {
	            var c = 0;
	            for (var k in this.items) {
	                if (this.has(k) && i === c++) {
	                    return k;
	                }
	            }
	        },
	        setItem: function setItem(k, v) {
	            if (!this.has(k)) {
	                this.length++;
	            }
	            this.items[k] = v;
	        },
	        removeItem: function removeItem(k) {
	            if (this.has(k)) {
	                delete this.items[k];
	                this.length--;
	            }
	        },
	        getItem: function getItem(k) {
	            return this.has(k) ? this.items[k] : null;
	        },
	        clear: function clear() {
	            for (var k in this.items) {
	                this.removeItem(k);
	            }
	        },
	        toString: function toString() {
	            return this.length + ' items in ' + this.name + 'Storage';
	        } // end _.storageAPI
	    } };

	// safely set this up (throws error in IE10/32bit mode for local files)
	var store = _.Store("local", function () {
	    try {
	        return localStorage;
	    } catch (e) {}
	}());
	store.local = store; // for completeness
	store._ = _; // for extenders and debuggers...
	// safely setup store.session (throws exception in FF for file:/// urls)
	store.area("session", function () {
	    try {
	        return sessionStorage;
	    } catch (e) {}
	}());
	(function (store, _) {
	    var _set = _.set,
	        _get = _.get,
	        _remove = _.remove,
	        _key = _.key,
	        _length = _.length,
	        _clear = _.clear;

	    _.overflow = function (area, create) {
	        var name = area === _.areas.local ? '+local+' : area === _.areas.session ? '+session+' : false;
	        if (name) {
	            var overflow = _.areas[name];
	            if (create && !overflow) {
	                overflow = store.area(name)._area; // area() copies to _.areas
	            } else if (create === false) {
	                delete _.areas[name];
	                delete store[name];
	            }
	            return overflow;
	        }
	    };
	    _.set = function (area, key, string) {
	        try {
	            _set.apply(this, arguments);
	        } catch (e) {
	            if (e.name === 'QUOTA_EXCEEDED_ERR' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.toString().indexOf("QUOTA_EXCEEDED_ERR") !== -1 || e.toString().indexOf("QuotaExceededError") !== -1) {
	                // the e.toString is needed for IE9 / IE10, cos name is empty there
	                return _.set(_.overflow(area, true), key, string);
	            }
	            throw e;
	        }
	    };
	    _.get = function (area, key) {
	        var overflow = _.overflow(area);
	        return overflow && _get.call(this, overflow, key) || _get.apply(this, arguments);
	    };
	    _.remove = function (area, key) {
	        var overflow = _.overflow(area);
	        if (overflow) {
	            _remove.call(this, overflow, key);
	        }
	        _remove.apply(this, arguments);
	    };
	    _.key = function (area, i) {
	        var overflow = _.overflow(area);
	        if (overflow) {
	            var l = _length.call(this, area);
	            if (i >= l) {
	                i = i - l; // make i overflow-relative
	                for (var j = 0, m = _length.call(this, overflow); j < m; j++) {
	                    if (j === i) {
	                        // j is overflow index
	                        return _key.call(this, overflow, j);
	                    }
	                }
	            }
	        }
	        return _key.apply(this, arguments);
	    };
	    _.length = function (area) {
	        var length = _length(area),
	            overflow = _.overflow(area);
	        return overflow ? length + _length(overflow) : length;
	    };
	    _.clear = function (area) {
	        _.overflow(area, false);
	        _clear.apply(this, arguments);
	    };
	})(store, store._, undefined);
	(function (store, _) {
	    var prefix = 'exp@',
	        suffix = ';',
	        parse = _.parse,
	        _get = _.get,
	        _set = _.set;
	    _.parse = function (s) {
	        if (s && s.indexOf(prefix) === 0) {
	            s = s.substring(s.indexOf(suffix) + 1);
	        }
	        return parse(s);
	    };
	    _.expires = function (s) {
	        if (s && s.indexOf(prefix) === 0) {
	            return parseInt(s.substring(prefix.length, s.indexOf(suffix)), 10);
	        }
	        return false;
	    };
	    _.when = function (min) {
	        // if min, return min->date, else date->min
	        var now = Math.floor(new Date().getTime() / 1000);
	        return min ? new Date((now + min) * 1000) : now;
	    };
	    _.cache = function (area, key) {
	        var s = _get(area, key),
	            min = _.expires(s);
	        if (min && _.when() >= min) {
	            return area.removeItem(key);
	        }
	        return s;
	    };
	    _.get = function (area, key) {
	        var s = _.cache(area, key);
	        return s === undefined ? null : s;
	    };
	    _.set = function (area, key, string, min) {
	        try {
	            if (min) {
	                string = prefix + (_.when() + min) + suffix + string;
	            }
	            _set(area, key, string);
	        } catch (e) {
	            if (e.name === 'QUOTA_EXCEEDED_ERR' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
	                var changed = false;
	                for (var i = 0, m = area.length; i < m; i++) {
	                    if (_.cache(area, key) === undefined) {
	                        changed = true;
	                    }
	                }
	                if (changed) {
	                    return _.set.apply(this, arguments);
	                }
	            }
	            throw e;
	        }
	    };
	})(store, store._, undefined);

	var stringHelpers = {
	    /**
	     * Capitalize a string
	     *
	     * @param {string} str - The String
	     * @return {string} The modified string
	     * @example
	     *     capitalize('foo bar'); // 'Foo Bar'
	     */
	    capitalize: function capitalize(str) {
	        return str.replace(/(?:^|\s)\S/g, function (match) {
	            return match.toUpperCase();
	        });
	    },


	    /**
	     * Replace <, >, &, ', " and / with HTML entities.
	     * @param {string} str - The string to check
	     * @return {boolean}
	     */
	    escape: function escape(str) {
	        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
	    },


	    /**
	     * Normalize text adding first character to upper after punctuations (. ? !)
	     *
	     * @param  {String} [str]  Text to convert
	     * @return {String}
	     */
	    normalizeText: function normalizeText(str) {
	        var _this = this;

	        var re = /(^|[.!?]\s+)([a-z])/g;
	        var normalize = function normalize(str) {
	            return str.toLowerCase().replace(re, function (m, $1, $2) {
	                return $1 + $2.toUpperCase();
	            });
	        };
	        var addSpace = function addSpace(str) {
	            return _this.strCompact(str.replace(/[,.!?:;]+(?=\S)/g, '$& '));
	        };

	        return normalize(addSpace(str));
	    },


	    /**
	     * Zero padding number
	     *
	     * @param  {integer} number     Number to format
	     * @param  {integer} [size=2]   Digits limit
	     * @return {string}             Formatted num with zero padding
	     */
	    pad: function pad(number, size) {
	        var stringNum = String(number);

	        while (stringNum.length < (size || 2)) {
	            stringNum = '0' + stringNum;
	        }

	        return stringNum;
	    },


	    /**
	     * Remove accents from a string
	     * @param {string} str - The string to remove accents
	     * @return {string} The modified string
	     * @example
	     *     removeAccent('Olá Mündô!'); // 'Ola Mundo!'
	     */
	    removeAccent: function removeAccent(str) {
	        var reAccents = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g;

	        // Prefixed with some char to avoid off-by-one:
	        var replacements = '_aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';

	        return str.replace(reAccents, function (match) {
	            return replacements[reAccents.source.indexOf(match)];
	        });
	    },


	    /**
	     * Slugify a text, removing/replacing all special characters and spaces with dashes '-'
	     * @param {string} str - The string to sanitize
	     * @return {string} The modified string
	     * @example
	     *     slugifyText('Olá Mundo!'); // 'ola-mundo'
	     */
	    slugifyText: function slugifyText(str) {
	        str = str.replace(/^\s+|\s+$/g, '') // trim
	        .toLowerCase().replace(/\./g, '-') // Replace a dot for a -
	        .replace(/\*/g, '-') // Replace a * for a -
	        .replace(/\+/g, '-'); // Replace a + for a -

	        // Remove accents, swap ñ for n, etc
	        var from = 'àáäâãèéëêìíïîòóöôõùúüûýÿñç·/_,:;';
	        var to = 'aaaaaeeeeiiiiooooouuuuyync------';

	        for (var i = 0, len = from.length; i < len; i += 1) {
	            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	        }

	        str = str.replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
	        .replace(/\s+/g, '-') // Collapse whitespace and replace by -
	        .replace(/-+/g, '-'); // Collapse dashes

	        if (str.charAt(0) === '-') str = str.substr(1);
	        if (str.charAt(str.length - 1) === '-') str = str.substr(0, str.length - 1);

	        return str;
	    },


	    /**
	     * Compacts whitespace in the string to a single space and trims the ends.
	     *
	     * @param  {String} [str] String to remove spaces
	     * @return {String}
	     * @example
	     *     strCompact('  Foo  Bar    Baz  ') // 'Foo Bar Baz'
	     */
	    strCompact: function strCompact(str) {
	        return this.trim(str).replace(/([\r\n\s])+/g, function (match, whitespace) {
	            return whitespace === '　' ? whitespace : ' ';
	        });
	    },


	    /**
	     * Multiple string replace, PHP str_replace clone
	     * @param {string|Array} search - The value being searched for, otherwise known as the needle.
	     *     An array may be used to designate multiple needles.
	     * @param {string|Array} replace - The replacement value that replaces found search values.
	     *     An array may be used to designate multiple replacements.
	     * @param {string} subject - The subject of the replacement
	     * @return {string} The modified string
	     * @example
	     *     strReplace(['olá', 'mundo'], ['hello', 'world'], 'olá mundo'); // 'hello world'
	     *     strReplace(['um', 'dois'], 'olá', 'um dois três'); // Output 'olá olá três'
	     */
	    strReplace: function strReplace(search, replace, subject) {
	        var regex = void 0;

	        if (validateHelpers.isArray(search)) {
	            for (var i = 0; i < search.length; i++) {
	                search[i] = search[i].replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	                regex = new RegExp(search[i], 'g');
	                subject = subject.replace(regex, validateHelpers.isArray(replace) ? replace[i] : replace);
	            }
	        } else {
	            search = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	            regex = new RegExp(search, 'g');
	            subject = subject.replace(regex, validateHelpers.isArray(replace) ? replace[0] : replace);
	        }

	        return subject;
	    },


	    /**
	     * Remove leading and trailing empty spaces.
	     *
	     * @param {String} str - The string.
	     * @returns {String} The new string.
	     * @example
	     *     trim('  Foo  ') // 'Foo'
	     */
	    trim: function trim(str) {
	        if (validateHelpers.isString(str)) {
	            return str.replace(/^\s+|\s+$/gm, '');
	        }

	        return '';
	    },


	    /**
	     * Make a string's first character uppercase
	     * PHP ucfirst clone
	     *
	     * @param {String} str - The string.
	     * @returns {String} The new string.
	     * @example
	     *     ucfirst('foo bar foz') // 'Foo bar foz'
	     */
	    ucfirst: function ucfirst(str) {
	        str += '';
	        var f = str.charAt(0).toUpperCase();

	        return f + str.substr(1);
	    },


	    /**
	     * Converts hyphens and camel casing to underscores.
	     *
	     * @param  {String} str String to convert
	     * @return {String}
	     */
	    underscore: function underscore(str) {
	        return str.replace(/[-\s]+/g, '_').replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
	    },


	    /**
	     * Replaces HTML encoded entities with <, >, &, ', " and /.
	     * @param {string} str - The string to check
	     * @return {boolean}
	     */
	    unescape: function unescape(str) {
	        return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#x5C;/g, '\\').replace(/&#96;/g, '`');
	    }
	};

	var globalHelpers = {
	    /**
	     * Recursively transform key strings to camelCase if param is an Object.
	     * If param is string, return an camel cased string.
	     *
	     * @param  {Object|String} obj  Object or string to transform
	     * @returns {Object|String}
	     */
	    camelize: function camelize(obj) {
	        var _this = this;

	        var _camelize = function _camelize(str) {
	            str = stringHelpers.underscore(str);
	            str = stringHelpers.slugifyText(str);

	            return str.replace(/[_.-\s](\w|$)/g, function (_, x) {
	                return x.toUpperCase();
	            });
	        };

	        if (validateHelpers.isDate(obj) || validateHelpers.isRegExp(obj)) {
	            return obj;
	        }

	        if (validateHelpers.isArray(obj)) {
	            return obj.map(function (item, index) {
	                if (validateHelpers.isObject(item)) {
	                    return _this.camelize(item);
	                }

	                return item;
	            });
	        }

	        if (validateHelpers.isString(obj)) {
	            return _camelize(obj);
	        }

	        return Object.keys(obj).reduce(function (acc, key) {
	            var camel = _camelize(key);
	            acc[camel] = obj[key];

	            if (validateHelpers.isObject(obj[key])) {
	                acc[camel] = _this.camelize(obj[key]);
	            }

	            return acc;
	        }, {});
	    },


	    /**
	     * Check if value contains in an element
	     *
	     * @category Global
	     * @param {String} value - Value to check
	     * @param {String|Array} elem - String or array
	     * @return {Boolean} - Return true if element contains a value
	     */
	    contains: function contains(value, elem) {
	        if (validateHelpers.isArray(elem)) {
	            for (var i = 0, len = elem.length; i < len; i += 1) {
	                if (elem[i] === value) {
	                    return true;
	                }
	            }
	        }

	        if (validateHelpers.isString(elem)) {
	            return elem.indexOf(value) >= 0;
	        }

	        return false;
	    },


	    /**
	     * Creates a debounced function that delays invoking `func` until after `wait`
	     * milliseconds have elapsed since the last time the debounced function was
	     * invoked, or until the next browser frame is drawn. The debounced function
	     * comes with a `cancel` method to cancel delayed `func` invocations and a
	     * `flush` method to immediately invoke them. Provide `options` to indicate
	     * whether `func` should be invoked on the leading and/or trailing edge of the
	     * `wait` timeout. The `func` is invoked with the last arguments provided to the
	     * debounced function. Subsequent calls to the debounced function return the
	     * result of the last `func` invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is
	     * invoked on the trailing edge of the timeout only if the debounced function
	     * is invoked more than once during the `wait` timeout.
	     *
	     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	     * until the next tick, similar to `setTimeout` with a timeout of `0`.
	     *
	     * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
	     * invocation will be deferred until the next frame is drawn (typically about
	     * 16ms).
	     *
	     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	     * for details over the differences between `debounce` and `throttle`.
	     *
	     * @from Lodash
	     *
	     * @category Global
	     * @param {Function} func The function to debounce.
	     * @param {number} [wait=0] The number of milliseconds to delay; if omitted, `requestAnimationFrame` is used (if available).
	     * @param {Object} [options={}] The options object.
	     * @param {boolean} [options.leading=false] Specify invoking on the leading edge of the timeout.
	     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's invoked.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing edge of the timeout.
	     * @return {Function} Returns the new debounced function.
	     * @example
	     *     // Avoid costly calculations while the window size is in flux.
	     *     $(window).on('resize', debounce(calculateLayout, 150));
	     *
	     *     // Invoke `sendMail` when clicked, debouncing subsequent calls.
	     *     $(element).on('click', debounce(sendMail, 300, {
	     *        'leading': true,
	     *         'trailing': false,
	     *     }));
	     *
	     *     // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	     *     const debounced = debounce(batchLog, 250, { 'maxWait': 1000 })
	     *     const source = new EventSource('/stream')
	     *     $(source).on('message', debounced)
	     *
	     *     // Cancel the trailing debounced invocation.
	     *     $(window).on('popstate', debounced.cancel)
	     *
	     *     // Check for pending invocations.
	     *     const status = debounced.pending() ? "Pending..." : "Ready"
	     */
	    debounce: function debounce(func, wait, options) {
	        var lastArgs = void 0;
	        var lastThis = void 0;
	        var maxWait = void 0;
	        var result = void 0;
	        var timerId = void 0;
	        var lastCallTime = void 0;

	        var lastInvokeTime = 0;
	        var leading = false;
	        var maxing = false;
	        var trailing = true;

	        // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
	        var useRAF = !wait && wait !== 0 && typeof window.requestAnimationFrame === 'function';

	        if (typeof func != 'function') {
	            throw new TypeError('Expected a function');
	        }

	        wait = +wait || 0;
	        if (validateHelpers.isObject(options)) {
	            leading = !!options.leading;
	            maxing = 'maxWait' in options;
	            maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
	            trailing = 'trailing' in options ? !!options.trailing : trailing;
	        }

	        function invokeFunc(time) {
	            var args = lastArgs;
	            var thisArg = lastThis;

	            lastArgs = lastThis = undefined;
	            lastInvokeTime = time;
	            result = func.apply(thisArg, args);
	            return result;
	        }

	        function startTimer(pendingFunc, wait) {
	            if (useRAF) {
	                return window.requestAnimationFrame(pendingFunc);
	            }

	            return setTimeout(pendingFunc, wait);
	        }

	        function cancelTimer(id) {
	            if (useRAF) {
	                return window.cancelAnimationFrame(id);
	            }

	            clearTimeout(id);
	        }

	        function leadingEdge(time) {
	            // Reset any `maxWait` timer.
	            lastInvokeTime = time;
	            // Start the timer for the trailing edge.
	            timerId = startTimer(timerExpired, wait);
	            // Invoke the leading edge.
	            return leading ? invokeFunc(time) : result;
	        }

	        function remainingWait(time) {
	            var timeSinceLastCall = time - lastCallTime;
	            var timeSinceLastInvoke = time - lastInvokeTime;
	            var timeWaiting = wait - timeSinceLastCall;

	            return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
	        }

	        function shouldInvoke(time) {
	            var timeSinceLastCall = time - lastCallTime;
	            var timeSinceLastInvoke = time - lastInvokeTime;

	            // Either this is the first call, activity has stopped and we're at the
	            // trailing edge, the system time has gone backwards and we're treating
	            // it as the trailing edge, or we've hit the `maxWait` limit.
	            return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	        }

	        function timerExpired() {
	            var time = Date.now();
	            if (shouldInvoke(time)) {
	                return trailingEdge(time);
	            }

	            // Restart the timer.
	            timerId = startTimer(timerExpired, remainingWait(time));
	        }

	        function trailingEdge(time) {
	            timerId = undefined;

	            // Only invoke if we have `lastArgs` which means `func` has been
	            // debounced at least once.
	            if (trailing && lastArgs) {
	                return invokeFunc(time);
	            }

	            lastArgs = lastThis = undefined;
	            return result;
	        }

	        function cancel() {
	            if (timerId !== undefined) {
	                cancelTimer(timerId);
	            }

	            lastInvokeTime = 0;
	            lastArgs = lastCallTime = lastThis = timerId = undefined;
	        }

	        function flush() {
	            return timerId === undefined ? result : trailingEdge(Date.now());
	        }

	        function pending() {
	            return timerId !== undefined;
	        }

	        function debounced() {
	            var time = Date.now();
	            var isInvoking = shouldInvoke(time);

	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }

	            lastArgs = args;
	            /* eslint-disable */
	            lastThis = this;
	            /* eslint-enable */
	            lastCallTime = time;

	            if (isInvoking) {
	                if (timerId === undefined) {
	                    return leadingEdge(lastCallTime);
	                }

	                if (maxing) {
	                    // Handle invocations in a tight loop.
	                    timerId = startTimer(timerExpired, wait);
	                    return invokeFunc(lastCallTime);
	                }
	            }

	            if (timerId === undefined) {
	                timerId = startTimer(timerExpired, wait);
	            }

	            return result;
	        }

	        debounced.cancel = cancel;
	        debounced.flush = flush;
	        debounced.pending = pending;
	        return debounced;
	    },


	    /**
	     * Get variable type
	     *
	     * @category Global
	     * @param {Mix} variable - Variable to check type
	     * @return {string} Name of variable type
	     * @example
	     *     getType(123); // 'number'
	     *     getType([]); // 'array'
	     *     getType({}); // 'object'
	     *     // and so on...
	     */
	    getType: function getType(variable) {
	        var types = {
	            'undefined': 'undefined',
	            'number': 'number',
	            'boolean': 'boolean',
	            'string': 'string',
	            '[object Function]': 'function',
	            '[object RegExp]': 'regexp',
	            '[object Array]': 'array',
	            '[object Date]': 'date',
	            '[object Error]': 'error'
	        };

	        return types[typeof variable === 'undefined' ? 'undefined' : _typeof(variable)] || types[{}.toString.call(variable)] || (variable ? 'object' : 'null');
	    },


	    /**
	     * Get url params from a query string
	     *
	     * @category Global
	     * @param {string} name - Param name
	     * @param {string} entryPoint - Full url or query string
	     * @return {string} Value query string param
	     * @example
	     *     // URL: https://site.com?param1=foo&param2=bar
	     *     getUrlParameter('param1'); // foo
	     *     getUrlParameter('param2'); // bar
	     *
	     *     // Given entry point
	     *     var url = 'http://www.site.com?param1=foo&param2=bar&param3=baz';
	     *     getUrlParameter('param3', url); // baz
	     */
	    getUrlParameter: function getUrlParameter(name, entryPoint) {
	        entryPoint = !validateHelpers.isString(entryPoint) ? window.location.href : entryPoint.substring(0, 1) === '?' ? entryPoint : '?' + entryPoint;
	        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

	        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	        var results = regex.exec(entryPoint);

	        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	    },


	    /**
	     * Resize image by aspect ratio
	     *
	     * @category Global
	     * @param  {String} type          Resize by 'width' or 'height'
	     * @param  {Number} newSize       New value to resize
	     * @param  {Number} aspectRatio   Image aspect ratio (calculate by (width / height))
	     * @return {Object}               Object with new 'width' and 'height'
	     */
	    resizeImageByRatio: function resizeImageByRatio(type, newSize, aspectRatio, decimal) {
	        if (!validateHelpers.isNumber(newSize) || !validateHelpers.isNumber(aspectRatio)) {
	            newSize = parseFloat(newSize, 10);
	            aspectRatio = parseFloat(aspectRatio, 10);
	        }

	        var dimensions = {};
	        decimal = decimal || 4;

	        switch (type) {
	            case 'width':
	                dimensions.width = parseFloat(newSize, 10);
	                dimensions.height = parseFloat((newSize / aspectRatio).toFixed(decimal), 10);

	                break;

	            case 'height':
	                dimensions.width = parseFloat((newSize * aspectRatio).toFixed(decimal), 10);
	                dimensions.height = parseFloat(newSize, 10);

	                break;

	            default:
	                throw new Error('\'type\' needs to be \'width\' or \'height\'');
	        }

	        return dimensions;
	    },


	    /**
	     * Compare two semver version strings, returning -1, 0, or 1
	     * If the semver string `v1` is greater than `v2`, return 1. If the semver string `v2` is greater than `v1`, return -1. If `v1` equals `v2`, return 0
	     *
	     * @from @semver-compare
	     * @category Global
	     * @param  {String} v1 Your semver to compare
	     * @param  {String} v2 Compared semver
	     * @return {Number}    -1, 0, 1
	     */
	    semverCompare: function semverCompare(v1, v2) {
	        var semver = /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
	        var validate = function validate(version) {
	            if (!validateHelpers.isString(version)) {
	                throw new TypeError('Invalid argument: expected string');
	            }
	            if (!semver.test(version)) {
	                throw new Error('Invalid argument: not valid semver');
	            }
	        };

	        [v1, v2].forEach(validate);

	        var pa = v1.split('.');
	        var pb = v2.split('.');

	        for (var i = 0; i < 3; i++) {
	            var na = Number(pa[i]);
	            var nb = Number(pb[i]);

	            if (na > nb) {
	                return 1;
	            }

	            if (nb > na) {
	                return -1;
	            }

	            if (!isNaN(na) && isNaN(nb)) {
	                return 1;
	            }

	            if (isNaN(na) && !isNaN(nb)) {
	                return -1;
	            }
	        }

	        return 0;
	    },


	    /**
	     * Removes the host from an url
	     *
	     * @category Global
	     * @param {string} url - The url
	     * @return {string} The modified string
	     * @example
	     *     stripHost("http://test.com.br/contact/test"); //  "/contact/test"
	     */
	    stripHost: function stripHost(url) {
	        var newUrl = url;
	        return newUrl.toString().replace(/https?:\/\/.*?\//i, '/');
	    },


	    /**
	     * Removes the protocol from an url
	     *
	     * @category Global
	     * @param {string} url - The url
	     * @return {string} The modified string
	     * @example
	     *     stripHttp('http://test.com.br/contact/test'); // '//test.com.br/contact/test'
	     */
	    stripHttp: function stripHttp(url) {
	        var newUrl = url;
	        return newUrl.replace(/^https?:/, '');
	    },


	    /**
	     * Creates a throttled function that only invokes `func` at most once per
	     * every `wait` milliseconds (or once per browser frame). The throttled function
	     * comes with a `cancel` method to cancel delayed `func` invocations and a
	     * `flush` method to immediately invoke them. Provide `options` to indicate
	     * whether `func` should be invoked on the leading and/or trailing edge of the
	     * `wait` timeout. The `func` is invoked with the last arguments provided to the
	     * throttled function. Subsequent calls to the throttled function return the
	     * result of the last `func` invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is
	     * invoked on the trailing edge of the timeout only if the throttled function
	     * is invoked more than once during the `wait` timeout.
	     *
	     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	     * until the next tick, similar to `setTimeout` with a timeout of `0`.
	     *
	     * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
	     * invocation will be deferred until the next frame is drawn (typically about
	     * 16ms).
	     *
	     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	     * for details over the differences between `throttle` and `debounce`.
	     *
	     * @from Lodash
	     * @category Global
	     * @param {Function} func The function to throttle.
	     * @param {number} [wait=0] The number of milliseconds to throttle invocations to; if omitted, `requestAnimationFrame` is used (if available).
	     * @param {Object} [options={}] The options object.
	     * @param {boolean} [options.leading=true] Specify invoking on the leading edge of the timeout.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing edge of the timeout.
	     * @return {Function} Returns the new throttled function.
	     * @example
	     *     // Avoid excessively updating the position while scrolling.
	     *     $(window).on('scroll', throttle(updatePosition, 100))
	     *
	     *     // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	     *     const throttled = throttle(renewToken, (1000 * 60 * 5), {'trailing': false})
	     *     $(element).on('click', throttled)
	     *
	     *     // Cancel the trailing throttled invocation.
	     *     $(window).on('popstate', throttled.cancel)
	     */
	    throttle: function throttle(func, wait, options) {
	        var leading = true;
	        var trailing = true;

	        if (typeof func !== 'function') {
	            throw new TypeError('Expected a function');
	        }

	        if (validateHelpers.isObject(options)) {
	            leading = 'leading' in options ? !!options.leading : leading;
	            trailing = 'trailing' in options ? !!options.trailing : trailing;
	        }

	        return this.debounce(func, wait, {
	            'leading': leading,
	            'maxWait': wait,
	            'trailing': trailing
	        });
	    },


	    /**
	     * Invokes the iteratee `n` times, returning an array of the results of
	     * each invocation. The iteratee is invoked with one argumentindex).
	     *
	     * @from Lodash
	     * @category Global
	     * @param {number} n The number of times to invoke `iteratee`.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *     times(3, String)
	     *     // => ['0', '1', '2']
	     *
	     *     times(4, () => 0)
	     *     // => [0, 0, 0, 0]
	     */
	    times: function times(n, iteratee) {
	        /** Used as references for various `Number` constants. */
	        var MAX_SAFE_INTEGER = 9007199254740991;
	        /** Used as references for the maximum length and index of an array. */
	        var MAX_ARRAY_LENGTH = 4294967295;

	        if (n < 1 || n > MAX_SAFE_INTEGER) {
	            return [];
	        }

	        var index = -1;
	        var length = Math.min(n, MAX_ARRAY_LENGTH);
	        var result = new Array(length);

	        while (++index < length) {
	            result[index] = iteratee(index);
	        }

	        index = MAX_ARRAY_LENGTH;
	        n -= MAX_ARRAY_LENGTH;

	        while (++index < n) {
	            iteratee(index);
	        }

	        return result;
	    },


	    /**
	     * Unserialize a query string into an object.
	     *
	     * @category Global
	     * @param {string} [str = actual url] - The string that will be converted into a object
	     * @return {object}
	     * @example
	     *     // str can be '?param1=foo&param2=bar&param3=baz', 'param1=foo&param2=bar&param3=baz' or a full url
	     *     // If no provided, will get actual url
	     *     var url = 'http://www.site.com?param1=foo&param2=bar&param3=baz';
	     *     unserialize(url); // {param1: 'foo', param2: 'bar', param3: 'baz'}
	     */
	    unserialize: function unserialize(str) {
	        str = !validateHelpers.isString(str) ? window.location.href : str;

	        if (str.indexOf('?') < 0) {
	            return {};
	        }

	        str = str.indexOf('?') === 0 ? str.substr(1) : str.slice(str.indexOf('?') + 1);

	        var query = {};
	        var parts = str.split('&');

	        for (var i = 0, len = parts.length; i < len; i += 1) {
	            var part = parts[i].split('=');
	            query[decodeURIComponent(part[0])] = decodeURIComponent(part[1] || '');
	        }

	        return query;
	    }
	};

	// cache some methods to call later on
	var toString = Object.prototype.toString;

	var validateHelpers = {
	    /**
	     * is a given value Arguments?
	     * @category Validate
	     */
	    isArguments: function isArguments(value) {
	        // fallback check is for IE
	        return toString.call(value) === '[object Arguments]' || value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && 'callee' in value;
	    },


	    /**
	     * Check if the given value is an array.
	     *
	     * @category Validate
	     * @param {*} value - The value to check.
	     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
	     */
	    isArray: function isArray(value) {
	        // check native isArray first
	        if (Array.isArray) {
	            return Array.isArray(value);
	        }

	        return toString.call(value) === '[object Array]';
	    },
	    isArrayIndex: function isArrayIndex(n) {
	        return n >>> 0 === n && n !== 0xFFFFFFFF;
	    },


	    /**
	     * Check if the given value is a boolean value.
	     *
	     * @category Validate
	     * @param {*} value - The value to check.
	     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
	     */
	    isBoolean: function isBoolean(value) {
	        return value === true || value === false || toString.call(value) === '[object Boolean]';
	    },


	    /**
	     * is a given value Char?
	     *
	     * @category Validate
	     */
	    isChar: function isChar(value) {
	        return this.isString(value) && value.length === 1;
	    },


	    /**
	     * is a given value Date Object?
	     *
	     * @category Validate
	     */
	    isDate: function isDate(value) {
	        return toString.call(value) === '[object Date]';
	    },


	    /**
	     * is a given object a DOM node?
	     *
	     * @category Validate
	     */
	    isDomNode: function isDomNode(object) {
	        return this.isObject(object) && object.nodeType > 0;
	    },


	    /**
	     * Check if a string is a valid mail.
	     *
	     * @category Validate
	     * @param {string} email - The string to check
	     * @return {boolean}
	     */
	    isEmail: function isEmail(email) {
	        var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

	        return regex.test(email);
	    },


	    /**
	     * is a given value empty? Objects, arrays, strings
	     *
	     * @category Validate
	     */
	    isEmpty: function isEmpty(variable) {
	        var emptyVariables = {
	            'undefined': true,
	            'null': true,
	            'number': false,
	            'boolean': false,
	            'function': false,
	            'regexp': false,
	            'date': false,
	            'error': false
	        };

	        var strType = globalHelpers.getType(variable);
	        var boolReturn = void 0;

	        if (emptyVariables.hasOwnProperty(strType)) {
	            boolReturn = emptyVariables[strType];
	        } else {
	            switch (strType) {
	                case 'object':
	                    boolReturn = this.isObjectEmpty(variable);
	                    break;

	                case 'string':
	                    boolReturn = variable ? false : true;
	                    break;

	                case 'array':
	                    boolReturn = variable.length ? false : true;
	                    break;
	            }
	        }

	        return boolReturn;
	    },


	    /**
	     * is a given value Error object?
	     *
	     * @category Validate
	     */
	    isError: function isError(value) {
	        return toString.call(value) === '[object Error]';
	    },


	    /**
	     * Check if the given value is a function.
	     *
	     * @category Validate
	     * @param {*} value - The value to check.
	     * @return {boolean} Returns 'true' if the given value is a function, else 'false'.
	     */
	    isFunction: function isFunction(value) {
	        // fallback check is for IE
	        return toString.call(value) === '[object Function]' || typeof value === 'function';
	    },


	    /**
	     * Check if a string is a valid JSON.
	     *
	     * @category Validate
	     * @param {string} str - The string to check
	     * @return {boolean}
	     */
	    isJson: function isJson(str) {
	        try {
	            var obj = JSON.parse(str);
	            return this.isObject(obj);
	        } catch (e) {/* ignore */}

	        return false;
	    },


	    /**
	     * is a given value null?
	     *
	     * @category Validate
	     */
	    isNull: function isNull(value) {
	        return value === null;
	    },


	    /**
	     * Check if the given value is a number.
	     *
	     * @category Validate
	     * @param {*} value - The value to check.
	     * @return {boolean} Returns 'true' if the given value is a number, else 'false'.
	     */
	    isNumber: function isNumber(value) {
	        var isNaN = Number.isNaN || window.isNaN;

	        return typeof value === 'number' && !isNaN(value);
	    },


	    /**
	     * Check if the given value is numeric (String or Number).
	     *
	     * @category Validate
	     * @param {*} value - The value to check.
	     * @return {boolean} Returns 'true' if the given value is a numeric, else 'false'.
	     */
	    isNumeric: function isNumeric(value) {
	        return (/^[0-9]*\.?[0-9]+$/.test(value)
	        );
	    },


	    /**
	     * Check if the given value is an object
	     *
	     * @category Validate
	     * @param {*} value - The value to check
	     * @return {boolean} Returns 'true' if the given value is an object, else 'false'
	     */
	    isObject: function isObject(value) {
	        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
	    },


	    /**
	     * Verify if as objects is empty
	     *
	     * @category Validate
	     * @param {object} obj - The object to verify
	     * @return {boolean}
	     * @example
	     *     isObjectEmpty({}); // true
	     */
	    isObjectEmpty: function isObjectEmpty(obj) {
	        if (!this.isObject(obj)) {
	            return false;
	        }

	        for (var x in obj) {
	            if ({}.hasOwnProperty.call(obj, x)) {
	                return false;
	            }
	        }

	        return true;
	    },


	    /**
	     * Returns whether a value is a percentage.
	     *
	     * @category Validate
	     * @param  {Mix}  percentage - The percentage to test.
	     * @return {Boolean}
	     */
	    isPercentage: function isPercentage(percentage) {
	        return this.isNumber(percentage) && percentage <= 100 && percentage >= 0;
	    },


	    /**
	     * Check if the given value is a plain object.
	     *
	     * @category Validate
	     * @param {*} value - The value to check.
	     * @return {boolean} Returns 'true' if the given value is a plain object, else 'false'.
	     */
	    isPlainObject: function isPlainObject(value) {
	        if (!this.isObject(value)) {
	            return false;
	        }

	        try {
	            var _constructor = value.constructor;
	            var prototype = _constructor.prototype;


	            return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
	        } catch (e) {
	            return false;
	        }
	    },
	    isPrimitive: function isPrimitive(obj, type) {
	        type = type || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj));

	        return obj == null || type === 'string' || type === 'number' || type === 'boolean';
	    },
	    isRealNaN: function isRealNaN(obj) {
	        // This is only true of NaN
	        return obj != null && obj !== obj;
	    },


	    /**
	     * is a given value RegExp?
	     *
	     * @category Validate
	     */
	    isRegExp: function isRegExp(value) {
	        return toString.call(value) === '[object RegExp]';
	    },


	    /**
	     * are given values same type?
	     *
	     * @category Validate
	     */
	    isSameType: function isSameType(value, other) {
	        var tag = toString.call(value);

	        if (tag !== toString.call(other)) {
	            return false;
	        }

	        return true;
	    },


	    /**
	     * Check if the given value is a string.
	     *
	     * @category Validate
	     * @param {*} value - The value to check.
	     * @return {boolean} Returns 'true' if the given value is a string, else 'false'.
	     */
	    isString: function isString(value) {
	        return toString.call(value) === '[object String]';
	    },


	    /**
	     * Check if the given value is undefined.
	     *
	     * @category Validate
	     * @param {*} value - The value to check.
	     * @return {boolean} Returns 'true' if the given value is undefined, else 'false'.
	     */
	    isUndefined: function isUndefined(value) {
	        return value === undefined;
	    }
	};

	var arrayHelpers = {
	    /**
	     * Creates a shallow clone of the array.
	     *
	     * @param  {Array} arr Array to clone
	     * @return {Array}     Array cloned
	     */
	    arrayClone: function arrayClone(arr) {
	        var clone = new Array(arr.length);

	        this._forEach(arr, function (el, i) {
	            clone[i] = el;
	        });

	        return clone;
	    },


	    /**
	     * Remove all falsey values from an array.
	     *
	     * @category Array
	     * @param {Array} arr - Array to filter
	     * @example
	     *     arrayCompact([null, a, undefined, 0, false, b, c, '', true]); // [a, b, c, true]
	     */
	    arrayCompact: function arrayCompact(arr) {
	        if (!Array.isArray(arr)) {
	            throw new TypeError('arrayCompact() expects an array.');
	        }

	        return arr.filter(Boolean);
	    },


	    /**
	     * Returns a flattened, one-dimensional copy of the array.
	     * You can optionally specify a limit, which will only flatten to that depth.
	     *
	     * @param  {Array}   arr              Array to flatten
	     * @param  {Integer} level[Infinity]  Depth
	     * @return {Array}
	     */
	    arrayFlatten: function arrayFlatten(arr, level) {
	        var self = this;
	        var result = [];
	        var current = 0;
	        level = level || Infinity;

	        self._forEach(arr, function (el) {
	            if (validateHelpers.isArray(el) && current < level) {
	                result = result.concat(self.arrayFlatten(el, level, current + 1));
	            } else {
	                result.push(el);
	            }
	        });
	        return result;
	    },


	    /**
	     * Returns a new array containing the intersection between two arrays given.
	     *
	     * @category Array
	     * @param {Array} arr1 First array
	     * @param {Array} arr2 Second array
	     * @return {Array} The intersection
	     * @example
	     *     arrayIntersection([1, 2, 3], [2, 3, 4]) // [2, 3]
	     */
	    arrayIntersection: function arrayIntersection(arr1, arr2) {
	        return arr1.filter(function (val) {
	            return arr2.indexOf(val) !== -1;
	        });
	    },


	    /**
	     * Returns a random element from the array.
	     * If num is passed, will return an array of num elements.
	     * If remove is true, sampled elements will also be removed from the array.
	     * remove can also be passed in place of num.
	     *
	     * @param  {Array} [arr]  Array to sample
	     * @param  {Integer|Boolean} [num=1]    Num of elements
	     * @param  {Boolean} [remove=false]     Remove sampled elements
	     * @return {String|Array}
	     */
	    arraySample: function arraySample(arr, num, remove) {
	        var result = [];
	        var _num = void 0;
	        var _remove = void 0;
	        var single = void 0;

	        if (validateHelpers.isBoolean(num)) {
	            _remove = num;
	        } else {
	            _num = num;
	            _remove = remove;
	        }

	        if (validateHelpers.isUndefined(_num)) {
	            _num = 1;
	            single = true;
	        }

	        if (!_remove) {
	            arr = this.arrayClone(arr);
	        }

	        _num = Math.min(_num, arr.length);

	        for (var i = 0, index; i < _num; i += 1) {
	            index = Math.trunc(Math.random() * arr.length);
	            result.push(arr[index]);
	            arr.splice(index, 1);
	        }

	        return single ? result[0] : result;
	    },


	    /**
	     * Return an array with unique values
	     *
	     * @category Array
	     * @param {Array} arr - The array
	     * @return {Array}
	     */
	    arrayUnique: function arrayUnique(arr) {
	        return arr.filter(function (value, index, self) {
	            return self.indexOf(value) === index;
	        });
	    },


	    /**
	     * Creates an array of elements split into groups the length of size.
	     * If array can't be split evenly, the final chunk will be the remaining elements.
	     *
	     * @category Array
	     * @param  {Array}    array      The array to proccess.
	     * @param  {Integer}  [size=1]   The length of each chunk.
	     * @return {Array}               Returns the new array of chunks.
	     * @example
	     *     chunk(['a', 'b', 'c', 'd'], 2)
	     *     // => [['a', 'b'], ['c', 'd']]
	     *
	     *     chunk(['a', 'b', 'c', 'd'], 3)
	     *     // => [['a', 'b', 'c'], ['d']]
	     */
	    chunk: function chunk(array, size) {
	        size = Math.max(size, 0);
	        var length = array === null ? 0 : array.length;

	        if (!length || size < 1) {
	            return [];
	        }

	        var index = 0;
	        var resIndex = 0;
	        var result = new Array(Math.ceil(length / size));

	        while (index < length) {
	            result[resIndex++] = this.slice(array, index, index += size);
	        }

	        return result;
	    },


	    /**
	     * Removes empty index from a array.
	     *
	     * @category Array
	     * @param {Array} arr - The array
	     * @return {Array}
	     */
	    cleanArray: function cleanArray(array) {
	        var newArray = [];

	        for (var i = 0, len = array.length; i < len; i += 1) {
	            if (array[i]) {
	                newArray.push(array[i]);
	            }
	        }

	        return newArray;
	    },


	    /**
	     * Join array elements with glue string - PHP implode alike
	     *
	     * @category Array
	     * @param {object|array} pieces - The array|object to implode.  If object it will implode the values, not the keys.
	     * @param {string} [glue=','] - The glue
	     * @return {string} The imploded array|object
	     * @example
	     *     implode(['Foo', 'Bar']); // 'Foo,Bar'
	     */
	    implode: function implode(pieces, glue) {
	        if (validateHelpers.isArray(pieces)) {
	            return pieces.join(glue || ',');
	        } else if (validateHelpers.isObject(pieces)) {
	            var arr = [];
	            for (var o in pieces) {
	                if (object.hasOwnProperty(o)) {
	                    arr.push(pieces[o]);
	                }
	            }

	            return arr.join(glue || ',');
	        }

	        return '';
	    },


	    /**
	     * Split array elements by separator - PHP implode alike
	     *
	     * @category Array
	     * @param {String} str - String to split
	     * @param {string} separator - The separator
	     * @param {Number} limit - Limit splitted elements
	     * @return {Array} The array with values
	     * @example
	     *     explode('a', '.', 2); // ['a']
	     *     explode('a.b', '.', 2); // ['a', 'b']
	     *     explode('a.b.c', '.', 2); // ['a', 'b.c']
	     */
	    explode: function explode(str, separator, limit) {
	        if (!validateHelpers.isString(str)) {
	            throw new Error('\'str\' must be a String');
	        }

	        var arr = str.split(separator);

	        if (limit !== undefined && arr.length >= limit) {
	            arr.push(arr.splice(limit - 1).join(separator));
	        }

	        return arr;
	    },


	    /**
	     * Randomize a array elements with Fisher–Yates shuffle algorithm base.
	     *
	     * @category Array
	     * @param {array} array - The array to randomize
	     * @return {array} The new modified array
	     * @example
	     *     const arr = [1, 2, 3, 4];
	     *     shuffleArray(arr); // [3, 2, 4, 1]
	     */
	    shuffleArray: function shuffleArray(array) {
	        var j = 0;
	        var temp = [];
	        var newArray = [];

	        for (var i = array.length - 1; i > 0; i--) {
	            j = Math.floor(Math.random() * (i + 1));
	            temp = array[i];

	            newArray[i] = array[j];
	            newArray[j] = temp;
	        }

	        return newArray;
	    },


	    /**
	     * Creates a slice of `array` from `start` up to, but not including, `end`.
	     *
	     * **Note:** This method is used instead of
	     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are returned.
	     *
	     * @from Lodash
	     *
	     * @category Array
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position. A negative index will be treated as an offset from the end.
	     * @param {number} [end=array.length] The end position. A negative index will be treated as an offset from the end.
	     * @returns {Array} Returns the slice of `array`.
	     */
	    slice: function slice(array, start, end) {
	        var length = array == null ? 0 : array.length;

	        if (!length) {
	            return [];
	        }
	        start = start == null ? 0 : start;
	        end = end === undefined ? length : end;

	        if (start < 0) {
	            start = -start > length ? 0 : length + start;
	        }

	        end = end > length ? length : end;

	        if (end < 0) {
	            end += length;
	        }

	        length = start > end ? 0 : end - start >>> 0;
	        start >>>= 0;

	        var index = -1;
	        var result = new Array(length);

	        while (++index < length) {
	            result[index] = array[index + start];
	        }

	        return result;
	    },


	    // PRIVATE
	    _getSparseArrayIndexes: function _getSparseArrayIndexes(arr, fromIndex, loop, fromRight) {
	        var indexes = [];
	        var i = void 0;

	        for (i in arr) {
	            // Istanbul ignore next
	            if (validateHelpers.isArrayIndex(i) && (loop || (fromRight ? i <= fromIndex : i >= fromIndex))) {
	                indexes.push(+i);
	            }
	        }

	        indexes.sort(function (a, b) {
	            var aLoop = a > fromIndex;
	            var bLoop = b > fromIndex;

	            // This block cannot be reached unless ES5 methods are being shimmed.
	            // istanbul ignore if
	            if (aLoop !== bLoop) {
	                return aLoop ? -1 : 1;
	            }

	            return a - b;
	        });

	        return indexes;
	    },
	    _iterateOverSparseArray: function _iterateOverSparseArray(arr, fn, fromIndex, loop) {
	        var indexes = this._getSparseArrayIndexes(arr, fromIndex, loop);
	        var index = void 0;

	        for (var i = 0, len = indexes.length; i < len; i += 1) {
	            index = indexes[i];
	            fn.call(arr, arr[index], index, arr);
	        }

	        return arr;
	    },
	    _forEach: function _forEach(arr, fn) {
	        for (var i = 0, len = arr.length; i < len; i += 1) {
	            if (!(i in arr)) {
	                return this._iterateOverSparseArray(arr, fn, i);
	            }

	            fn(arr[i], i);
	        }
	    }
	};

	// import validateHelpers from './validate-helpers.js';

	var numberHelpers = {
	    /**
	     * Formats an integer number with dots/commas as thousands separators
	     *
	     * @param  {Integer} num Number to format
	     * @param  {String} [separator='.'] Separator
	     * @return {String}
	     */
	    formatNumber: function formatNumber(num, separator) {
	        separator = separator || '.';

	        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
	    },


	    /**
	     * Convert long numbers into a human-readable format, e.g. 25000 to '25K'
	     *
	     * @from millify
	     * @param  {Number} number    Number to format
	     * @param  {Integer} [decimal=1]  Decimal places
	     * @return {String}
	     */
	    milify: function milify(number, decimal) {
	        var suffixes = new Map();
	        suffixes.set(3, 'K');
	        suffixes.set(6, 'M');
	        suffixes.set(9, 'B');
	        suffixes.set(12, 'T');
	        suffixes.set(15, 'P');
	        suffixes.set(18, 'E');

	        // Make sure value is a number
	        number = function (num) {
	            if (typeof num !== 'number') {
	                throw new Error('Input value is not a number');
	            }

	            return parseFloat(num, 10);
	        }(number);

	        // Figure out how many digits in the integer
	        var digits = Math.floor(Math.log10(Math.abs(number))) + 1;

	        // Figure out the appropriate unit for the number
	        var units = function (num, zeroes) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = suffixes.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var z = _step.value;

	                    if (num > z) {
	                        zeroes = z;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return {
	                suffix: suffixes.get(zeroes),
	                zeroes: zeroes
	            };
	        }(digits, null);

	        var pretty = number / Math.pow(10, units.zeroes);

	        decimal = pretty % 1 === 0 ? 2 : Math.max(1, decimal + 1) || 3;

	        if (-1000 < number && number < 1000) {
	            return number;
	        }

	        return '' + parseFloat(pretty.toPrecision(decimal)) + units.suffix;
	    },


	    /**
	     * Converts a value to a number if possible.
	     *
	     * @category Global
	     * @param {Mix} value The value to convert.
	     * @returns {Number} The converted number, otherwise the original value.
	     * @example
	     *     toNumber('123') // 123
	     *     toNumber('123.456') // 123.456
	     */
	    toNumber: function toNumber(value) {
	        var number = parseFloat(value);
	        if (number === undefined) {
	            return value;
	        }

	        if (number.toString().length !== value.toString().length) {
	            return value;
	        }

	        return Number.isNaN(number) ? value : number;
	    }
	};

	var objectHelpers = {
	    /**
	     * Call Object.freeze(obj) recursively on all unfrozen
	     * properties of obj that are functions or objects.
	     *
	     * @param  {Object} [obj] Object to freeze
	     * @return {Object}
	     */
	    deepFreeze: function deepFreeze(obj) {
	        var _this = this;

	        Object.freeze(obj);

	        Object.getOwnPropertyNames(obj).forEach(function (prop) {
	            if (obj.hasOwnProperty(prop) && obj[prop] !== null && (_typeof(obj[prop]) === 'object' || typeof obj[prop] === 'function') && !Object.isFrozen(obj[prop])) {
	                _this.deepFreeze(obj[prop]);
	            }
	        });

	        return obj;
	    },


	    /**
	     * Extend the given object
	     * @param {object} obj - The object to be extended
	     * @param {*} args - The rest objects which will be merged to the first object
	     * @return {object} The extended object
	     */
	    extend: function extend(obj) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }

	        if (validateHelpers.isObject(obj) && args.length > 0) {
	            if (Object.assign) {
	                return Object.assign.apply(Object, [obj].concat(toConsumableArray(args)));
	            }

	            args.forEach(function (arg) {
	                if (validateHelpers.isObject(arg)) {
	                    Object.keys(arg).forEach(function (key) {
	                        obj[key] = arg[key];
	                    });
	                }
	            });
	        }

	        return obj;
	    },


	    /**
	     * A function to take a string written in dot notation style, and use it to
	     * find a nested object property inside of an object.
	     *
	     * @param {Object} obj    The object to search
	     * @param {String} path   A dot notation style parameter reference (ie 'a.b.c')
	     *
	     * @returns the value of the property in question
	     */
	    getDescendantProp: function getDescendantProp(obj, path) {
	        if (!validateHelpers.isPlainObject(obj)) {
	            throw new TypeError('\'obj\' param must be an plain object');
	        }

	        return path.split('.').reduce(function (acc, part) {
	            return acc && acc[part];
	        }, obj);
	    },


	    /**
	     * Return the length of an item (Object mostly)
	     * @param {mixed}
	     * @return {int}
	     */
	    length: function length(item) {
	        if (!validateHelpers.isUndefined(item.length)) {
	            return item.length;
	        }

	        if (validateHelpers.isObject(item)) {
	            return Object.keys(item).length;
	        }

	        return 0;
	    },


	    /**
	     * Sorting an array of objects by values
	     *
	     * @param  {Array}   [arr]              An Array of objects
	     * @param  {Mix}     [map]              Map to custom order. If value isn't an array with values, will do natural sort
	     * @param  {String}  [key]              Object key to use for sorting (accepts dot notation)
	     * @param  {Boolean} [reverse=false]    Reverse sorting
	     * @returns {Array}                     New object array with sorting values
	     * @example
	     *     var mapToSort = ['A', 'B', 'C', 'D', 'E']; // Map to sorting
	     *
	     *     var obj = [{param: 'D'}, {param: 'A'}, {param: 'E'}, {param: 'C'}, {param: 'B'}];
	     *     globalHelpers.objectArraySortByValue(objToSortByValue, mapToSort, 'param');
	     *     //=> [{param: 'A'}, {param: 'B'}, {param: 'C'}, {param: 'D'}, {param: 'E'}]
	     *
	     *     // Deep key
	     *     var obj = [{deep: {param: 'D'}}, {deep: {param: 'A'}}, {deep: {param: 'E'}}, {deep: {param: 'C'}}, {deep: {param: 'B'}}];
	     *     globalHelpers.objectArraySortByValue(objToSortByValue, mapToSort, 'deep.param');
	     *     //=> [{deep: {param: 'A'}}, {deep: {param: 'B'}}, {deep: {param: 'C'}}, {deep: {param: 'D'}}, {deep: {param: 'E'}}]
	     */
	    objectArraySortByValue: function objectArraySortByValue(arr, map, key) {
	        var _this2 = this;

	        var reverse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	        if (!validateHelpers.isArray(map) || map.length < 1) {
	            var compare = function compare(a, b, n) {
	                return _this2.getDescendantProp(a, n).toString().localeCompare(_this2.getDescendantProp(b, n).toString(), undefined, { numeric: true });
	            };

	            return arr.slice().sort(function (a, b) {
	                return reverse ? -compare(a, b, key) : compare(a, b, key);
	            });
	        }

	        return arr.slice().sort(function (a, b) {
	            var ordered = map.indexOf(_this2.getDescendantProp(a, key).toString()) - map.indexOf(_this2.getDescendantProp(b, key).toString());

	            return reverse ? ordered * -1 : ordered;
	        });
	    },


	    /**
	     * Search through an object recursively and return the first match of the key:value passed
	     * @access public
	     * @param {Object} object - The haystack
	     * @param {Object} needle - Key value pair that will be searched
	     * @param {Boolean} [caseSensitive=false] Enable/disable case sensitive on search
	     * @return {Object}
	     * @example
	     *     var data = [{
	     *         id: 0,
	     *         name: 'key 0',
	     *         children: [{
	     *             id: 1,
	     *             name: 'key 1',
	     *             children: [{
	     *                 id: 2,
	     *                 name: 'key 2',
	     *                 item: [{
	     *                     id: 3,
	     *                     name: 'key 3'
	     *                 }],
	     *                 item: [{
	     *                     id: 4,
	     *                     name: 'key 4'
	     *                 }]
	     *             }]
	     *         }]
	     *     }];
	     *     objectSearch(data, {id: 4}); // { id: 4, name: 'key 4'};
	     */
	    objectSearch: function objectSearch(object, needle) {
	        var caseSensitive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	        var p = void 0;
	        var key = void 0;
	        var val = void 0;
	        var tRet = void 0;
	        var normalize = function normalize(str) {
	            return caseSensitive ? globalHelpers.camelize(str).toLowerCase() : str;
	        };

	        for (p in needle) {
	            if (needle.hasOwnProperty(p)) {
	                key = p;
	                val = needle[p];
	            }
	        }

	        for (p in object) {
	            if (p === key) {
	                if (normalize(object[p]) === normalize(val)) {
	                    return object;
	                }
	            } else if (object[p] instanceof Object) {
	                if (object.hasOwnProperty(p)) {
	                    tRet = this.objectSearch(object[p], needle, caseSensitive);
	                    if (tRet) {
	                        return tRet;
	                    }
	                }
	            }
	        }

	        return false;
	    },


	    /**
	     * Convert object given into an array values
	     *
	     * @param  {Object}  obj  Object to convert
	     * @return {Array}
	     * @example
	     *     const obj = {a: 'a', b: 'b'};
	     *     objectToArray(obj); // ['a', 'b']
	     */
	    objectToArray: function objectToArray(obj) {
	        if (!validateHelpers.isPlainObject(obj)) {
	            throw new Error('\'obj\' must be a plain object');
	        }

	        return Object.keys(obj).map(function (key) {
	            return obj[key];
	        });
	    }
	};

	/**
	 * Create a GlobalHelpers class
	 * Javascript utilities methods
	 */

	var GlobalHelpers = function () {
	    function GlobalHelpers() {
	        classCallCheck(this, GlobalHelpers);
	    }

	    createClass(GlobalHelpers, [{
	        key: 'isArguments',

	        /**
	         * Validate type methods
	         */
	        value: function isArguments(value) {
	            return validateHelpers.isArguments(value);
	        }
	    }, {
	        key: 'isArray',
	        value: function isArray(value) {
	            return validateHelpers.isArray(value);
	        }
	    }, {
	        key: 'isArrayIndex',
	        value: function isArrayIndex(n) {
	            return validateHelpers.isArrayIndex(n);
	        }
	    }, {
	        key: 'isBoolean',
	        value: function isBoolean(value) {
	            return validateHelpers.isBoolean(value);
	        }
	    }, {
	        key: 'isChar',
	        value: function isChar(value) {
	            return validateHelpers.isChar(value);
	        }
	    }, {
	        key: 'isDate',
	        value: function isDate(value) {
	            return validateHelpers.isDate(value);
	        }
	    }, {
	        key: 'isDomNode',
	        value: function isDomNode(object) {
	            return validateHelpers.isDomNode(object);
	        }
	    }, {
	        key: 'isEmail',
	        value: function isEmail(email) {
	            return validateHelpers.isEmail(email);
	        }
	    }, {
	        key: 'isEmpty',
	        value: function isEmpty(variable) {
	            return validateHelpers.isEmpty(variable);
	        }
	    }, {
	        key: 'isError',
	        value: function isError(value) {
	            return validateHelpers.isError(value);
	        }
	    }, {
	        key: 'isFunction',
	        value: function isFunction(value) {
	            return validateHelpers.isFunction(value);
	        }
	    }, {
	        key: 'isJson',
	        value: function isJson(str) {
	            return validateHelpers.isJson(str);
	        }
	    }, {
	        key: 'isNull',
	        value: function isNull(value) {
	            return validateHelpers.isNull(value);
	        }
	    }, {
	        key: 'isNumber',
	        value: function isNumber(value) {
	            return validateHelpers.isNumber(value);
	        }
	    }, {
	        key: 'isNumeric',
	        value: function (_isNumeric) {
	            function isNumeric(_x) {
	                return _isNumeric.apply(this, arguments);
	            }

	            isNumeric.toString = function () {
	                return _isNumeric.toString();
	            };

	            return isNumeric;
	        }(function (value) {
	            return isNumeric(value);
	        })
	    }, {
	        key: 'isObject',
	        value: function isObject(value) {
	            return validateHelpers.isObject(value);
	        }
	    }, {
	        key: 'isObjectEmpty',
	        value: function isObjectEmpty(obj) {
	            return validateHelpers.isObjectEmpty(obj);
	        }
	    }, {
	        key: 'isPercentage',
	        value: function isPercentage(percentage) {
	            return validateHelpers.isPercentage(percentage);
	        }
	    }, {
	        key: 'isPlainObject',
	        value: function isPlainObject(value) {
	            return validateHelpers.isPlainObject(value);
	        }
	    }, {
	        key: 'isPrimitive',
	        value: function isPrimitive(obj, type) {
	            return validateHelpers.isPrimitive(obj, type);
	        }
	    }, {
	        key: 'isRealNaN',
	        value: function isRealNaN(obj) {
	            return validateHelpers.isRealNaN(obj);
	        }
	    }, {
	        key: 'isRegExp',
	        value: function isRegExp(value) {
	            return validateHelpers.isRegExp(value);
	        }
	    }, {
	        key: 'isSameType',
	        value: function isSameType(value, other) {
	            return validateHelpers.isSameType(value, other);
	        }
	    }, {
	        key: 'isString',
	        value: function isString(value) {
	            return validateHelpers.isString(value);
	        }
	    }, {
	        key: 'isUndefined',
	        value: function isUndefined(value) {
	            return validateHelpers.isUndefined(value);
	        }

	        /**
	         * Global Methods
	         */

	    }, {
	        key: 'arrayClone',
	        value: function arrayClone(arr) {
	            return arrayHelpers.arrayClone(arr);
	        }
	    }, {
	        key: 'arrayCompact',
	        value: function arrayCompact(arr) {
	            return arrayHelpers.arrayCompact(arr);
	        }
	    }, {
	        key: 'arrayFlatten',
	        value: function arrayFlatten(arr, level) {
	            return arrayHelpers.arrayFlatten(arr, level);
	        }
	    }, {
	        key: 'arrayIntersection',
	        value: function arrayIntersection(arr1, arr2) {
	            return arrayHelpers.arrayIntersection(arr1, arr2);
	        }
	    }, {
	        key: 'arraySample',
	        value: function arraySample(arr, arg1, arg2) {
	            return arrayHelpers.arraySample(arr, arg1, arg2);
	        }
	    }, {
	        key: 'arrayUnique',
	        value: function arrayUnique(arr) {
	            return arrayHelpers.arrayUnique(arr);
	        }
	    }, {
	        key: 'camelize',
	        value: function camelize(str) {
	            return globalHelpers.camelize(str);
	        }
	    }, {
	        key: 'capitalize',
	        value: function capitalize(str) {
	            return stringHelpers.capitalize(str);
	        }
	    }, {
	        key: 'chunk',
	        value: function chunk(array, size) {
	            return arrayHelpers.chunk(array, size);
	        }
	    }, {
	        key: 'cleanArray',
	        value: function cleanArray(array) {
	            return arrayHelpers.cleanArray(array);
	        }
	    }, {
	        key: 'contains',
	        value: function contains(value, elem) {
	            return globalHelpers.contains(value, elem);
	        }
	    }, {
	        key: 'debounce',
	        value: function debounce(func, wait, options) {
	            return globalHelpers.debounce(func, wait, options);
	        }
	    }, {
	        key: 'deepFreeze',
	        value: function deepFreeze(obj) {
	            return objectHelpers.deepFreeze(obj);
	        }
	    }, {
	        key: 'escape',
	        value: function escape(str) {
	            return stringHelpers.escape(str);
	        }
	    }, {
	        key: 'extend',
	        value: function extend(obj) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }

	            return objectHelpers.extend.apply(objectHelpers, [obj].concat(args));
	        }
	    }, {
	        key: 'formatNumber',
	        value: function formatNumber(num, separator) {
	            return numberHelpers.formatNumber(num, separator);
	        }
	    }, {
	        key: 'getDescendantProp',
	        value: function getDescendantProp(obj, path) {
	            return objectHelpers.getDescendantProp(obj, path);
	        }
	    }, {
	        key: 'getType',
	        value: function getType(variable) {
	            return globalHelpers.getType(variable);
	        }
	    }, {
	        key: 'getUrlParameter',
	        value: function getUrlParameter(name, entryPoint) {
	            return globalHelpers.getUrlParameter(name, entryPoint);
	        }
	    }, {
	        key: 'implode',
	        value: function implode(pieces, glue) {
	            return arrayHelpers.implode(pieces, glue);
	        }
	    }, {
	        key: 'explode',
	        value: function explode(str, separator, limit) {
	            return arrayHelpers.explode(str, separator, limit);
	        }
	    }, {
	        key: 'length',
	        value: function length(item) {
	            return objectHelpers.length(item);
	        }
	    }, {
	        key: 'milify',
	        value: function milify(ugly, decimal) {
	            return numberHelpers.milify(ugly, decimal);
	        }
	    }, {
	        key: 'normalizeText',
	        value: function normalizeText(str) {
	            return stringHelpers.normalizeText(str);
	        }
	    }, {
	        key: 'objectArraySortByValue',
	        value: function objectArraySortByValue(arr, map, key, reverse) {
	            return objectHelpers.objectArraySortByValue(arr, map, key, reverse);
	        }
	    }, {
	        key: 'objectSearch',
	        value: function objectSearch(object, needle) {
	            return objectHelpers.objectSearch(object, needle);
	        }
	    }, {
	        key: 'objectToArray',
	        value: function objectToArray(obj) {
	            return objectHelpers.objectToArray(obj);
	        }
	    }, {
	        key: 'pad',
	        value: function pad(number, size) {
	            return stringHelpers.pad(number, size);
	        }
	    }, {
	        key: 'removeAccent',
	        value: function removeAccent(str) {
	            return stringHelpers.removeAccent(str);
	        }
	    }, {
	        key: 'resizeImageByRatio',
	        value: function resizeImageByRatio(type, newValue, aspectRatio, decimals) {
	            return globalHelpers.resizeImageByRatio(type, newValue, aspectRatio, decimals);
	        }
	    }, {
	        key: 'semverCompare',
	        value: function semverCompare(v1, v2) {
	            return globalHelpers.semverCompare(v1, v2);
	        }
	    }, {
	        key: 'shuffleArray',
	        value: function shuffleArray(array) {
	            return arrayHelpers.shuffleArray(array);
	        }
	    }, {
	        key: 'slice',
	        value: function slice(array, start, end) {
	            return arrayHelpers.slice(array, start, end);
	        }
	    }, {
	        key: 'slugifyText',
	        value: function slugifyText(str) {
	            return stringHelpers.slugifyText(str);
	        }
	    }, {
	        key: 'stripHost',
	        value: function stripHost(url) {
	            return globalHelpers.stripHost(url);
	        }
	    }, {
	        key: 'stripHttp',
	        value: function stripHttp(url) {
	            return globalHelpers.stripHttp(url);
	        }
	    }, {
	        key: 'strCompact',
	        value: function strCompact(str) {
	            return stringHelpers.strCompact(str);
	        }
	    }, {
	        key: 'strReplace',
	        value: function strReplace(search, replace, subject) {
	            return stringHelpers.strReplace(search, replace, subject);
	        }
	    }, {
	        key: 'throttle',
	        value: function throttle(func, wait, options) {
	            return globalHelpers.throttle(func, wait, options);
	        }
	    }, {
	        key: 'times',
	        value: function times(n, iteratee) {
	            return globalHelpers.times(n, iteratee);
	        }
	    }, {
	        key: 'toNumber',
	        value: function toNumber(value) {
	            return numberHelpers.toNumber(value);
	        }
	    }, {
	        key: 'trim',
	        value: function trim(str) {
	            return stringHelpers.trim(str);
	        }
	    }, {
	        key: 'ucfirst',
	        value: function ucfirst(str) {
	            return stringHelpers.ucfirst(str);
	        }
	    }, {
	        key: 'underscore',
	        value: function underscore(str) {
	            return stringHelpers.underscore(str);
	        }
	    }, {
	        key: 'unescape',
	        value: function unescape(str) {
	            return stringHelpers.unescape(str);
	        }
	    }, {
	        key: 'unserialize',
	        value: function unserialize(str) {
	            return globalHelpers.unserialize(str);
	        }
	    }]);
	    return GlobalHelpers;
	}();

	var _regionMap;

	var CONSTANTS = {
	    STORAGE_NAME: '__location',
	    EXPIRE_TIME: 60 * 60 * 4 // Seconds * Minutes * Hours (default: 4h)
	};

	var locationHelpers = {
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
	    getUserLocation: function getUserLocation(cache, storage) {
	        var _this = this;

	        if (cache) {
	            this._initLocationStorage(storage);
	        }

	        var store = storage.session.get(CONSTANTS.STORAGE_NAME);

	        /* eslint-disable */
	        return $.Deferred(function (def) {
	            /* eslint-enable */
	            if (!validateHelpers.isObjectEmpty(store)) {
	                def.resolve(store);
	            } else {
	                if (window.navigator.geolocation) {
	                    navigator.geolocation.getCurrentPosition(function (position) {
	                        var lat = position.coords.latitude;
	                        var lng = position.coords.longitude;

	                        if (!window.google) {
	                            return def.reject('Google Maps Javascript API not found. Follow tutorial: https://developers.google.com/maps/documentation/javascript');
	                        }

	                        var latlng = new google.maps.LatLng(lat, lng);
	                        var geocoder = new google.maps.Geocoder();

	                        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
	                            if (status === google.maps.GeocoderStatus.OK) {
	                                if (results[1]) {
	                                    for (var i = 0, len = results.length; i < len; i += 1) {
	                                        if (results[i].types[0] === 'locality') {
	                                            var city = results[i].address_components[0].short_name;
	                                            var state = results[i].address_components[2].short_name;
	                                            var storeLocation = {
	                                                coords: { lat: lat, lng: lng },
	                                                city: city,
	                                                state: state,
	                                                region: _this.filteredRegion(state)
	                                            };

	                                            if (cache) {
	                                                storage.session.set(CONSTANTS.STORAGE_NAME, storeLocation, CONSTANTS.EXPIRE_TIME);
	                                            }

	                                            def.resolve(storeLocation);
	                                        }
	                                    }
	                                } else {
	                                    def.reject('No reverse geocode results.');
	                                }
	                            } else {
	                                def.reject('Geocoder failed: ' + status);
	                            }
	                        });
	                    }, function (err) {
	                        def.reject('Geolocation not available.');
	                    });
	                } else {
	                    def.reject('Geolocation isn\'t available');
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
	    filteredRegion: function filteredRegion(state) {
	        var _this2 = this;

	        this._validateStateInitials(state);

	        var filteredRegion = '';

	        var _loop = function _loop(region) {
	            if ({}.hasOwnProperty.call(_this2._regionMap, region)) {
	                _this2._regionMap[region].some(function (el, i, arr) {
	                    if (stringHelpers.removeAccent(el.toLowerCase()) === stringHelpers.removeAccent(state.toLowerCase())) {
	                        filteredRegion = region;
	                    }
	                });
	            }
	        };

	        for (var region in this._regionMap) {
	            _loop(region);
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
	    filteredState: function filteredState(state) {
	        this._validateStateInitials(state);

	        return objectHelpers.objectSearch(this._stateMap, { name: state }, true);
	    },
	    getStates: function getStates() {
	        return this._stateMap;
	    },
	    getRegions: function getRegions() {
	        return this._regionMap;
	    },


	    /**
	     * Validate if state is an initials
	     *
	     * @param  {String} state State to validate
	     * @return {Error}        Return an error if state not an initials
	     */
	    _validateStateInitials: function _validateStateInitials(state) {
	        if (state.length < 2) {
	            throw new Error('\'state\' must be two letters. e.g. \'SP\' or full state name');
	        }
	    },


	    _stateMap: [{ name: 'Acre', initials: 'AC', region: 'Norte' }, { name: 'Alagoas', initials: 'AL', region: 'Nordeste' }, { name: 'Amapá', initials: 'AP', region: 'Norte' }, { name: 'Amazonas', initials: 'AM', region: 'Norte' }, { name: 'Bahia', initials: 'BA', region: 'Nordeste' }, { name: 'Ceará', initials: 'CE', region: 'Nordeste' }, { name: 'Distrito Federal', initials: 'DF', region: 'Centro Oeste' }, { name: 'Espírito Santo', initials: 'ES', region: 'Sudeste' }, { name: 'Goiás', initials: 'GO', region: 'Centro Oeste' }, { name: 'Maranhão', initials: 'MA', region: 'Nordeste' }, { name: 'Mato Grosso', initials: 'MT', region: 'Centro Oeste' }, { name: 'Mato Grosso do Sul', initials: 'MS', region: 'Centro Oeste' }, { name: 'Minas Gerais', initials: 'MG', region: 'Sudeste' }, { name: 'Pará', initials: 'PA', region: 'Norte' }, { name: 'Paraíba', initials: 'PB', region: 'Nordeste' }, { name: 'Paraná', initials: 'PR', region: 'Sul' }, { name: 'Pernambuco', initials: 'PE', region: 'Nordeste' }, { name: 'Piauí', initials: 'PI', region: 'Nordeste' }, { name: 'Rio de Janeiro', initials: 'RJ', region: 'Sudeste' }, { name: 'Rio Grande do Norte', initials: 'RN', region: 'Nordeste' }, { name: 'Rio Grande do Sul', initials: 'RS', region: 'Sul' }, { name: 'Rondônia', initials: 'RO', region: 'Norte' }, { name: 'Roraima', initials: 'RR', region: 'Norte' }, { name: 'Santa Catarina', initials: 'SC', region: 'Sul' }, { name: 'São Paulo', initials: 'SP', region: 'Sudeste' }, { name: 'Sergipe', initials: 'SE', region: 'Nordeste' }, { name: 'Tocantins', initials: 'TO', region: 'Norte' }],

	    _regionMap: (_regionMap = {}, defineProperty(_regionMap, 'Norte', ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO']), defineProperty(_regionMap, 'Nordeste', ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE']), defineProperty(_regionMap, 'Centro Oeste', ['DF', 'GO', 'MT', 'MS']), defineProperty(_regionMap, 'Sudeste', ['ES', 'MG', 'RJ', 'SP']), defineProperty(_regionMap, 'Sul', ['PR', 'RS', 'SC']), _regionMap),

	    _initLocationStorage: function _initLocationStorage(storage) {
	        if (validateHelpers.isNull(storage.session.get(CONSTANTS.STORAGE_NAME))) {
	            storage.session.set(CONSTANTS.STORAGE_NAME, {});
	        }
	    }
	};

	/**
	 * Create a LocationHelpers class
	 */

	var LocationHelpers = function () {
	    function LocationHelpers(store) {
	        classCallCheck(this, LocationHelpers);

	        this._storage = store;
	    }

	    createClass(LocationHelpers, [{
	        key: 'getUserLocation',
	        value: function getUserLocation(cache) {
	            return locationHelpers.getUserLocation(cache, this._storage);
	        }
	    }, {
	        key: 'getStates',
	        value: function getStates() {
	            return locationHelpers.getStates();
	        }
	    }, {
	        key: 'getRegions',
	        value: function getRegions() {
	            return locationHelpers.getRegions();
	        }
	    }, {
	        key: 'filteredState',
	        value: function filteredState(state) {
	            return locationHelpers.filteredState(state);
	        }
	    }, {
	        key: 'filteredRegion',
	        value: function filteredRegion(state) {
	            return locationHelpers.filteredRegion(state);
	        }
	    }]);
	    return LocationHelpers;
	}();

	/**
	 * Create a Utilify class
	 * Main class
	 */

	var Utilify = function Utilify() {
	  classCallCheck(this, Utilify);

	  /**
	   * Version
	   * @type {String}
	   */
	  this.version = '0.7.1';

	  /**
	   * Package name
	   * @type {String}
	   */
	  this.name = '@UtilifyJS';

	  /**
	   * Global Helpers instance
	   * @type {GlobalHelpers}
	   */
	  this.globalHelpers = new GlobalHelpers();

	  /**
	   * Location Helpers instance
	   * @type {LocationHelpers}
	   */
	  this.locationHelpers = new LocationHelpers(store);

	  /**
	   * Local/Session Storage
	   * @type {Object}
	   */
	  this.storage = store;
	};

	return Utilify;

	})));
	});

	var utilify$1 = new utilify();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var defineProperty = function (obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	var globalHelpers = utilify$1.globalHelpers;

	var CONSTANTS = {
	    CAMELIZE: 'You must set camelize your items to use this method'
	};

	var vtexHelpers = {
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
	    formatPrice: function formatPrice(number, thousands, decimals, length, currency) {
	        currency = globalHelpers.isString(currency) ? currency : 'R$ ';
	        length = !globalHelpers.isNumber(length) ? 2 : length;

	        var re = '\\d(?=(\\d{' + 3 + '})+' + (length > 0 ? '\\D' : '$') + ')';
	        number = number / 100;
	        number = (number * 1).toFixed(Math.max(0, ~~length));

	        return currency + number.replace('.', decimals || ',').replace(new RegExp(re, 'g'), '$&' + (thousands || '.'));
	    },


	    /**
	     * Unformat Vtex price
	     *
	     * @param {String|Array}    value                 Price formatted
	     * @param {string}          [decimal=',']         The decimal delimiter
	     * @param {integer}         [formatNumber=false]  Thousands separator (pt-BR default: '.')
	     * @return {string|Array}   The unformatted price
	     */
	    unformatPrice: function unformatPrice(value, decimal) {
	        var _this = this;

	        var formatNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	        // Recursively unformat arrays:
	        if (globalHelpers.isArray(value)) {
	            return value.map(function (val) {
	                return _this.unformatPrice(val, decimal, formatNumber);
	            });
	        }

	        // Fails silently (need decent errors):
	        value = value || 0;

	        // Return the value as-is if it's already a number:
	        if (globalHelpers.isNumber(value)) {
	            return value;
	        }

	        decimal = decimal || ',';

	        // Build regex to strip out everything except digits, decimal point and minus sign:
	        var format = '[^0-9-' + decimal + ']';
	        var regex = new RegExp(format, ['g']);
	        var unformatted = parseFloat(('' + value).replace(/\((?=\d+)(.*)\)/, '-$1') // Replace bracketed values with negatives
	        .replace(regex, '') // Strip out any cruft
	        .replace(decimal, '.') // Make sure decimal point is standard
	        ).toFixed(2);

	        var values = unformatted.toString().split('.');

	        return {
	            unformatted: globalHelpers.toNumber(values.join('')) * 1,
	            real: formatNumber ? globalHelpers.formatNumber(values[0]) : values[0],
	            cents: values[1] || '00'
	        };
	    },


	    /**
	     * Take the value of the installment with min price and max installments given
	     *
	     * @param {String|Number} price             Price to get installments. Can be formatted price or a integer value
	     * @param {String|Number} minPrice          Min price for each installment. Can be formatted price or a integer value
	     * @param {Number}        maxInstallments   Max installments
	     * @param {Number}        [interest=0]      Interest rate
	     * @returns {Object}
	     * @example
	     *     setInstallment('R$ 3.499,00', 'R$ 430,00', 10) // {installments: 8, installmentValue: 43737, interest: 0}
	     *     setInstallment(349900, 43000, 10) // {installments: 8, installmentValue: 43737, interest: 0}
	     */
	    setInstallment: function setInstallment(price, minPrice, maxInstallments) {
	        var interest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	        price = globalHelpers.isString(price) ? this.unformatPrice(price).unformatted : price;
	        minPrice = globalHelpers.isString(minPrice) ? this.unformatPrice(minPrice).unformatted : minPrice;
	        minPrice = minPrice < 1 ? 1 : minPrice;

	        maxInstallments = globalHelpers.toNumber(maxInstallments);
	        interest = globalHelpers.toNumber(interest);

	        var installments = parseInt(price / minPrice, 10);

	        if (installments > maxInstallments) {
	            installments = maxInstallments;
	        }

	        var installmentValue = price / installments;

	        if (interest > 0) {
	            installmentValue = price * Math.pow(1 + interest / 100, installments) / installments;
	        }

	        installmentValue = Math.floor(installmentValue);

	        if (installments > 0) {
	            return {
	                installments: installments,
	                installmentValue: installmentValue,
	                interest: interest
	            };
	        }

	        return false;
	    },


	    /**
	     * Get the percentage of a discount
	     *
	     * @param  {String|Number}    oldPrice    Original price. Can be formatted price or a integer value.
	     * @param  {String|Number}    newPrice    Price with discount. Can be formatted price or a integer value.
	     * @param  {Number}           [length=0]  Number of decimals
	     * @returns {Number}
	     * @example
	     *     getPercentage('R$ 179,90', 'R$ 149,50'); // 17 (17% OFF)
	     *     getPercentage(17990, 14900, 2); // 17.18 (17.18% OFF)
	     */
	    getPercentage: function getPercentage(oldPrice, newPrice) {
	        var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	        if (oldPrice < newPrice || oldPrice < 1 || newPrice < 1) {
	            return 0;
	        }

	        oldPrice = globalHelpers.isString(oldPrice) ? this.unformatPrice(oldPrice).unformatted : oldPrice;
	        newPrice = globalHelpers.isString(newPrice) ? this.unformatPrice(newPrice).unformatted : newPrice;
	        var percent = parseFloat(newPrice / oldPrice * 100 - 100);

	        return Math.abs(percent.toFixed(length));
	    },


	    /**
	     * Returns a discount amount or adding a set value.
	     *
	     * @param  {String|Number}   price     Price to apply discount. Can be formatted price or a integer value.
	     * @param  {String|Number}   percent   Percentage to apply. Can be formatted price or a integer value.
	     * @param  {Boolean}         [formatted=false]   Format result
	     * @return {Object}
	     * @example
	     *     applyDiscountPercent('R$ 9,55', 37.27); // {discountPrice: 355, priceWithDiscount: 599, priceWithIncrease: 1310}
	     *     applyDiscountPercent('R$ 9,55', '37.27%'); // {discountPrice: 355, priceWithDiscount: 599, priceWithIncrease: 1310}
	     *     applyDiscountPercent('R$ 9,55', '37,27%'); // {discountPrice: 355, priceWithDiscount: 599, priceWithIncrease: 1310}
	     *     applyDiscountPercent(955, 37.27, true); // {discountPrice: 'R$ 3,55', priceWithDiscount: 'R$ 5,99', priceWithIncrease: 'R$ 13,10'}
	     */
	    applyDiscountPercent: function applyDiscountPercent(price, percent) {
	        var formatted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	        var getNumber = function getNumber(str) {
	            return str.replace(/,/g, '.').replace(/[^0-9.]/g, '');
	        };
	        price = globalHelpers.isString(price) ? this.unformatPrice(price).unformatted : price;
	        percent = globalHelpers.isString(percent) ? globalHelpers.toNumber(getNumber(percent)) : percent;

	        var discount = percent / 100 * price;
	        var discountPrice = Math.floor(discount);
	        var priceWithDiscount = Math.floor(price - discount);
	        var priceWithIncrease = Math.floor(price + discount);

	        return {
	            discountPrice: !formatted ? discountPrice : this.formatPrice(discountPrice),
	            priceWithDiscount: !formatted ? priceWithDiscount : this.formatPrice(priceWithDiscount),
	            priceWithIncrease: !formatted ? priceWithIncrease : this.formatPrice(priceWithIncrease)
	        };
	    },


	    /**
	     * Formats price from Vtex API `/api/catalog_system/pub/products/search/`
	     * to a correct `formatPrice` method
	     *
	     * @param  {Number} val Value to convert
	     * @return {Integer}
	     */
	    fixProductSearchPrice: function fixProductSearchPrice(val) {
	        val = globalHelpers.toNumber(val);
	        return val.toFixed(2).split('.').join('') * 1;
	    },


	    /**
	     * Get first available SKU from Vtex API `/api/catalog_system/` end point
	     *
	     * @param  {Object}  product     Product full data
	     * @return {Object|Boolean}      An available SKU data or false
	     */
	    getFirstAvailableSku: function getFirstAvailableSku(product) {
	        if (!this._checkCamelize(product)) {
	            throw new Error(CONSTANTS.CAMELIZE);
	        }

	        var newArr = {};

	        if (product.hasOwnProperty('items')) {
	            product.items.some(function (item, index, oldArr) {
	                if (item.sellers[0].commertialOffer.availableQuantity > 0) {
	                    newArr = oldArr[index];
	                    return true;
	                }

	                return false;
	            });
	        }

	        if (product.hasOwnProperty('skus')) {
	            product.skus.some(function (item, index, oldArr) {
	                if (item.available) {
	                    newArr = oldArr[index];
	                    return true;
	                }

	                return false;
	            });
	        }

	        if (globalHelpers.length(newArr) > 0) {
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
	    getOriginalImage: function getOriginalImage(src) {
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
	    getResizedImage: function getResizedImage(src, width, height) {
	        if (globalHelpers.isUndefined(width) || globalHelpers.isUndefined(height) || !globalHelpers.isString(src)) {
	            return src;
	        }

	        width = Math.round(width);
	        height = Math.round(height);

	        src = src.replace(/(?:ids\/[0-9]+)-([0-9]+)-([0-9]+)\//, function (match, matchedWidth, matchedHeight) {
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
	    getResizeImageByRatio: function getResizeImageByRatio(src, type, newSize, aspectRatio) {
	        var newValue = globalHelpers.resizeImageByRatio(type, newSize, aspectRatio);

	        return this.getResizedImage(src, newValue.width, newValue.height);
	    },


	    /**
	     * Get the Vtex server time
	     * @param {function} callback - The callback to call when the request finishes. The callback will a javascript Date object.
	     * @return {promise} - jquery Ajax promise
	     * @example
	     *     vtexHelpers.getServerTime((date) => console.log(date.getFullYear()));
	     */
	    getServerTime: function getServerTime(callback) {
	        return $.ajax({
	            url: '/no-cache/HoraAtualServidor.aspx',
	            type: 'get'
	        }).then(function (res) {
	            var monthBr = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

	            var time = res.match(/([0-9]+):([0-5][0-9]):([0-5][0-9])/)[0];
	            var day = parseInt(res.match(/[a-z]{3} ([0-9]{1,2})/)[1]);
	            var month = monthBr.indexOf(res.match(/[a-z]{3}/)[0]) + 1;
	            var year = parseInt(res.match(/[0-9]{4}/)[0]);

	            if (day < 10) {
	                day = '0' + day;
	            }

	            if (month < 10) {
	                month = '0' + month;
	            }

	            if (globalHelpers.isFunction(callback)) {
	                callback.call(null, new Date(year + '/' + month + '/' + day + ' ' + time));
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
	    getCategories: function getCategories(categoryId, depth) {
	        /* eslint-disable */
	        return $.Deferred(function (def) {
	            /* eslint-enable */
	            return $.ajax({
	                type: 'get',
	                url: '/api/catalog_system/pub/category/tree/' + (depth || 50),
	                dataType: 'json',
	                headers: {
	                    accept: 'application/json',
	                    contentType: 'application/json; charset=utf-8'
	                }
	            }).done(function (res) {
	                if (!globalHelpers.isUndefined(categoryId)) {
	                    def.resolve(globalHelpers.objectSearch(res, {
	                        id: categoryId
	                    }));
	                } else {
	                    def.resolve(res);
	                }
	            }).fail(function (err) {
	                return def.reject(err);
	            });
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
	    getProductSpec: function getProductSpec(data, specName) {
	        var defaultVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	        if (globalHelpers.isUndefined(data[specName])) {
	            return defaultVal;
	        }

	        if (globalHelpers.contains(specName, data.allSpecifications)) {
	            var specValue = data[specName] && data[specName][0];

	            return !globalHelpers.isUndefined(specValue) ? specValue : defaultVal;
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
	    getProductSellerInfo: function getProductSellerInfo(product) {
	        var sellerId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	        var seller = sellerId ? sellerId : true;
	        var sellerKey = sellerId ? 'sellerId' : 'sellerDefault';
	        var availableProduct = this.getFirstAvailableSku(product);

	        if (availableProduct) {
	            return globalHelpers.objectSearch(availableProduct, defineProperty({}, sellerKey, seller));
	        }

	        return false;
	    },


	    /**
	     * Method to use with VtexCatalog
	     */
	    getProductInstallments: function getProductInstallments(data) {
	        var sellerId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	        var commertialOffer = this._getCommertialInfo(data, sellerId);

	        if (globalHelpers.isUndefined(commertialOffer)) {
	            return false;
	        }

	        // Get by min price value
	        return commertialOffer.installments.reduce(function (prev, current) {
	            return prev.value < current.value ? prev : current;
	        }, {});
	    },


	    /**
	     * Method to use with VtexCatalog
	     */
	    getProductBankInvoice: function getProductBankInvoice(product) {
	        var sellerId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	        var sellerInfo = this.getProductSellerInfo(product, sellerId);

	        if (sellerInfo) {
	            return globalHelpers.objectSearch(sellerInfo.commertialOffer.installments, { paymentSystemName: 'Boleto Bancário' });
	        }

	        return false;
	    },


	    /**
	     * Method to use with VtexCatalog
	     */
	    getProductPriceInfo: function getProductPriceInfo(sellerInfo) {
	        if (!sellerInfo) {
	            return false;
	        }

	        var co = sellerInfo.commertialOffer;

	        var installments = this.getProductInstallments(sellerInfo);
	        var isInstallments = !globalHelpers.isObjectEmpty(installments);
	        var qty = co.availableQuantity;
	        var noListPrice = co.price === co.listPrice;
	        var fix = this.fixProductSearchPrice;
	        var format = this.formatPrice;

	        return {
	            available: qty ? true : false,
	            availableQuantity: qty,

	            sellerName: sellerInfo.sellerName,
	            sellerId: sellerInfo.sellerId,

	            bestPrice: qty ? fix(co.price) : 0,
	            listPrice: qty ? noListPrice ? false : fix(co.listPrice) : 0,

	            installments: qty && isInstallments ? installments.numberOfInstallments : 0,
	            installmentsInsterestRate: qty && isInstallments ? installments.interestRate : null,
	            installmentsValue: qty && isInstallments ? fix(installments.value) : 0,

	            bestPriceFormatted: qty ? format(fix(co.price)) : format(0),
	            listPriceFormatted: qty ? noListPrice ? false : format(fix(co.listPrice)) : noListPrice ? false : format(0),
	            installmentsValueFormatted: qty && isInstallments ? format(fix(installments.value)) : format(0)
	        };
	    },


	    /**
	     * Method to use with VtexCatalog
	     */
	    getGroupInstallments: function getGroupInstallments(data, sellerId) {
	        var commertialOffer = this._getCommertialInfo(data, sellerId);

	        if (globalHelpers.isUndefined(commertialOffer)) {
	            return false;
	        }

	        var groupedInstallments = commertialOffer.installments.reduce(function (r, a) {
	            r[a.paymentSystemName] = r[a.paymentSystemName] || [];
	            r[a.paymentSystemName].push(a);
	            return r;
	        }, Object.create(null));

	        return globalHelpers.camelize(groupedInstallments);
	    },
	    getShipping: function getShipping(postalCode, skuId, quantity) {
	        if ('skuJson' in window) {
	            var firstSku = this.getFirstAvailableSku(skuJson);
	            skuId = skuId || firstSku.sku;
	        }

	        /* eslint-disable */
	        return $.Deferred(function (def) {
	            /* eslint-enable */
	            return $.ajax({
	                type: 'get',
	                url: '/frete/calcula/' + skuId,
	                data: {
	                    shippinCep: postalCode.replace(/[^A-Za-z0-9]/g, ''),
	                    quantity: quantity || 1
	                }
	            }).then(function (res) {
	                var $html = $($.parseHTML(res));
	                var $tr = $html.find('tbody > tr');
	                var $p = $html.find('.valor');

	                var returnData = {
	                    fullResponse: res
	                };

	                var stripHtml = function stripHtml(str) {
	                    return str.replace(/<\/?[^>]+(>|$)/g, '');
	                };

	                if ($p.length) {
	                    returnData.error = true;
	                    returnData.formattedResponse = {
	                        shippingText: globalHelpers.strCompact(stripHtml(res))
	                    };
	                }

	                if ($tr.length) {
	                    returnData.error = false;
	                    returnData.formattedResponse = $tr.map(function (index, item) {
	                        var $td = $(item).children('td');
	                        var _shippingText = $td.eq(1).text().split(',');

	                        var shippingValue = $td.eq(0).text();
	                        var shippingType = _shippingText[0];
	                        var shippingText = globalHelpers.ucfirst(globalHelpers.strCompact(_shippingText[1]));

	                        return { shippingValue: shippingValue, shippingText: shippingText, shippingType: shippingType };
	                    }).toArray();
	                }

	                return def.resolve(returnData);
	            }).fail(function (err) {
	                return def.reject(err);
	            });
	        }).promise();
	    },


	    /**
	     * From '/api/catalog_system/pub/products/search/' endpoint
	     *
	     * @returns {Array}  A new instance of array with skus ordered
	     */
	    sortProductSearch: function sortProductSearch(product, map, dimension) {
	        var reverse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	        if (!globalHelpers.isString(dimension)) {
	            throw new TypeError('\'dimension\' param must be a String value');
	        }

	        if (!product.hasOwnProperty('items')) {
	            throw new Error('Product data must be an response from Vtex API \'/api/catalog_system/pub/products/search/{productId}\' endpoint');
	        }

	        dimension = this._checkCamelize(product) ? globalHelpers.camelize(dimension) : dimension;
	        return globalHelpers.objectArraySortByValue(product.items, map, dimension, reverse);
	    },


	    /**
	     * From '/api/catalog_system/pub/products/variations/' endpoint (same as SkuJson)
	     * If product data is camelized, set `map` manually or convert `dimensionsMap` prop to camelize too
	     *
	     * @returns {Array}  A new instance of array with skus ordered
	     */
	    sortProductVariations: function sortProductVariations(product, map, dimension) {
	        var reverse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	        if (!globalHelpers.isString(dimension)) {
	            throw new TypeError('\'dimension\' param must be a String value');
	        }

	        if (!product.hasOwnProperty('skus')) {
	            throw new Error('Product data must be an response from Vtex API \'/api/catalog_system/pub/products/variations/{productId}\' endpoint or global variable \'skuJson\' on product page');
	        }

	        map = globalHelpers.isArray(map) && map.length ? map : product.dimensionsMap[dimension];

	        return globalHelpers.objectArraySortByValue(product.skus, map, 'dimensions.' + dimension, reverse);
	    },


	    /**
	     * Replace break lines from product descriptions/more
	     *
	     * @param  {string}  str  String to replace
	     * @return {string}       New string with <br /> break lines
	     */
	    replaceBreakLines: function replaceBreakLines(str) {
	        str = str.replace ? str.replace(/(?:\r\n|\r|\n)/g, '<br />') : '';

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
	    stringIdsToArray: function stringIdsToArray(str) {
	        var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';

	        var splitStr = globalHelpers.explode(str, separator);
	        var arr = splitStr.map(function (item) {
	            return globalHelpers.toNumber(globalHelpers.strCompact(item));
	        });

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
	    checkLogin: function checkLogin() {
	        /* eslint-disable */
	        return $.Deferred(function (def) {
	            /* eslint-enable */
	            return $.ajax({
	                type: 'get',
	                url: '/no-cache/profileSystem/getProfile'
	            }).done(function (res) {
	                if (globalHelpers.isUndefined(res.IsUserDefined) || !res.IsUserDefined) {
	                    def.reject(res);
	                } else {
	                    def.resolve(res);
	                }
	            }).fail(function (err) {
	                return def.reject(err);
	            });
	        }).promise();
	    },


	    /**
	     * Open default Vtex popup login
	     *
	     * @param  {boolean}  [noReload = false]  Reload page after login
	     * @return {void}
	     */
	    openPopupLogin: function openPopupLogin(noReload, _url) {
	        noReload = globalHelpers.isBoolean(noReload) ? noReload : false;
	        _url = globalHelpers.isString(_url) ? _url : '/';
	        _url = noReload ? window.location.href : _url;

	        vtexid.start({
	            returnUrl: _url
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
	    addToCart: function addToCart(items, expectedOrderFormSections, salesChannel) {
	        if (!globalHelpers.isArray(items)) {
	            throw new TypeError('Items must be an Array of Object(s) with item(s) to add, e.g. var items = [{id: 123, quantity: 1, seller: \'1\'}, {id: 321, quantity: 2, seller: \'1\'}]');
	        }

	        if (globalHelpers.length(items) < 1) {
	            throw new Error('Items can\'t be an empty Array.');
	        }

	        expectedOrderFormSections = globalHelpers.isUndefined(expectedOrderFormSections) ? null : expectedOrderFormSections;
	        salesChannel = globalHelpers.isUndefined ? 1 : salesChannel;

	        /* eslint-disable */
	        return $.Deferred(function (def) {
	            /* eslint-enable */
	            return vtexjs.checkout.getOrderForm().done(function () {
	                return vtexjs.checkout.addToCart(items, expectedOrderFormSections, salesChannel).done(function (orderForm) {
	                    return def.resolve(orderForm);
	                }).fail(function (err) {
	                    return def.reject();
	                });
	            }).fail(function (err) {
	                return def.reject(err);
	            });
	        }).promise();
	    },


	    /**
	     * Empty the cart
	     *
	     * @return {promise} Order Form
	     */
	    clearCart: function clearCart() {
	        /* eslint-disable */
	        return $.Deferred(function (def) {
	            /* eslint-enable */
	            vtexjs.checkout.getOrderForm().done(function (orderForm) {
	                if (orderForm.items.length) {
	                    return vtexjs.checkout.removeAllItems(orderForm.items).done(function (orderForm) {
	                        return def.resolve(orderForm);
	                    });
	                }

	                return def.resolve(orderForm);
	            }).fail(function (err) {
	                return def.reject(err);
	            });
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
	    notifyMe: function notifyMe(name, email, skuId) {
	        /* eslint-disable */
	        return $.Deferred(function (def) {
	            /* eslint-enable */
	            var successMessage = 'Cadastrado com sucesso. Assim que o produto for disponibilizado você receberá um email avisando.';
	            var errorMessage = 'Não foi possível cadastrar. Tente mais tarde.';

	            return $.ajax({
	                url: '/no-cache/AviseMe.aspx',
	                type: 'post',
	                data: {
	                    notifymeClientName: name,
	                    notifymeClientEmail: email,
	                    notifymeIdSku: skuId
	                }
	            }).then(function (res) {
	                return def.resolve({ successMessage: successMessage });
	            }).fail(function (err) {
	                return def.reject({ errorMessage: errorMessage });
	            });
	        }).promise();
	    },


	    /**
	     * PRIVATE
	     */
	    _checkCamelize: function _checkCamelize(product) {
	        if (product.hasOwnProperty('isCamelized') && product.isCamelized) {
	            return true;
	        }

	        return false;
	    },
	    _getCommertialInfo: function _getCommertialInfo(data, sellerId) {
	        if (!globalHelpers.isPlainObject(data)) {
	            throw new TypeError('\'data\' must be an plain object');
	        }

	        return data.hasOwnProperty('commertialOffer') ? data.commertialOffer : this.getProductSellerInfo(data, sellerId).commertialOffer;
	    },


	    /**
	     * Check if user is logged in
	     *
	     * @return {Boolean}
	     */
	    _isUserLogged: function _isUserLogged(storeName) {
	        var check = this._getCookie('VtexIdclientAutCookie_' + storeName);

	        return check ? true : false;
	    },
	    _getCookie: function _getCookie(name) {
	        var dc = document.cookie;
	        var prefix = name + '=';
	        var begin = dc.indexOf('; ' + prefix);
	        var end = dc.length; // Default to end of the string

	        // Found, and not in first position
	        if (begin !== -1) {
	            // Exclude the "; "
	            begin += 2;
	        } else {
	            // See if cookie is in first position
	            begin = dc.indexOf(prefix);
	            // Not found at all or found as a portion of another cookie name
	            if (begin === -1 || begin !== 0) {
	                return false;
	            }
	        }

	        // If we find a ';' somewhere after the prefix position then "end" is that position,
	        // otherwise it defaults to the end of the string
	        if (dc.indexOf(';', begin) !== -1) {
	            end = dc.indexOf(';', begin);
	        }

	        return decodeURI(dc.substring(begin + prefix.length, end)).replace(/"/g, '');
	    }
	};

	var globalHelpers$1 = utilify$1.globalHelpers;

	if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') {
	    global.window = global;
	    global.window.navigator = {};
	}

	if ('rivets' in window) {
	    rivets.formatters.formatPrice = function (target) {
	        return vtexHelpers.formatPrice(target);
	    };
	    rivets.formatters.getResizedImage = function (src, width, height) {
	        return vtexHelpers.getResizedImage(src, width, height);
	    };
	    rivets.formatters.getResizedImageByRatio = function (src, type, newSize, aspectRatio) {
	        return vtexHelpers.getResizeImageByRatio(src, type, newSize, aspectRatio);
	    };
	    rivets.formatters.replaceBreakLines = function (target) {
	        return vtexHelpers.replaceBreakLines(target);
	    };
	    rivets.formatters.prefix = function (val, prefix) {
	        return prefix + val;
	    };
	    rivets.formatters.slugifyText = function (val) {
	        return globalHelpers$1.slugifyText(val);
	    };

	    rivets.formatters.productImgSize = rivets.formatters.getResizedImage;
	    rivets.formatters.getResizeImage = rivets.formatters.getResizedImage;
	    rivets.formatters.getResizeImageByRatio = rivets.formatters.getResizedImageByRatio;
	    rivets.formatters.productImgSizeByRatio = rivets.formatters.getResizedImageByRatio;
	}

	/**
	 * Create a VtexHelpers class
	 * Vtex utilities methods
	 */

	var VtexHelpers = function () {
	    function VtexHelpers() {
	        classCallCheck(this, VtexHelpers);

	        this.getStoreName = window.jsnomeLoja;
	        this.getSalesChannel = window.jssalesChannel;
	        this.isUserLogged = vtexHelpers._isUserLogged(this.getStoreName);
	    }

	    createClass(VtexHelpers, [{
	        key: 'formatPrice',
	        value: function formatPrice(number, thousands, decimals, length, currency) {
	            return vtexHelpers.formatPrice(number, thousands, decimals, length, currency);
	        }
	    }, {
	        key: 'unformatPrice',
	        value: function unformatPrice(value, decimal, formatNumber) {
	            return vtexHelpers.unformatPrice(value, decimal, formatNumber);
	        }
	    }, {
	        key: 'setInstallment',
	        value: function setInstallment(price, minPrice, maxInstallments, interest) {
	            return vtexHelpers.setInstallment(price, minPrice, maxInstallments, interest);
	        }
	    }, {
	        key: 'getPercentage',
	        value: function getPercentage(oldPrice, newPrice, length) {
	            return vtexHelpers.getPercentage(oldPrice, newPrice, length);
	        }
	    }, {
	        key: 'applyDiscountPercent',
	        value: function applyDiscountPercent(price, percent, formatted) {
	            return vtexHelpers.applyDiscountPercent(price, percent, formatted);
	        }
	    }, {
	        key: 'fixProductSearchPrice',
	        value: function fixProductSearchPrice(val) {
	            return vtexHelpers.fixProductSearchPrice(val);
	        }
	    }, {
	        key: 'getFirstAvailableSku',
	        value: function getFirstAvailableSku(product) {
	            return vtexHelpers.getFirstAvailableSku(product);
	        }
	    }, {
	        key: 'getOriginalImage',
	        value: function getOriginalImage(src) {
	            return vtexHelpers.getOriginalImage(src);
	        }
	    }, {
	        key: 'getResizedImage',
	        value: function getResizedImage(src, width, height) {
	            return vtexHelpers.getResizedImage(src, width, height);
	        }
	    }, {
	        key: 'getResizeImageByRatio',
	        value: function getResizeImageByRatio(src, type, newSize, aspectRatio) {
	            return vtexHelpers.getResizeImageByRatio(src, type, newSize, aspectRatio);
	        }
	    }, {
	        key: 'getServerTime',
	        value: function getServerTime(callback) {
	            return vtexHelpers.getServerTime(callback);
	        }
	    }, {
	        key: 'getCategories',
	        value: function getCategories(depth, categoryId) {
	            return vtexHelpers.getCategories(depth, categoryId);
	        }
	    }, {
	        key: 'getProductSpec',
	        value: function getProductSpec(data, specName, defaultVal) {
	            return vtexHelpers.getProductSpec(data, specName, defaultVal);
	        }
	    }, {
	        key: 'getProductSellerInfo',
	        value: function getProductSellerInfo(product, sellerId) {
	            return vtexHelpers.getProductSellerInfo(product, sellerId);
	        }
	    }, {
	        key: 'getProductInstallments',
	        value: function getProductInstallments(product, sellerId) {
	            return vtexHelpers.getProductInstallments(product, sellerId);
	        }
	    }, {
	        key: 'getProductBankInvoice',
	        value: function getProductBankInvoice(product, sellerId) {
	            return vtexHelpers.getProductBankInvoice(product, sellerId);
	        }
	    }, {
	        key: 'getProductPriceInfo',
	        value: function getProductPriceInfo(sellerInfo) {
	            return vtexHelpers.getProductPriceInfo(sellerInfo);
	        }
	    }, {
	        key: 'getGroupInstallments',
	        value: function getGroupInstallments(data, sellerId) {
	            return vtexHelpers.getGroupInstallments(data, sellerId);
	        }
	    }, {
	        key: 'getShipping',
	        value: function getShipping(postalCode, skuId, quantity) {
	            return vtexHelpers.getShipping(postalCode, skuId, quantity);
	        }
	    }, {
	        key: 'sortProductSearch',
	        value: function sortProductSearch(product, map, dimension, reverse) {
	            return vtexHelpers.sortProductSearch(product, map, dimension, reverse);
	        }
	    }, {
	        key: 'sortProductVariations',
	        value: function sortProductVariations(product, map, dimension, reverse) {
	            return vtexHelpers.sortProductVariations(product, map, dimension, reverse);
	        }
	    }, {
	        key: 'replaceBreakLines',
	        value: function replaceBreakLines(str) {
	            return vtexHelpers.replaceBreakLines(str);
	        }
	    }, {
	        key: 'stringIdsToArray',
	        value: function stringIdsToArray(str, separator) {
	            return vtexHelpers.stringIdsToArray(str, separator);
	        }
	    }, {
	        key: 'checkLogin',
	        value: function checkLogin() {
	            return vtexHelpers.checkLogin();
	        }
	    }, {
	        key: 'openPopupLogin',
	        value: function openPopupLogin(noReload) {
	            return vtexHelpers.openPopupLogin(noReload);
	        }
	    }, {
	        key: 'addToCart',
	        value: function addToCart(items, expectedOrderFormSections, salesChannel) {
	            return vtexHelpers.addToCart(items, expectedOrderFormSections, salesChannel);
	        }
	    }, {
	        key: 'clearCart',
	        value: function clearCart() {
	            return vtexHelpers.clearCart();
	        }
	    }, {
	        key: 'notifyMe',
	        value: function notifyMe(name, email, skuId) {
	            return vtexHelpers.notifyMe(name, email, skuId);
	        }
	    }]);
	    return VtexHelpers;
	}();

	/**
	 * Create a VtexUtils class
	 * Main class
	 */

	var VtexUtils = function () {
	  function VtexUtils() {
	    classCallCheck(this, VtexUtils);

	    /**
	     * Version
	     * @type {String}
	     */
	    this.version = '1.15.1';

	    /**
	     * Package name
	     * @type {String}
	     */
	    this.name = '@VtexUtils';

	    /**
	     * Vtex Helpers instance
	     * @type {VtexHelpers}
	     */
	    this.vtexHelpers = new VtexHelpers();

	    /**
	     * Global Helpers instance
	     * @type {GlobalHelpers}
	     */
	    this.globalHelpers = utilify$1.globalHelpers;

	    /**
	     * Location Helpers instance
	     * @type {LocationHelpers}
	     */
	    this.locationHelpers = utilify$1.locationHelpers;

	    /**
	     * Local/Session Storage
	     * @type {Object}
	     */
	    this.storage = utilify$1.storage;
	  }

	  createClass(VtexUtils, [{
	    key: 'setRivetsUtilify',
	    value: function setRivetsUtilify(RivetsUtilify) {
	      this.rivetsUtilify = new RivetsUtilify(utilify$1);
	    }
	  }]);
	  return VtexUtils;
	}();

	return VtexUtils;

})));
