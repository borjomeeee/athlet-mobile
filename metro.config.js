import {getDefaultConfig, mergeConfig} from '@react-native/metro-config';

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *	 *
 * @format	 * @type {import('metro-config').MetroConfig}
 */

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
