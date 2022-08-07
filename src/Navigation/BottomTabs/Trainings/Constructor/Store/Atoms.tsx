import {atom} from 'recoil';
import {Training} from 'src/Store/Models/Training';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

import {ConstructorElement, HistoryAction, ScreenState} from './Types';

export const createKey = getKeyFabricForDomain('training constructor');

export const initialTrainingIdAtom = atom<string | undefined>({
  key: createKey('initialTrainingId'),
  default: undefined,
});
export const initialTrainingAtom = atom<Training | undefined>({
  key: createKey('initialTraining'),
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

export const historySnapshotAtom = atom<ConstructorElement[]>({
  key: createKey('historySnapshot'),
  default: [],
});
