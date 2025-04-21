import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint,
      prettier: require('eslint-plugin-prettier'),
      'simple-import-sort': require('eslint-plugin-simple-import-sort'),
      import: require('eslint-plugin-import'),
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': ['warn'],
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': ['warn'],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports.
            ['^\\u0000'],
            // Packages `react` related packages come next.
            ['^react', '^@?\\w'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],
            // lib imports
            ['^(@|lib)(/.*|$)'],
            // Database imports.
            ['^(@|database)(/.*|$)'],
            // Hooks imports.
            ['^(@|hooks)(/.*|$)'],
            // Utils imports.
            ['^(@|utils)(/.*|$)'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/newline-after-import': [
        'error',
        {
          count: 1,
        },
      ],
      'import/no-duplicates': 'error',
      'lines-around-directive': ['error', 'always'],
      'lines-around-comment': [
        'error',
        {
          beforeLineComment: false,
          beforeBlockComment: true,
          allowBlockStart: true,
          allowClassStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
        },
      ],
      'newline-before-return': 'error',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: ['*'],
          next: ['multiline-const', 'multiline-let', 'multiline-var'],
        },
      ],
    },
  },
);
