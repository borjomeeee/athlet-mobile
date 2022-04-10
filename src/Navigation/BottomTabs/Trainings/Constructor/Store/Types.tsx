import {ExerciseElement, SetElement} from 'src/Store/Models/Training';

export type ExerciseWithId = ExerciseElement & {elementId: string};
export type SetExerciseWithId = ExerciseWithId & {setId: string};
export type SetWithId = Omit<SetElement, 'elements'> & {
  elementId: string;
  elements: SetExerciseWithId[];
};
export type ConstructorElement = SetWithId | ExerciseWithId;

export enum HistoryActionType {
  ADD_EXERCISE = 'add-exercise',
  REMOVE_EXERCISE = 'remove-exercise',
  REPLACE_EXERCISE = 'replace-exercise',

  ADD_SET = 'add-set',
  REMOVE_SET = 'remove-set',
  REPLACE_SET = 'replace-set',

  SWAP_WITH_PREV = 'swap-with-prev',
  SWAP_WITH_NEXT = 'swap-with-next',

  REORDER = 'reorder',
}

export type HistoryActionPayload = {
  [HistoryActionType.ADD_EXERCISE]: {exercise: ExerciseWithId};
  [HistoryActionType.REMOVE_EXERCISE]: {id: string};

  [HistoryActionType.ADD_SET]: {set: SetWithId};
  [HistoryActionType.REMOVE_SET]: {id: string};

  [HistoryActionType.REPLACE_EXERCISE]: {
    id: string;
    exercise: ExerciseWithId;
  };
  [HistoryActionType.REPLACE_SET]: {
    id: string;
    set: SetWithId;
  };
  [HistoryActionType.REORDER]: {ids: string[]};

  [HistoryActionType.SWAP_WITH_PREV]: {id: string};
  [HistoryActionType.SWAP_WITH_NEXT]: {id: string};
};

export interface HistoryAction<T extends HistoryActionType> {
  type: T;
  payload: HistoryActionPayload[T];
}
