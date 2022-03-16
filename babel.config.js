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
    '@babel/plugin-syntax-dynamic-import',
  ],
};
