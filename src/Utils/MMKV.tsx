import {MMKV} from 'react-native-mmkv';

export const localAuthStorage = new MMKV({
  id: 'athlet.auth',
  encryptionKey: 'debug',
});

export const localStorage = new MMKV({id: 'athlet.common'});
