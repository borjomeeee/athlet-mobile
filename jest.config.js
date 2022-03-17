module.exports = {
  coverageDirectory: 'coverage',
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?@?react-native' +
      '|@react-native-community' +
      '|@react-navigation' +
      '|recoil' +
      '|@borjomeeee/rn-styles' +
      '|react-native-safe-area-context' +
      ')/)',
  ],

  setupFilesAfterEnv: ['./jest.setup.js'],
};
