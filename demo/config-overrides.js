const rewire = require('ideal-rewires').default

module.exports = rewire({
  babelrc: true,
  eslintrc: true,
  stylelintrc: true,
  lessModules: true,
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