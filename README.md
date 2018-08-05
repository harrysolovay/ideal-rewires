ideal-rewires [![npm version](https://img.shields.io/npm/v/ideal-rewires.svg?style=flat)](https://www.npmjs.com/package/ideal-rewires)
=============================

> Easily impliment a collection of react-app-rewires to supercharge your CRA app.

## Features
* custom [ESLint](https://eslint.org) & [Stylelint](https://stylelint.io)
* [SVG inlining](https://github.com/airbnb/babel-plugin-inline-react-svg)
* [module resolution](https://github.com/tleunen/babel-plugin-module-resolver) ("~" resolves to "root/src")
* [removes need to import React](https://github.com/vslinko/babel-plugin-react-require) ("magic variable") –– compiler automatically includes the import in files that contain JSX
* [babel-plugin-styled-components](https://github.com/styled-components/babel-plugin-styled-components) (incase you're using [styled-components](https://github.com/styled-components/styled-components))
* [tc39 stage-2 decorators](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) ([proposal](https://github.com/tc39/proposal-decorators))
* [babel-plugin-idx](https://github.com/facebookincubator/idx#readme)
* [removes console logs, warns and errors](https://github.com/babel/minify/tree/master/packages/babel-plugin-transform-remove-console) in production

## Installation

```sh
# with yarn:
$ yarn add -D ideal-rewires
# with npm
$ npm install -D ideal-rewires
```

## Usage

#### 1) Go into your `package.json` and add the following:
```json
"config-overrides-path": "node_modules/ideal-rewires"
```

#### 2) Configure `.eslintrc` and `.stylelintrc`:

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


#### 3) If you want a slightly different config, fork this repository and work off of that 👍

#### 4) Start building 🎉



###### This library has been released under the [MIT license](https://mit-license.org/)