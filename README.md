ideal-rewires [![npm version](https://img.shields.io/npm/v/ideal-rewires.svg?style=flat)](https://www.npmjs.com/package/ideal-rewires)
=============================

> easily impliment must-have rewires to supercharge your CRA-based project

## Features
* customize via
	* `.babelrc`
	* `.eslintrc`
	* `.stylelintrc`
* inlining of your main bundle (code-splitting friendly)
* standard image compression
* lighthouse-oriented manifest generation
* whitelist un-precompiled libs (avoid [nasty minification errors](https://github.com/facebook/create-react-app/issues/3734))

## Installation

```sh
# with npm
$ npm install -D ideal-rewires
```

## Usage

#### Make sure you've also installed the latest version of [`react-app-rewired`](https://github.com/timarney/react-app-rewired)

#### Create a `config-overrides.js` file in your root director:

```js
const rewire = require('ideal-rewires').default

// in this instance, all we want is to use a `.babelrc` file
const options = { babelrc: true }
module.exports = rewire(options)
```

## All Options

#### `options`
The object that you pass to rewire()

##### `options.babelrc`
Whether to look for & (if present) use a `.babelrc` file

##### `options.eslintrc`
Whether to look for & (if present) use a `.eslintrc` file

##### `options.stylelintrc`
Whether to look for & (if present) use a `.stylelintrc` file

##### `options.appMeta`
Used to generate the `manifest.json` on build

###### `options.appMeta.name`

###### `options.appMeta.nickname`

###### `options.appMeta.description`

###### `options.appMeta.icon` (url of 512 x 512 icon asset)

###### `options.appMeta.iconBackgroundColor`

###### `options.appMeta.themeColor`

##### `options.devServerHeaders`
Customize dev server headers (for instance, if you use an authentication API that requests your app's manifest)

##### `options.whitelist`
Whitelist un-precompiled libraries for compilation and avoid the following error (documented [here](https://github.com/facebook/create-react-app/issues/3734)):

```sh
Failed to minify the code from this file
```

This can be particularly helpful if you're directly or indirectly using the bitcoinjs-lib. Here's an example of this option's usage:

`config-overrides.js`

```js
const rewire = require('ideal-rewires').default

module.exports = rewire({
  whitelist: [
    'bitcoinjs-lib',
    'tiny-secp256k1/ecurve',
    'base64url/dist/base64url',
    'base64url/dist/pad-string',
    'bip32',
  ].map(module => `node_modules/${module}`),
})
```

#### If you want a slightly different config, fork this repository and work off of that 👍 🎉

###### This library has been released under the [MIT license](https://mit-license.org/)