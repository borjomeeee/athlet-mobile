import {createServer} from 'miragejs';
import {ApiPaths} from 'src/Api/Paths';
import {attachPath} from 'src/Api/Utils';
import {Config} from 'src/Config';

export class FakeApiFabric {
  static createFakeApi() {
    const baseUrl = Config.defaultApiProtocol + '://' + Config.defaultApiDomain;

    return createServer({
      routes() {
        this.post(attachPath(baseUrl, ApiPaths.signIn), () => {
          return {
            isOk: true,
            data: {id: '1', email: 'test@test.com', nickname: 'borjome'},
          };
        });
      },
    });
  }
}
