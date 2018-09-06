const fs = require('fs')
const path = require('path')

export const rootPath = fs.realpathSync(process.cwd())

export const existsInRoot = (name) => (
  fs.existsSync(
    path.join(
      rootPath,
      name
    )
  )
)

export const ruleChildren = (loader) => {
  return loader.use || loader.oneOf || (Array.isArray(loader.loader) && loader.loader) || []
}

export const findIndexAndRules = (rulesSource, ruleMatcher) => {
  const rules = Array.isArray(rulesSource)
    ? rulesSource
    : ruleChildren(rulesSource)
  let result
  rules.some((rule, index) => {
    result = ruleMatcher(rule)
      ? { index, rules }
      : findIndexAndRules(ruleChildren(rule), ruleMatcher)
    return result
  })
  return result
}

export const findRule = (rulesSource, ruleMatcher) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher)
  return rules[index]
}

export const createLoaderMatcher = (loader) => {
  return (rule) => rule.loader && rule.loader.indexOf(`/${loader}/`) !== -1
}

export const addAfterRule = (rulesSource, ruleMatcher, value) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher)
  rules.splice(index + 1, 0, value)
}

export const addBeforeRule = (rulesSource, ruleMatcher, value) => {
  const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher)
  rules.splice(index, 0, value)
}

export const findPluginIndex = (plugins, nameMatcher) => {
  const pluginIndex = plugins.findIndex((plugin) => {
    return plugin.constructor && plugin.constructor.name && nameMatcher(plugin.constructor.name)
  })
  return pluginIndex
}

export const whitelist = (babelLoader, modules) => {
  
  const includeConfig = ((source) => {
    if (!source) return []
    return Array.isArray(source)
      ? source
      : [source]
  })(babelLoader.include)

  babelLoader.include = modules
    .map(name => `${ rootPath }/${name}`)
    .reduce((accumulator, include) => {
      if(Array.isArray(include)) {
        return accumulator.concat(include)
      }
      accumulator.push(include)
      return accumulator
    }, includeConfig)

}