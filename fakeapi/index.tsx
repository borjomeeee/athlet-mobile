import {createServer, Response} from 'miragejs';
import {ApiPaths} from 'src/Api/Paths';
import {attachPath} from 'src/Api/Utils';
import {Config} from 'src/Config';
import {CreatingTraining, Training} from 'src/Store/Models/Training';
import {Id} from 'src/Utils/Id';
import {account, exercises, training} from './Data';
import {DefaultResponse, IFakeApiConfig} from './Types';

export class FakeApiFabric {
  static createFakeApi(
    env = 'development',
    config: IFakeApiConfig = {responses: {}},
  ) {
    const baseUrl = Config.defaultApiProtocol + '://' + Config.defaultApiDomain;

    return createServer({
      environment: env,

      seeds(server) {
        server.db.loadData({
          trainings: [training],
        });
      },

      routes() {
        // Auth
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

        // Trainings
        this.get(attachPath(baseUrl, ApiPaths.getMyTrainings), schema => {
          const {getMyTrainings} = config.responses;
          return makeResponse(getMyTrainings, schema.db.trainings);
        });

        this.get(attachPath(baseUrl, ApiPaths.getExercises), () => {
          const {getExercises} = config.responses;
          return makeResponse(getExercises, exercises);
        });

        this.post(
          attachPath(baseUrl, ApiPaths.createTraining),
          (schema, request) => {
            const {createTraining} = config.responses;

            const data: CreatingTraining = JSON.parse(request.requestBody);

            const newTraining: Training = {
              ...data,

              createdAt: Date.now(),
              updatedAt: Date.now(),

              id: Id.generate(),

              author: {
                id: account.id,
                nickname: account.nickname || 'Undefined',
              },
            };

            // schema.db.trainings.insert(newTraining);
            return makeResponse(createTraining, newTraining);
          },
        );

        // get training
        this.get(
          attachPath(baseUrl, ApiPaths.trainingAction(':id')),
          (schema, request) => {
            const {updateTraining} = config.responses;

            const {id} = request.params;

            // eslint-disable-next-line @typescript-eslint/no-shadow
            const training = schema.db.trainings.find(id);
            if (training) {
              return makeResponse(updateTraining, training);
            }

            return makeBadResponse(DefaultResponse.NOT_FOUND);
          },
        );

        // update training
        this.post(
          attachPath(baseUrl, ApiPaths.trainingAction(':id')),
          (schema, request) => {
            const {updateTraining} = config.responses;

            const {id} = request.params;
            const data: CreatingTraining = JSON.parse(request.requestBody);

            // eslint-disable-next-line @typescript-eslint/no-shadow
            const training = schema.db.trainings.find(id);
            if (training) {
              const newTraining = {...training, ...data};
              schema.db.trainings.update(+id, newTraining);

              return makeResponse(updateTraining, newTraining);
            }

            return makeBadResponse(DefaultResponse.NOT_FOUND);
          },
        );

        // delete training
        this.delete(
          attachPath(baseUrl, ApiPaths.trainingAction(':id')),
          (schema, request) => {
            const {updateTraining} = config.responses;

            const {id} = request.params;

            // eslint-disable-next-line @typescript-eslint/no-shadow
            schema.db.trainings.remove(id);
            return makeResponse(updateTraining);
          },
        );
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
