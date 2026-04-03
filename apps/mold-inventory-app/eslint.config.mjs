// eslint.config.mjs
import globals from "globals";
import { globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import next from '@next/eslint-plugin-next'
import prettier from 'eslint-config-prettier'

const eslintConfig = [
  // Node/CommonJS globals
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },
  },

  // JavaScript rules
  js.configs.recommended,
  // Next.js rules
  next.configs.recommended,
  // Turn off rules that might conflict with Prettier (must be last)
  prettier,
  
  // Override default ignores of @next/eslint-plugin-next.
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
