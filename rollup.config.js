import pkg from './package.json'
import babel from 'rollup-plugin-babel'

export default {

  input: 'src/index.js',

  output: [{
    file: pkg.main,
    format: 'cjs',
    exports: 'named',
  }, {
    file: pkg.module,
    format: 'esm',
    exports: 'named'
  }],

  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],

  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],

}