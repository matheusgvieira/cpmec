module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'plugin:react-redux/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'jsx-a11y', 'react-hooks', 'react-redux'],
  rules: {
    'react/no-unused-state': 'off',
    'react-redux/prefer-separate-component-file': 'off',
    'react-redux/connect-prefer-named-arguments': 2,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'no-param-reassign': 'off',
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'react/jsx-props-no-spreading': 'off',
    'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
      },
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'prefer-destructuring': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        tabWidth: 2,
        semi: true,
      },
    ],
    'object-curly-newline': 'off',
    'react/jsx-curly-newline': 'off',
  },
};
