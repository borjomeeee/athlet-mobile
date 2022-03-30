module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',

        quotes: ['error', 'single', {allowTemplateLiterals: true}],
        'react-hooks/exhaustive-deps': [
          'error',
          {
            additionalHooks: '(useFlow)',
          },
        ],
      },
    },
  ],
};
