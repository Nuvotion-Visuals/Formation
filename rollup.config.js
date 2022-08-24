import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'
import autoExternal from 'rollup-plugin-auto-external'
import postcss from 'rollup-plugin-postcss'

const packageJson = require('./package.json')

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        include: '**/index.dark.css',
        extract: 'css/index.dark.css'
      }),
      postcss({
        include: '**/index.light.css',
        extract: 'css/index.light.css'
      }),
      visualizer(),
      autoExternal()
    ]
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/]
  },
  {
    input: 'dist/esm/css/index.dark.css',
    output: [
      { 
        file: 'dist/index.dark.css',
        format: 'es'
      }
    ],
    plugins: [
      postcss({
        modules: true,
        extract: true
      })
    ]
  },
  {
    input: 'dist/esm/css/index.light.css',
    output: [
      { 
        file: 'dist/index.light.css',
        format: 'es'
      }
    ],
    plugins: [
      postcss({
        modules: true,
        extract: true
      })
    ]
  }
]