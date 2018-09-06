import {
  getBabelLoader
} from 'react-app-rewired'

import {
  createLoaderMatcher,
  findRule,
  addBeforeRule,
  existsInRoot,
  whitelist,
} from './utilities'

const InlineSourcePlugin = require('html-webpack-inline-source-plugin')
const WebpackPWAManifestPlugin = require('webpack-pwa-manifest')
const ImageminPlugin = require('imagemin-webpack-plugin').default

export default (options) => ({

  webpack: (config, env) => {

    const babelLoader = getBabelLoader(config.module.rules)

    if(options.babelrc && existsInRoot('.babelrc')) {
      
      if(!babelLoader)
        throw new Error('Babel config error')
      
      babelLoader.options.babelrc = true

      console.log('babelrc')
    }

    if(options.eslintrc && existsInRoot('.eslintrc')) {

      const eslintLoaderMatcher = createLoaderMatcher('eslint-loader')

      const rule = findRule(
        config.module.rules,
        eslintLoaderMatcher,
      )

      if(!rule)
        throw new Error('ESLint config error')

      delete rule.options.baseConfig
      rule.options.useEslintrc = true

      if(options.stylelintrc && existsInRoot('.stylelintrc')) {

        console.log('stylelintrc')

        const stylelintRules = {
          loader: 'stylelint-custom-processor-loader',
          options: {
            configPath: null,
            emitWarning: true,
          },
        }

        addBeforeRule(
          config.module.rules,
          eslintLoaderMatcher,
          stylelintRules
        )

      }

      console.log('eslintrc')

    }

    if(env === 'production') {

      config.plugins.forEach((plugin) => {
        if(plugin.options && plugin.options.template) {
          plugin.options.inlineSource = 'main.*.js'
        }
      })

      const manfiestPluginInstance = []
      if(options.appMeta && options.appMeta.icon) {
        manfiestPluginInstance.push(
          new WebpackPWAManifestPlugin({
            filename: 'manifest.json',
            start_url: '.',
            name: options.appMeta.name || '',
            short_name: options.appMeta.nickname || '',
            description: options.appMeta.description || '',
            background_color: options.appMeta.iconBackgroundColor || '#fff',
            theme_color: options.appMeta.themeColor || '#fff',
            crossorigin: 'anonymous',
            includeDirectory: true,
            icons: [{
              src: options.appMeta.icon,
              sizes: [ 72, 96, 128, 144, 192, 256, 384, 512 ],
            }],
            ios: true,
            inject: true,
          }),
        )
      }

      config.plugins = (config.plugins || [])
        .concat([ new InlineSourcePlugin() ])
        .concat(manfiestPluginInstance)
        .concat([
          new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
          }),
        ])

        if(options.whitelist) {
          whitelist(babelLoader, options.whitelist)
        }

    }

    return config

  },

  devServer: (configFunction) => (proxy, allowedHost) => {
    const config = configFunction(proxy, allowedHost)
    if(options.devServerHeaders) {
      config.headers = options.devServerHeaders
    }
    return config
  }

})