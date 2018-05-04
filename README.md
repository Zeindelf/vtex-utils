[![Build Status](https://travis-ci.org/Zeindelf/vtex-utils.svg?branch=master)](https://travis-ci.org/Zeindelf/vtex-utils)
[![npm version](https://badge.fury.io/js/vtex-utils.svg)](https://badge.fury.io/js/vtex-utils)
[![David](https://david-dm.org/zeindelf/vtex-utils.svg)](https://github.com/Zeindelf/vtex-utils)

# VtexUtils.js

A collection of utilities methods for Vtex stores.

## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [UtilifyJS](#utilifyjs)
- [Vtex Methods](#vtex-methods)
- [Tests](#tests)
- [License](#license)
- [Dependencies](#dependencies)

## Main

```text
dist/
├── vtex-utils.js        (UMD)
├── vtex-utils.min.js    (UMD, compressed)
├── vtex-utils.common.js (CommonJS, default)
└── vtex-utils.esm.js    (ES Module)
```

## Getting started

### Direct download

Download the script [here](https://github.com/Zeindelf/vtex-utils/blob/master/dist/vtex-utils.min.js) and include it.

```html
<script type="text/javascript" src="/arquivos/vtex-utils.min.js"></script>
```

### Package Managers

VtexUtils.js supports [npm](https://www.npmjs.com/package/vtex-utils) under the name `vtex-utils`.

```shell
npm install vtex-utils --save
```

### Module Loaders

VtexUtils.js can also be loaded as an CommonJS or ES6 module (recomended).

```js
// CommomJS
var VtexUtils = require('vtex-utils');

// ES6 module
import VtexUtils from 'vtex-utils';
```

### Usage

With UMD (Universal Module Definition), the package is available on `VTEX` namespace.

```js
// Initialize constructor
var vtexUtils = new VTEX.VtexUtils();

// VtexHelpers
var vtexHelpers = vtexUtils.vtexHelpers;

// GlobalHelpers (from UtilifyJS)
var globalHelpers = vtexUtils.globalHelpers;

// LocationHelpers (from UtilifyJS)
var locationHelpers = vtexUtils.locationHelpers;

// Storage (from Store2 | https://github.com/nbubna/store)
var storage = vtexUtils.storage
```

## UtilifyJS

Docs for `vtexUtils.globalHelpers` and `vtexUtils.locationHelpers` methods can be found on [UtilifyJS](https://github.com/Zeindelf/utilify-js)

## Vtex Methods

### vtexHelpers.formatPrice(number[, thousands[, decimals[, length[, currency]]]])

Formats Vtex price

- **number**:
  - Type: `Integer`
  - The number to format

- **thousands** (optional):
  - Type: `String`
  - Default: `'.'`
  - The thousands delimiter

- **decimals** (optional):
  - Type: `String`
  - Default: `','`
  - The decimal delimiter

- **length** (optional):
  - Type: `Integer`
  - Default: `2`
  - The length of decimal

- **currency** (optional):
  - Type: `String`
  - Default: `'R$ '`
  - Set currency

#### Example

```js
vtexHelpers.formatPrice(1234); // R$ 12,34
vtexHelpers.formatPrice(123456); // R$ 1.234,56
vtexHelpers.formatPrice(123456, null, ',', 3); // R$ 1234,560
vtexHelpers.formatPrice(123456, ',', '.', 2, '$ '); // $ 1,234.56
```

### vtexHelpers.getOriginalImage(src)

Get the original VTEX image source from a thumb

- **src**:
  - Type: `String`
  - The source of the thumb

#### Example

```js
vtexHelpers.getOriginalImage('http://domain.vteximg.com.br/arquivos/ids/155242-292-292/image.png');
// http://domain.vteximg.com.br/arquivos/ids/155242/image.png
```

### vtexHelpers.getResizedImage(src, width, height)

Change the width & height from a given VTEX image source

- **src**:
  - Type: `String`
  - The source of the image

- **width**:
  - Type: `String | Integer`
  - The new image with

- **height**:
  - Type: `String | Integer`
  - The new image height

#### Example

```js
vtexHelpers.getResizedImage('http://domain.vteximg.com.br/arquivos/ids/155242-292-292/image.png', 500, 600);
// http://domain.vteximg.com.br/arquivos/ids/155242-500-600/image.png

vtexHelpers.getResizedImage('http://domain.vteximg.com.br/arquivos/ids/155242/image.png', 100, 100);
// http://domain.vteximg.com.br/arquivos/ids/155242-100-100/image.png
```


### vtexHelpers.getResizeImageByRatio(src, type, newSize, aspectRatio)

Resize proportionally an VTEX image by aspect ratio

- **src**:
  - Type: `String`
  - The source of the image

- **type**:
  - Type: `String`
  - Type to resize (width or height)

- **newSize**:
  - Type: `Number`
  - New size to redimensioning

- **aspectRatio**:
  - Type: `Number`
  - Image aspect ratio (calculate by (width / height))

#### Example

```js
var imgSrc = 'http://domain.vteximg.com.br/arquivos/ids/155242-292-292/image.png';
var newSize = 250;
var aspectRatio = (10/15);

vtexHelpers.getResizeImageByRatio(imgSrc, 'width', newSize, aspectRatio);
// http://domain.vteximg.com.br/arquivos/ids/155242-250-375/image.png

vtexHelpers.getResizeImageByRatio(imgSrc, 'height', newSize, aspectRatio);
// http://domain.vteximg.com.br/arquivos/ids/155242-167-250/image.png
```


### vtexHelpers.getServerTime(callback)

Get the Vtex server time

- **callback**:
  - Type: `Function`
  - The callback to call when the request finishes. The callback will a javascript Date object.

#### Example

```js
vtexHelpers.getServerTime(function(date) {
    window.console.log(date.getFullYear());
});
```

### vtexHelpers.getCategories([categoryId[, depth]])

Get category tree

- **categoryId** (optional):
  - Type: `Integer`
  - Default: `undefined`
  - Return the specific Category

- **depth** (optional):
  - Type: `Integer`
  - Default: `50`
  - The tree depth

#### Example

```js
vtexHelpers.getCategories().then(function(res) {
    window.console.log(res)
}); // Return all categories

vtexHelpers.getCategories(1000001, 1).then(function(res) {
    window.console.log(res));
}); // Return first level from category id
```

### vtexHelpers.getProductSpec(data, specName[, defaultVal])

Get product specification

- **data**:
  - Type: `Object`
  - Vtex API data from `/api/catalog_system/pub/products/search/` endpoint

- **specName**:
  - Type: `String`
  - Specification name

- **defaultVal** (optional):
  - Type: `Boolean|String`
  - Default: `false`
  - Value to return if spec doesn't exists

#### Example

```js
// Data from API '/api/catalog_system/pub/products/search/'
var response = {
  Características: ["Cor real", "Ocasião", "Composição", "Cor"],
  Composição: ["Liga Mista, Pedra Natural Pirita"],
  Cor: ["Dourado"],
  Cor real: ["Ouro"],
  Ocasião: ["Weekend"],
  allSpecifications: ["Cor real", "Ocasião", "Composição", "Cor"],
  // More data...
};

vtexHelpers.getProductSpec(response, 'Cor'); // 'Dourado'
vtexHelpers.getProductSpec(response, 'Cores'); // false
vtexHelpers.getProductSpec(response, 'Cores', 'Branco'); // 'Branco'
```

### vtexHelpers.replaceBreakLines(str)

Replace break lines from product descriptions/more

- **str**:
  - Type: `String`
  - String to replace

#### Example

```js
var string = 'Foo\nBar\n\rBaz\r';

vtexHelpers.replaceBreakLines(string); // 'Foo<br />Bar<br /><br />Baz<br />'
```

### vtexHelpers.checkLogin()

Check if the user is logged into Vtex

#### Example

```js
vtexHelpers.checkLogin().then(function(res) {
    // If user defined
    console.log(res);
})
.fail((err) => {
    // If user isn't defined
    console.log(err)
});
```

### vtexHelpers.openPopupLogin([noReload[, url]])

Open default Vtex popup login.
Before use, don't forget to import Vtex Controller `<vtex.cmc:welcomeMessage/>`

- **noReload** (optional):
  - Type: `Boolean`
  - Default: `false`
  - Reload page after login

- **url** (optional):
  - Type: `Boolean`
  - Default: `'/'`
  - Url to rdirect

#### Example

```js
vtexHelpers.openPopupLogin(); // Open popup and reload page after success login
vtexHelpers.openPopupLogin(true); // Open popup and don't reload page after success login
vtexHelpers.openPopupLogin(false, '/account'); // Open popup and don't reload page after success login and redirect to Account page

```
#### TIP
Use `$(window).on('closed.vtexid', callback)` event to set any property if `noReload` is `true`

If `noReload` is `true`, it'll ignore `url` param

### vtexHelpers.addToCart(items[, expectedOrderFormSections[, salesChannel]])

Open default Vtex popup login.
Require `vtexjs`.

- **items**:
  - Type: `Array`
  - An Array of Objects with item(s) to add

- **expectedOrderFormSections** (optional):
  - Type: `Array`
  - Default: `null`
  - Fields to retrieve

- **salesChannel** (optional):
  - Type: `Integer/String`
  - Default: `1`
  - Sales Channel id

#### Example

```js
var items = [{
    id: 1,
    quantity: 1,
    seller: '1',
  }, {
    id: 2,
    quantity: 2,
    seller: '1',
  }];

vtexHelpers.addToCart(items).then(function(res) {
  window.console.log(res);
})
.fail(function(err) {
  window.console.log(err);
});

```

### vtexHelpers.clearCart()

Remove all items from cart.
Require `vtexjs`.

#### Example

```js
vtexHelpers.clearCart()
  .then(function(res) {
    window.console.log(res)
  })
  .fail(function(err) {
    window.console.log(err)
  });

```


## Tests

Tests are using mocha. To run the tests use:

```shell
$ npm test
```

## License

VtexUtils.js is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Dependencies

jQuery 1.8.3+

vtexjs