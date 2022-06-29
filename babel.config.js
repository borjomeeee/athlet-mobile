module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          src: './src',
          fakeapi: './fakeapi',
        },
      },
    ],
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-syntax-dynamic-import',
    'react-native-reanimated/plugin',
  ],
};
