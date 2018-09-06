import { getBabelLoader } from 'react-app-rewired';

var fs = require('fs');

var path = require('path');

var rootPath = fs.realpathSync(process.cwd());
var existsInRoot = function existsInRoot(name) {
  return fs.existsSync(path.join(rootPath, name));
};
var ruleChildren = function ruleChildren(loader) {
  return loader.use || loader.oneOf || Array.isArray(loader.loader) && loader.loader || [];
};
var findIndexAndRules = function findIndexAndRules(rulesSource, ruleMatcher) {
  var rules = Array.isArray(rulesSource) ? rulesSource : ruleChildren(rulesSource);
  var result;
  rules.some(function (rule, index) {
    result = ruleMatcher(rule) ? {
      index: index,
      rules: rules
    } : findIndexAndRules(ruleChildren(rule), ruleMatcher);
    return result;
  });
  return result;
};
var findRule = function findRule(rulesSource, ruleMatcher) {
  var _findIndexAndRules = findIndexAndRules(rulesSource, ruleMatcher),
      index = _findIndexAndRules.index,
      rules = _findIndexAndRules.rules;

  return rules[index];
};
var createLoaderMatcher = function createLoaderMatcher(loader) {
  return function (rule) {
    return rule.loader && rule.loader.indexOf("/" + loader + "/") !== -1;
  };
};
var addBeforeRule = function addBeforeRule(rulesSource, ruleMatcher, value) {
  var _findIndexAndRules3 = findIndexAndRules(rulesSource, ruleMatcher),
      index = _findIndexAndRules3.index,
      rules = _findIndexAndRules3.rules;

  rules.splice(index, 0, value);
};
var whitelist = function whitelist(babelLoader, modules) {
  var includeConfig = function (source) {
    if (!source) return [];
    return Array.isArray(source) ? source : [source];
  }(babelLoader.include);

  babelLoader.include = modules.map(function (name) {
    return rootPath + "/" + name;
  }).reduce(function (accumulator, include) {
    if (Array.isArray(include)) {
      return accumulator.concat(include);
    }

    accumulator.push(include);
    return accumulator;
  }, includeConfig);
};

var InlineSourcePlugin = require('html-webpack-inline-source-plugin');

var WebpackPWAManifestPlugin = require('webpack-pwa-manifest');

var ImageminPlugin = require('imagemin-webpack-plugin').default;

var index = (function (options) {
  return {
    webpack: function webpack(config, env) {
      var babelLoader = getBabelLoader(config.module.rules);

      if (options.babelrc && existsInRoot('.babelrc')) {
        if (!babelLoader) throw new Error('Babel config error');
        babelLoader.options.babelrc = true;
        console.log('babelrc');
      }

      if (options.eslintrc && existsInRoot('.eslintrc')) {
        var eslintLoaderMatcher = createLoaderMatcher('eslint-loader');
        var rule = findRule(config.module.rules, eslintLoaderMatcher);
        if (!rule) throw new Error('ESLint config error');
        delete rule.options.baseConfig;
        rule.options.useEslintrc = true;

        if (options.stylelintrc && existsInRoot('.stylelintrc')) {
          console.log('stylelintrc');
          var stylelintRules = {
            loader: 'stylelint-custom-processor-loader',
            options: {
              configPath: null,
              emitWarning: true
            }
          };
          addBeforeRule(config.module.rules, eslintLoaderMatcher, stylelintRules);
        }

        console.log('eslintrc');
      }

      if (env === 'production') {
        config.plugins.forEach(function (plugin) {
          if (plugin.options && plugin.options.template) {
            plugin.options.inlineSource = 'main.*.js';
          }
        });
        var manfiestPluginInstance = [];

        if (options.appMeta && options.appMeta.icon) {
          manfiestPluginInstance.push(new WebpackPWAManifestPlugin({
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
              sizes: [72, 96, 128, 144, 192, 256, 384, 512]
            }],
            ios: true,
            inject: true
          }));
        }

        config.plugins = (config.plugins || []).concat([new InlineSourcePlugin()]).concat(manfiestPluginInstance).concat([new ImageminPlugin({
          test: /\.(jpe?g|png|gif|svg)$/i
        })]);

        if (options.whitelist) {
          whitelist(babelLoader, options.whitelist);
        }
      }

      return config;
    },
    devServer: function devServer(configFunction) {
      return function (proxy, allowedHost) {
        var config = configFunction(proxy, allowedHost);

        if (options.devServerHeaders) {
          config.headers = options.devServerHeaders;
        }

        return config;
      };
    }
  };
});

export default index;
