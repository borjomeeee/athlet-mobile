import {JwtTokenNotFoundError} from 'src/Utils/Exceptions';
import {localAuthStorage} from 'src/Utils/MMKV';

export class LocalStorage {
  static _jwtStorageName = 'authCredentials';

  static getJwt() {
    const jwt = localAuthStorage.getString(LocalStorage._jwtStorageName);
    if (!jwt) {
      throw new JwtTokenNotFoundError();
    }

    return jwt;
  }

  static saveJwt(jwtToken: string) {
    localAuthStorage.set(LocalStorage._jwtStorageName, jwtToken);
  }
  static deleteJwt() {
    localAuthStorage.delete(LocalStorage._jwtStorageName);
  }
}
