import React from 'react';
import {
  atom,
  selector,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {ElementType, Training} from 'src/Store/Models/Training';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {myTrainingsStore} from 'src/Store/Trainings';
import {Id} from 'src/Utils/Id';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {ScreenState} from '../Types';
import {isSetFooter, isSetHeader, parseSetHeaderId} from '../Utils';
import {
  ConstructorElement,
  ExerciseWithId,
  HistoryAction,
  HistoryActionType,
  SetExerciseWithId,
  SetWithId,
} from './Types';

const createKey = getKeyFabricForDomain('training constructor');

export const trainingIdStore = atom<string | undefined>({
  key: createKey('trainingId'),
  default: undefined,
});

export const trainingStore = selector({
  key: createKey('training'),
  get: ({get}) => {
    const trainingId = get(trainingIdStore);

    if (!trainingId) {
      return;
    }

    const myTrainings = get(myTrainingsStore);
    return myTrainings[trainingId] as Training | undefined;
  },
});

export const initialTrainingTitleStore = selector({
  key: createKey('training title'),
  get: ({get}) => get(trainingStore)?.title || '',
});

export const initialTrainingElementsStore = selector({
  key: createKey('training elements'),
  get: ({get}) => {
    const training = get(trainingStore);
    return training ? getElementsFromTraining(training) : [];
  },
});

export const screenStateStore = atom({
  key: createKey('state'),
  default: ScreenState.EDITING,
});

export const isEditingSelector = selector({
  key: createKey('isEditing'),
  get: ({get}) => get(screenStateStore) === ScreenState.EDITING,
});

export const isCreatingSelector = selector({
  key: createKey('isCreating'),
  get: ({get}) => !get(trainingIdStore),
});

export const screenTrainingTitleStore = atom({
  key: createKey('screenTrainingTitle'),
  default: '',
});

export const actionHistoryStore = atom<HistoryAction<any>[]>({
  key: createKey('history'),
  default: [],
});

export const constructorElementsSelector = selector({
  key: createKey('constructor elements'),
  get: ({get}) => {
    let elements = get(initialTrainingElementsStore);

    // Apply history
    const actionHistory = get(actionHistoryStore);
    for (const action of actionHistory) {
      switch (action.type) {
        case HistoryActionType.ADD_EXERCISE:
          elements.push(action.payload.exercise);
          break;
        case HistoryActionType.REMOVE_EXERCISE:
          elements = elements
            .map(element => {
              if (element.type === ElementType.SET) {
                return {
                  ...element,
                  elements: element.elements.filter(
                    exercise => exercise.elementId !== action.payload.id,
                  ),
                };
              }
              return element;
            })
            .filter(
              element =>
                element.type === ElementType.EXERCISE &&
                element.elementId !== action.payload.id,
            );
          break;

        case HistoryActionType.ADD_SET:
          elements.push(action.payload.set);
          break;
        case HistoryActionType.REMOVE_SET:
          elements = elements.filter(
            element => element.elementId !== action.payload.id,
          );
          break;

        case HistoryActionType.REPLACE_EXERCISE:
          elements = elements.map(element =>
            element.elementId === action.payload.id
              ? action.payload.exercise
              : element.type === ElementType.SET
              ? {
                  ...element,
                  elements: element.elements.map(exercise =>
                    exercise.elementId === action.payload.id
                      ? action.payload.exercise
                      : exercise,
                  ),
                }
              : element,
          );
          break;
        case HistoryActionType.REPLACE_SET:
          elements = elements.map(element =>
            element.elementId === action.payload.id
              ? action.payload.set
              : element,
          );
          break;

        case HistoryActionType.SWAP_WITH_PREV:
          const elemIndexForPrev = elements.findIndex(
            element => element.elementId === action.payload.id,
          );

          if (elemIndexForPrev < 1) {
            break;
          }

          const currentElementForPrev = elements[elemIndexForPrev];
          const prevElement = elements[elemIndexForPrev - 1];

          elements[elemIndexForPrev] = prevElement;
          elements[elemIndexForPrev - 1] = currentElementForPrev;
          break;
        case HistoryActionType.SWAP_WITH_NEXT:
          const elementIndex = elements.findIndex(
            element => element.elementId === action.payload.id,
          );

          if (elementIndex >= elements.length - 1 || elementIndex === -1) {
            break;
          }

          const currentElement = elements[elementIndex];
          const nextElement = elements[elementIndex + 1];

          elements[elementIndex] = nextElement;
          elements[elementIndex + 1] = currentElement;

          break;

        case HistoryActionType.REORDER:
          const elementsById = _getElementsById(elements);

          const newElementsStore: ConstructorElement[] = [];
          const ids = action.payload.ids;

          let index = 0;
          let currentSet: SetWithId | undefined;

          while (index !== ids.length) {
            const id = ids[index];
            if (isSetHeader(id)) {
              const set = elementsById[parseSetHeaderId(id)] as
                | SetWithId
                | undefined;

              if (set) {
                currentSet = {...set, elements: []};
                newElementsStore.push(currentSet);
              }

              index++;
              continue;
            }

            if (isSetFooter(id)) {
              currentSet = undefined;

              index++;
              continue;
            }

            if (elementsById[id]) {
              if (currentSet) {
                currentSet.elements.push({
                  ...elementsById[id],
                  setId: currentSet.elementId,
                } as SetExerciseWithId);
              } else {
                newElementsStore.push(elementsById[id]);
              }
            }

            index++;
          }

          elements = newElementsStore;
          break;
      }
    }

    return elements;
  },
});

export const useTrainingConstructorStore = () => {
  const setTitle = useSetRecoilState(screenTrainingTitleStore);

  const setTrainingId = useSetRecoilState(trainingIdStore);
  const setScreenState = useSetRecoilState(screenStateStore);

  const resetTitle = useResetRecoilState(screenTrainingTitleStore);
  const resetTrainingId = useResetRecoilState(trainingIdStore);
  const resetScreenState = useResetRecoilState(screenStateStore);

  const resetHistory = useResetRecoilState(actionHistoryStore);

  const setTitleHandler = React.useCallback(
    (text: string) => {
      setTitle(text.trim());
    },
    [setTitle],
  );

  return {
    setTitle: setTitleHandler,

    resetTitle,
    resetTrainingId,
    resetScreenState,
    resetHistory,

    setTrainingId,
    setScreenState,
  };
};

export const useTrainingConstructorStoreNew = () => {
  const setActionHistory = useSetRecoilState(actionHistoryStore);

  const addToHistory = React.useCallback(
    <T extends HistoryActionType>(action: HistoryAction<T>) => {
      setActionHistory(history => [...history, action]);
    },
    [setActionHistory],
  );

  const addExercise = React.useCallback(
    (exercise: Omit<ExerciseWithId, 'elementId'>) => {
      addToHistory({
        type: HistoryActionType.ADD_EXERCISE,
        payload: {
          exercise: {...exercise, elementId: Id.generate()} as ExerciseWithId,
        },
      });
    },
    [addToHistory],
  );

  const removeExercise = React.useCallback(
    (id: string) => {
      addToHistory({type: HistoryActionType.REMOVE_EXERCISE, payload: {id}});
    },
    [addToHistory],
  );

  const addSet = React.useCallback(() => {
    addToHistory({
      type: HistoryActionType.ADD_SET,
      payload: {
        set: {
          elementId: Id.generate(),
          type: ElementType.SET,
          title: 'Hello, world!',
          elements: [],
          restAfterComplete: 10,
        },
      },
    });
  }, [addToHistory]);

  const removeSet = React.useCallback(
    (id: string) => {
      addToHistory({type: HistoryActionType.REMOVE_SET, payload: {id}});
    },
    [addToHistory],
  );

  const replaceExercise = React.useCallback(
    (id: string, exercise: ExerciseWithId) => {
      addToHistory({
        type: HistoryActionType.REPLACE_EXERCISE,
        payload: {id, exercise},
      });
    },
    [addToHistory],
  );

  const replaceSet = React.useCallback(
    (id: string, set: SetWithId) => {
      addToHistory({
        type: HistoryActionType.REPLACE_SET,
        payload: {id, set},
      });
    },
    [addToHistory],
  );

  const reorder = React.useCallback(
    (ids: string[]) => {
      addToHistory({type: HistoryActionType.REORDER, payload: {ids}});
    },
    [addToHistory],
  );

  const swapWithPrev = React.useCallback(
    (id: string) => {
      addToHistory({type: HistoryActionType.SWAP_WITH_PREV, payload: {id}});
    },
    [addToHistory],
  );

  const swapWithNext = React.useCallback(
    (id: string) => {
      addToHistory({type: HistoryActionType.SWAP_WITH_NEXT, payload: {id}});
    },
    [addToHistory],
  );

  return {
    addExercise,
    removeExercise,
    addSet,
    removeSet,
    replaceExercise,
    replaceSet,
    swapWithPrev,
    swapWithNext,
    reorder,
  };
};

export function _getElementsById(elements: ConstructorElement[]) {
  const res: Record<string, ConstructorElement> = {};
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (TrainingUtils.isSet(element)) {
      for (let j = 0; j < element.elements.length; j++) {
        const {setId: _, ...exercise} = element.elements[j];
        res[exercise.elementId] = exercise;
      }
    }

    res[element.elementId] = element;
  }

  return res;
}

