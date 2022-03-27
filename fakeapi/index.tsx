import {createServer, Response} from 'miragejs';
import {ApiPaths} from 'src/Api/Paths';
import {attachPath} from 'src/Api/Utils';
import {Config} from 'src/Config';
import {account, training} from './Data';
import {DefaultResponse, IFakeApiConfig} from './Types';

export class FakeApiFabric {
  static createFakeApi() {
    const config: IFakeApiConfig = {
      responses: {
        checkAuth: DefaultResponse.AUTH_ERROR,
      },
    };
    const baseUrl = Config.defaultApiProtocol + '://' + Config.defaultApiDomain;

    return createServer({
      routes() {
        this.post(attachPath(baseUrl, ApiPaths.signIn), () => {
          const {signIn} = config.responses;
          return makeResponse(signIn, account, {Authorization: ''});
        });

        this.post(attachPath(baseUrl, ApiPaths.signUp), () => {
          const {signUp} = config.responses;
          return makeResponse(signUp, account);
        });

        this.post(attachPath(baseUrl, ApiPaths.checkNickname), () => {
          const {checkNickname} = config.responses;
          return makeResponse(checkNickname);
        });

        this.get(attachPath(baseUrl, ApiPaths.checkAuth), () => {
          const {checkAuth} = config.responses;
          return makeResponse(checkAuth, account);
        });

        this.get(attachPath(baseUrl, ApiPaths.getMyTrainings), () => {
          const {getMyTrainings} = config.responses;
          return makeResponse(getMyTrainings, [training]);
        });
      },
    });
  }
}

function makeResponse(
  response: string | undefined,
  dataIfSuccess?: object,
  headers?: Record<string, string>,
) {
  if (response === undefined) {
    return makeGoodResponse(dataIfSuccess, {
      ...headers,
      Authorization: 'Bearer validJWTtoken',
    });
  }

  if (response === DefaultResponse.FATAL) {
    return new Response(500);
  } else if (response === DefaultResponse.AUTH_ERROR) {
    return new Response(401, undefined, {isOk: false, reason: response});
  } else if (response === DefaultResponse.SUCCESS) {
    return makeGoodResponse(dataIfSuccess, headers);
  } else if (response === DefaultResponse.BAD_AUTH_TOKEN) {
    return makeGoodResponse(dataIfSuccess, {
      Authorization: 'some not valid token',
    });
  } else if (response === DefaultResponse.EMPTY_AUTH_TOKEN) {
    return makeGoodResponse(dataIfSuccess);
  }

  return makeBadResponse(response);
}

function makeBadResponse(reason: string) {
  return new Response(400, undefined, {isOk: false, reason});
}

function makeGoodResponse(data?: object, headers?: Record<string, string>) {
  return new Response(200, headers, {isOk: true, data});
}
