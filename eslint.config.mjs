import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import jest from 'eslint-plugin-jest'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'package-lock.json',
      '*.min.js',
      'coverage/',
      'build/',
      'public/',
      '*.md',
      '.vscode/',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescript,
      jest,
      prettier,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
