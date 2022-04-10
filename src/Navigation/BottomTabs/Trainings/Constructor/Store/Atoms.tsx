import {atom} from 'recoil';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

import {HistoryAction, ScreenState} from './Types';

export const createKey = getKeyFabricForDomain('training constructor');

export const trainingIdAtom = atom<string | undefined>({
  key: createKey('trainingId'),
  default: undefined,
});

export const screenStateAtom = atom({
  key: createKey('state'),
  default: ScreenState.EDITING,
});

export const screenTrainingTitleAtom = atom({
  key: createKey('screenTrainingTitle'),
  default: 'Новая тренировка',
});

export const actionHistoryAtom = atom<HistoryAction<any>[]>({
  key: createKey('history'),
  default: [],
});
