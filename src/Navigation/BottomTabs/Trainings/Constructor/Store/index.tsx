import React from 'react';
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  ElementType,
  ExerciseElement,
  TrainingElement,
} from 'src/Store/Models/Training';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {
  ConstructorExercise,
  ConstructorSet,
  ExercisesPositions,
} from '../Types';
import {isSetFooter, isSetHeader, parseSetHeaderId} from '../Utils';

const createKey = getKeyFabricForDomain('training constructor');
export const trainingTitle = atom({
  key: createKey('trainingTitle'),
  default: '',
});

export type TrainingElementWithId = ConstructorExercise | ConstructorSet;

export const trainingElementsStore = atom<TrainingElementWithId[]>({
  key: createKey('trainingElements'),
  default: [],
});

export const useTrainingConstructorStore = () => {
  const setTitle = useSetRecoilState(trainingTitle);
  const setElements = useSetRecoilState(trainingElementsStore);

  const resetTitle = useResetRecoilState(trainingTitle);
  const resetElements = useResetRecoilState(trainingElementsStore);

  const addElement = React.useCallback(
    (element: TrainingElement) =>
      setElements(currentElements => [
        ...currentElements,
        element.type === ElementType.EXERCISE
          ? {...element, elementId: Date.now().toString()}
          : {...element, elementId: Date.now().toString(), elements: []},
      ]),
    [setElements],
  );

  const addExerciseToSet = React.useCallback(
    (setId: string, exercise: ExerciseElement) => {
      setElements(currentElements => {
        const set = findSet(currentElements, setId);
        if (!set) {
          return currentElements;
        }

        return currentElements.map(element =>
          element.elementId !== setId
            ? element
            : {
                ...set,
                elements: [
                  ...set.elements,
                  {
                    ...exercise,
                    elementId: Date.now().toString(),
                    order: set.elements.length,
                    setId,
                  },
                ],
              },
        );
      });
    },
    [setElements],
  );

  const removeElement = React.useCallback(
    (id: string) =>
      setElements(currentElements =>
        currentElements.filter(element => element.elementId !== id),
      ),
    [setElements],
  );

  const swapElementWithPrevious = React.useCallback(
    (id: string) =>
      setElements(currentElements => {
        const elemIndex = currentElements.findIndex(
          elem => elem.elementId === id,
        );
        if (elemIndex < 1) {
          return currentElements;
        }

        const copyCurrElements = [...currentElements];

        copyCurrElements[elemIndex] = currentElements[elemIndex - 1];
        copyCurrElements[elemIndex - 1] = currentElements[elemIndex];

        return copyCurrElements;
      }),
    [setElements],
  );

  const swapElementWithNext = React.useCallback(
    (id: string) =>
      setElements(currentElements => {
        const elemIndex = currentElements.findIndex(
          elem => elem.elementId === id,
        );
        if (elemIndex === -1 || elemIndex === currentElements.length - 1) {
          return currentElements;
        }

        const copyCurrElements = [...currentElements];

        copyCurrElements[elemIndex] = currentElements[elemIndex + 1];
        copyCurrElements[elemIndex + 1] = currentElements[elemIndex];

        return copyCurrElements;
      }),
    [setElements],
  );

  const removeExercise = React.useCallback(
    (id: string) => {
      setElements(currentElements => {
        return currentElements
          .map(element => {
            if (TrainingUtils.isSet(element)) {
              if (
                element.elements.find(
                  setExercise => setExercise.elementId === id,
                )
              ) {
                return {
                  ...element,
                  elements: element.elements.filter(
                    setExercise => setExercise.elementId !== id,
                  ),
                };
              }
            }

            return element;
          })
          .filter(
            element => TrainingUtils.isSet(element) || element.elementId !== id,
          );
      });
    },
    [setElements],
  );

  const replaceExercise = React.useCallback(
    (id: string, exercise: ExerciseElement) => {
      setElements(currentElements => {
        return currentElements.map(element => {
          if (TrainingUtils.isSet(element)) {
            if (
              element.elements.find(setExercise => setExercise.elementId === id)
            ) {
              return {
                ...element,
                elements: element.elements.map(setExercise =>
                  setExercise.elementId === id
                    ? {...setExercise, ...exercise}
                    : setExercise,
                ),
              };
            }

            return element;
          }

          return element.elementId === id ? {...element, ...exercise} : element;
        });
      });
    },
    [setElements],
  );

  const changeExerciseRest = React.useCallback(
    (id: string, newRest: number) => {
      setElements(currentElements => {
        return currentElements.map(element => {
          if (TrainingUtils.isSet(element)) {
            if (
              element.elements.find(setExercise => setExercise.elementId === id)
            ) {
              return {
                ...element,
                elements: element.elements.map(setExercise =>
                  setExercise.elementId === id
                    ? {...setExercise, restAfterComplete: newRest}
                    : setExercise,
                ),
              };
            }

            return element;
          }

          return element.elementId === id
            ? {...element, restAfterComplete: newRest}
            : element;
        });
      });
    },
    [setElements],
  );

  const changeSetRest = React.useCallback(
    (id: string, rest: number) =>
      setElements(currentElements =>
        currentElements.map(currElement =>
          TrainingUtils.isSet(currElement) && currElement.elementId === id
            ? {...currElement, restAfterComplete: rest}
            : currElement,
        ),
      ),
    [setElements],
  );

  const replaceExercises = React.useCallback(
    (exercisesPositions: ExercisesPositions) => {
      setElements(currentElements => {
        const elementsById = _getElementsById(currentElements);

        const newElementsStore: TrainingElementWithId[] = [];
        const positionsArray = Object.values(exercisesPositions).sort(
          (pos1, pos2) => pos1.order - pos2.order,
        );

        let index = 0;
        let currentSet: ConstructorSet | undefined;

        while (index !== positionsArray.length) {
          const position = positionsArray[index];
          if (isSetHeader(position.id)) {
            currentSet = {
              ...elementsById[parseSetHeaderId(position.id)],
              elements: [],
            } as ConstructorSet;

            newElementsStore.push(currentSet);

            index++;
            continue;
          }

          if (isSetFooter(position.id)) {
            currentSet = undefined;

            index++;
            continue;
          }

          if (currentSet) {
            currentSet.elements.push(
              elementsById[position.id] as ConstructorExercise,
            );
          } else {
            newElementsStore.push(elementsById[position.id]);
          }

          index++;
        }

        return newElementsStore;
      });
    },
    [setElements],
  );

  return {
    setTitle,

    resetTitle,
    resetElements,

    addElement,
    removeElement,

    swapElementWithNext,
    swapElementWithPrevious,

    addExerciseToSet,

    replaceExercise,
    removeExercise,

    changeExerciseRest,
    changeSetRest,

    replaceExercises,
  };
};

