ideal-rewires [![npm version](https://img.shields.io/npm/v/ideal-rewires.svg?style=flat)](https://www.npmjs.com/package/ideal-rewires)
=============================

> Easily impliment must-have rewires to supercharge your CRA app.

## Features
* use .babelrc
* use .eslint
* use .stylelint
* main bundle inlining
* image compression
* lighthouse-friendly manifest generation
* minification whitelisting

## Installation

```sh
# with npm
$ npm install -D ideal-rewires
```

## Usage

#### 1) Make sure you've installed the latest version of [`react-app-rewired`](https://github.com/timarney/react-app-rewired)

#### 2) Create a `config-overrides.js` file in your root director:

```js
const rewire = require('ideal-rewires').default

module.exports = rewire({
  babelrc: true,
  eslintrc: true,
  stylelintrc: true,
  appMeta: {
    name: 'ideal rewires demo',
    nickname: 'demo',
    description: 'testing out ideal rewires',
    icon: './src/assets/images/icon.png',
    iconBackgroundColor: '#fff',
    themeColor: '#fff',
  },
  devServerHeaders: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization',
  },
  whitelist: [
    'bitcoinjs-lib',
    'tiny-secp256k1/ecurve',
    'base64url/dist/base64url',
    'base64url/dist/pad-string',
    'bip32',
  ].map(module => `node_modules/${module}`),
})
```

#### 3) Configure `.eslintrc` and `.stylelintrc`:

ESLint & Stylelint dependencies (can use your own if you'd like... but these are the ones I use):

```sh
# with yarn:
$ yarn add -D eslint-config-react-app eslint-plugin-react stylelint-config-recommended stylelint-config-styled-components stylelint-processor-styled-components
```

Let's create the `.eslintrc` and `.stylelintrc` files in our project root:

`.eslintrc`:

```json
{
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
    "node": true
  },
  "extends": [
    "react-app"
  ],
  "plugins": [
    "react"
  ],
  "rules": {
    "react/no-children-prop": 0,
    "react/prop-types": 0,
    "no-console": 0,
    "react/jsx-key": 0,
    "react/display-name": 0,
    "jsx-a11y/anchor-has-content": 0,
    "react/react-in-jsx-scope": 0
  }
}
```

`.stylelintrc`:

```json
{
  "processors": [
    "stylelint-processor-styled-components"
  ],
  "extends": [
    "stylelint-config-recommended",
    "stylelint-config-styled-components"
  ]
}
```


#### 4) If you want a slightly different config, fork this repository and work off of that 👍

#### 5) Start building 🎉



###### This library has been released under the [MIT license](https://mit-license.org/)