const { injectBabelPlugin } = require('react-app-rewired')
const rewireEslint = require('./rewireEslint')
const rewireStylelint = require('./rewireStylelint')
//const rewireMdx = require('./rewireMdx')

module.exports = (config, env) => {

    // use .eslintrc
    config = rewireEslint(config, env)
    // use .stylelintrc
    config = rewireStylelint(config, env)

    // resolve src with tilda "~"
    config = injectBabelPlugin([ 'module-resolver', {
      'root': '../',
      'alias': {
        '~': './src'
      }
    }], config)
    // prevent having to import "React" – overcome magic variable pattern
    config = injectBabelPlugin('react-require', config)
    // enable use of experimental feature "decorators" (stage 2 in tc39)
    config = injectBabelPlugin('transform-decorators-legacy', config)
    // precompile idx calls into deeply-nested existence checks
    config = injectBabelPlugin('babel-plugin-idx', config)
    // we're using CSSinJS and need babel-plugin-styled-components for linting & optimization
    config = injectBabelPlugin('babel-plugin-styled-components', config)
    // inlining SVGs = faster load (to be included in create-react-app@2.0)
    config = injectBabelPlugin('inline-react-svg', config)
    // enable loading of MD and MDX files
    // config = rewireMdx(config)

    if(env === 'production') {
      // strip away console logs in productionn
      config = injectBabelPlugin('transform-remove-console', config)
    }

    return config

}