export const useTrainingConstructorExercise = (id: string) => {
  const elements = useRecoilValue(constructorElementsSelector);

  const exercise = React.useMemo(
    () => findExercise(elements, id) as ExerciseWithId | undefined,
    [elements, id],
  );

  return {exercise};
};

export const useTrainingConstructorSet = (id: string) => {
  const elements = useRecoilValue(constructorElementsSelector);

  const set = React.useMemo(
    () =>
      elements.find(el => TrainingUtils.isSet(el) && el.elementId === id) as
        | SetWithId
        | undefined,
    [elements, id],
  );

  return {set};
};

function findExercise(elements: ConstructorElement[], exerciseId: string) {
  for (const element of elements) {
    if (!TrainingUtils.isSet(element) && element.elementId === exerciseId) {
      return element;
    }

    if (TrainingUtils.isSet(element)) {
      for (const setExercise of element.elements) {
        if (setExercise.elementId === exerciseId) {
          return setExercise;
        }
      }
    }
  }
}

function getElementsFromTraining(training: Training): ConstructorElement[] {
  const elements: ConstructorElement[] = [];
  training.elements.forEach(trElem => {
    if (trElem.type === ElementType.SET) {
      const elementId = Id.generate();
      const exercises: SetExerciseWithId[] = [];

      for (const exercise of trElem.elements) {
        exercises.push({
          ...exercise,
          setId: elementId,
          elementId: Id.generate(),
        });
      }

      elements.push({
        ...trElem,
        elementId: Id.generate(),
        elements: exercises,
      });
    } else {
      elements.push({...trElem, elementId: Id.generate()});
    }
  });

  return elements;
}
