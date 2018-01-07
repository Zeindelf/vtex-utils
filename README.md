# VtexUtils.js

A collection of utilities methods for Vtex stores

## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [Vtex Methods](#vtex-methods)
- [Global Methods](#global-methods)
- [License](#license)
- [Dependencies](#dependencies)
- [Todo](#todo)

## Main

```text
dist/
├── vtex-utils.js        (UMD)
├── vtex-utils.min.js    (UMD, compressed)
├── vtex-utils.common.js (CommonJS, default)
└── vtex-utils.esm.js    (ES Module)
```

## Getting started

### Install

```shell
npm install vtex-utils --save
```

Include files:

```html
<script type="text/javascript" src="/arquivos/vtex-utils.min.js"></script>
```

### Usage

The package is available on `VTEX` namespace.

```js
// Instantiate class
var vtexUtils = new VTEX.VtexUtils();

// VtexHelpers
var vtexHelpers = vtexUtils.vtexHelpers;

// GlobalHelpers
var globalHelpers = vtexUtils.globalHelpers;
```

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
vtexUtils.formatPrice(1234); // R$ 12,34
vtexUtils.formatPrice(123456); // R$ 1.234,56
vtexUtils.formatPrice(123456, null, ',', 3); // R$ 1234,560
vtexUtils.formatPrice(123456, ',', '.', 2, '$ '); // $ 1,234.56
```

## Global Methods

### globalHelpers.arrayUnique(arr)

Return an array with unique values

- **arr**:
  - Type: `Array`
  - The array

#### Example

```js
globalHelpers.arrayUnique([1, 2, 2, 3, 4, 5, 5, 6]); // [1, 2, 3, 4, 5, 6]
```

## License
VtexUtils.js is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Dependencies

jQuery 1.8.3+

## Todo

- Docs
- Unit Tests
