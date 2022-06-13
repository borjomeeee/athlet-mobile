import {MMKV} from 'react-native-mmkv';
import {StorageDataNotFound} from './Exceptions';

export const localAuthStorage = new MMKV({
  id: 'athlet.auth',
  encryptionKey: 'debug',
});

export const localStorage = new MMKV({id: 'athlet.common'});

export const getAsJsonFromLocal = <T,>(key: string): T => {
  const data = localStorage.getString(key);
  if (data) {
    return JSON.parse(data) as T;
  }

  throw new StorageDataNotFound(key);
};

export const setJsonToLocal = (key: string, data: object) => {
  localStorage.set(key, JSON.stringify(data));
};
