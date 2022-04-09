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
      '|react-native-reanimated' +
      '|react-native-redash' +
      '|@gorhom/bottom-sheet' +
      '|react-native-mmkv' +
      ')/)',
  ],

  setupFilesAfterEnv: [
    './jest.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],

  transform: {
    // '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
