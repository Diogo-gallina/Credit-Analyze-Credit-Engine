module.exports = {
  env: {
    es2022: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'es// tenta resolver tipos além dos arquivoslint-plugin-import-helpers', 'prettier'],
  rules: {
    'no-use-before-define': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'lines-between-class-members': 'off',
    'prettier/prettier': ['error', { singleQuote: true }],
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    radix: 'off',
    'no-underscore-dangle': 'off',
    eqeqeq: 'off',
    'prefer-const': 0,
    'no-var': 2,
    'no-unused-vars': 'off',
    'consistent-return': 'off',
    'no-await-in-loop': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'max-classes-per-file': 'off',
    'import/namespace': 'off',
    'import/no-unresolved': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-redeclare': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^\.\.\//', // imports começando com '../'
          '/^\.\//', // imports começando com './'
          '/^\.\.$/', // imports que são exatamente '..'
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