export function _getElementsById(elements: TrainingElementWithId[]) {
  const res: Record<string, TrainingElementWithId> = {};
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (isSet(element)) {
      for (let j = 0; j < element.elements.length; j++) {
        const exercise = element.elements[j];
        res[exercise.elementId] = exercise;
      }
    }

    res[element.elementId] = element;
  }

  return res;
}

export function isSet(
  element: TrainingElementWithId,
): element is ConstructorSet {
  return element.type === ElementType.SET;
}

export const useTrainingConstructorExercise = (id: string) => {
  const elements = useRecoilValue(trainingElementsStore);

  const exercise = React.useMemo(
    () => findExercise(elements, id),
    [elements, id],
  );

  return {exercise};
};

export const useTrainingConstructorSet = (id: string) => {
  const elements = useRecoilValue(trainingElementsStore);

  const set = React.useMemo(
    () =>
      elements.find(el => TrainingUtils.isSet(el) && el.elementId === id) as
        | ConstructorSet
        | undefined,
    [elements, id],
  );

  return {set};
};

function findExercise(elements: TrainingElementWithId[], exerciseId: string) {
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

function findSet(elements: TrainingElementWithId[], setId: string) {
  const set = elements.find(element => element.elementId === setId);
  if (!set || !isSet(set)) {
    return undefined;
  }

  return set;
}
