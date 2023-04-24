module.exports = {
  root: true,
  env: {
    es2022: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended', // https://eslint.org/docs/rules/
    'plugin:import/recommended', // https://github.com/import-js/eslint-plugin-import
    'plugin:jest/recommended', // https://www.npmjs.com/package/eslint-plugin-jest
    'plugin:jest/style', // https://www.npmjs.com/package/eslint-plugin-jest
    'plugin:prettier/recommended', // https://github.com/prettier/eslint-plugin-prettier
  ],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  rules: {
    'import/no-commonjs': 'warn',
    'import/extensions': ['error', 'ignorePackages'],
    'no-console': 'warn',
    'no-plusplus': 'off',
  },
};
