// eslint.config.mjs
import { globalIgnores } from 'eslint/config'
import js from '@eslint/js'
// import next from 'eslint-config-next'
import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier'

const eslintConfig = [
  js.configs.recommended,
  ...nextVitals,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    '.next/**',
    '.open-next/**',
    '.wrangler/**',
    'node_modules/**',
    'next-env.d.ts',
    'worker-configuration.d.ts',
  ]),
]

export default eslintConfig
