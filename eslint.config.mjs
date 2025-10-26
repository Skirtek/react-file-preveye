// eslint.config.mjs
import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
    js.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            globals: { ...globals.browser, ...globals.node },
        },
        plugins: { '@typescript-eslint': ts, react, 'react-hooks': reactHooks, prettier },
        rules: {
            ...ts.configs.recommended.rules,
            ...react.configs.recommended.rules,
            'prettier/prettier': 'error',
            'no-console': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
]
