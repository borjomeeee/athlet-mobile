import {act, renderHook} from '@testing-library/react-hooks/native';
import {FakeApiFabric} from 'fakeapi';
import {DefaultResponse} from 'fakeapi/Types';
import {RecoilRoot} from 'recoil';
import {useOfflineTrainingsRepository} from 'src/Repositories/OfflineTrainings';
import {localStorage} from 'src/Utils/MMKV';
import {useTrainingsService} from './Trainings';

afterEach(() => {
  localStorage.clearAll();
});

describe('trainings service', () => {
  describe('create training', () => {
    it('success create', async () => {
      const server = FakeApiFabric.createFakeApi('test');

      const {result: storeResult} = renderHook(
        () => ({
          trainingsService: useTrainingsService(),
          trainingsRepository: useOfflineTrainingsRepository(),
        }),
        {
          wrapper: RecoilRoot,
        },
      );

      await act(async () => {
        const trainingId = await new Promise(res =>
          storeResult.current.trainingsService.createTraining(
            {
              title: 'hello, world!',
              elements: [],
            },
            res,
          ),
        );

        const myTrainings =
          await storeResult.current.trainingsRepository.getMyTrainings();

        expect(myTrainings.length).toBe(1);
        expect(myTrainings[0].id).toBe(trainingId);
      });

      server.shutdown();
    });

    it('failed create', async () => {
      const server = FakeApiFabric.createFakeApi('test', {
        responses: {createTraining: DefaultResponse.FATAL},
      });

      const {result: storeResult} = renderHook(
        () => ({
          trainingsService: useTrainingsService(),
          trainingsRepository: useOfflineTrainingsRepository(),
        }),
        {
          wrapper: RecoilRoot,
        },
      );

      await act(async () => {
        await new Promise(res =>
          storeResult.current.trainingsService.createTraining(
            {
              title: 'hello, world!',
              elements: [],
            },
            res,
          ),
        );

        const myTrainings =
          await storeResult.current.trainingsRepository.getMyTrainings();

        expect(myTrainings.length).toBe(1);
      });

      server.shutdown();
    });
  });
});
export {};
