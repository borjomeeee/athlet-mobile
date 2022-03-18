import {createServer, Response} from 'miragejs';
import {ApiPaths} from 'src/Api/Paths';
import {attachPath} from 'src/Api/Utils';
import {Config} from 'src/Config';
import {account} from './Data';
import {DefaultResponse, IFakeApiConfig} from './Types';

export class FakeApiFabric {
  static createFakeApi() {
    const config: IFakeApiConfig = {
      responses: {},
    };
    const baseUrl = Config.defaultApiProtocol + '://' + Config.defaultApiDomain;

    return createServer({
      routes() {
        this.post(attachPath(baseUrl, ApiPaths.signIn), () => {
          const {signIn} = config.responses;
          return makeResponse(signIn, account);
        });
      },
    });
  }
}

function makeResponse(response: string | undefined, dataIfSuccess?: object) {
  if (response === undefined) {
    return makeGoodResponse(dataIfSuccess);
  }

  if (response === DefaultResponse.FATAL) {
    return new Response(500);
  } else if (response === DefaultResponse.AUTH_ERROR) {
    return new Response(401, undefined, {isOk: false, reason: response});
  } else if (response === DefaultResponse.SUCCESS) {
    return makeGoodResponse(dataIfSuccess);
  }

  return makeBadResponse(response);
}

function makeBadResponse(reason: string) {
  return new Response(400, undefined, {isOk: false, reason});
}

function makeGoodResponse(data?: object) {
  return new Response(200, undefined, {isOk: true, data});
}
