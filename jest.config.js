module.exports = {
  coverageDirectory: 'coverage',
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [],

  setupFilesAfterEnv: ['./jest.setup.js'],
};
