import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/build/',
      '**/.next/**',
      '**/out/**',
      '**/next-env.d.ts'
    ]
  },

  // Global JS recommended
  js.configs.recommended,

  // TypeScript recommended (global)
  ...tseslint.configs.recommended,

  // React hooks (global, for all files)
  {
    plugins: {
      'react-hooks': reactHooks
    },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules
    }
  },

  /* ── Server config ── */
  {
    files: ['server/**/*.{js,ts}'],
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      'no-console': 'off',
      'no-empty-function': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  },

  /* ── Web / Next.js config (scoped to web folder only) ── */
  {
    files: ['web/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'react-refresh': reactRefresh
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      'no-console': 'off',
      'no-empty-function': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-refresh/only-export-components': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
