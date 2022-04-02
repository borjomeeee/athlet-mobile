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
  SetElement,
  TrainingElement,
} from 'src/Store/Models/Training';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';
import {
  ConstructorExercise,
  ConstructorSet,
  ConstructorSetExercise,
} from '../Types';

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

  const removeExerciseFromSet = React.useCallback(
    (setId: string, order: number) => {
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
                elements: set.elements.filter(el => el.order !== order),
              },
        );
      });
    },
    [setElements],
  );

  const replaceElement = React.useCallback(
    (id: string, element: TrainingElement) =>
      setElements(currentElements =>
        currentElements.map(currElement =>
          currElement.elementId === id
            ? element.type === ElementType.EXERCISE
              ? {elementId: id, ...element}
              : {elementId: id, ...element, elements: []}
            : currElement,
        ),
      ),
    [setElements],
  );

  const replaceSetExercise = React.useCallback(
    (setId: string, order: number, exercise: ExerciseElement) => {
      setElements(currentElements => {
        const set = findSet(currentElements, setId);
        if (!set) {
          return currentElements;
        }

        return currentElements.map(currElement =>
          currElement.elementId === setId
            ? {
                ...set,
                elements: set.elements.map(el =>
                  el.order !== order
                    ? el
                    : {...exercise, elementId: el.elementId, setId, order},
                ),
              }
            : currElement,
        );
      });
    },
    [setElements],
  );

  const changeElementRest = React.useCallback(
    (id: string, rest: number) =>
      setElements(currentElements =>
        currentElements.map(currElement =>
          currElement.elementId === id
            ? {...currElement, restAfterComplete: rest}
            : currElement,
        ),
      ),
    [setElements],
  );

  const changeSetExerciseRest = React.useCallback(
    (setId: string, order: number, rest: number) =>
      setElements(currentElements => {
        const set = findSet(currentElements, setId);
        if (!set) {
          return currentElements;
        }

        return currentElements.map(currElement =>
          currElement.elementId === setId
            ? {
                ...set,
                elements: set.elements.map(el =>
                  el.order !== order ? el : {...el, restAfterComplete: rest},
                ),
              }
            : currElement,
        );
      }),
    [setElements],
  );

  const replaceExercises = React.useCallback(
    (exercisesIds: string[]) => {
      setElements(currentElements => {
        return _replaceElementsExercises(
          currentElements,
          _getElementsExercises(currentElements),
          exercisesIds,
        );
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
    replaceElement,
    changeElementRest,

    addExerciseToSet,
    removeExerciseFromSet,
    replaceSetExercise,
    changeSetExerciseRest,

    replaceExercises,
  };
};

export function _getElementsExercises(elements: TrainingElementWithId[]) {
  const res: Record<string, ConstructorExercise> = {};
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (isSet(element)) {
      for (let j = 0; j < element.elements.length; j++) {
        const exercise = element.elements[j];
        res[exercise.elementId] = exercise;
      }
    } else {
      res[element.elementId] = element;
    }
  }

  return res;
}

function _replaceElementsExercises(
  elements: TrainingElementWithId[],
  exercises: Record<string, ConstructorExercise | ConstructorSetExercise>,
  newOrderExercises: string[],
) {
  let indx = 0;
  const newElements = [...elements];

  for (let i = 0; i < newElements.length; i++) {
    const element = newElements[i];
    if (isSet(element)) {
      const newExercises = [...element.elements];
      for (let j = 0; j < newExercises.length; j++) {
        newExercises[j] = {
          ...exercises[newOrderExercises[indx]],
          order: newExercises[j].order,
        } as ConstructorSetExercise;
        indx++;
      }
      newElements[i] = {...element, elements: newExercises};
    } else {
      newElements[i] = {...exercises[newOrderExercises[indx]]};
      indx++;
    }
  }

  return newElements;
}

export function isSet(
  element: TrainingElementWithId,
): element is ConstructorSet {
  return element.type === ElementType.SET;
}

function findSet(elements: TrainingElementWithId[], setId: string) {
  const set = elements.find(element => element.elementId === setId);
  if (!set || !isSet(set)) {
    return undefined;
  }

  return set;
}

export const useTrainingConstructorElement = (id: string) => {
  const elements = useRecoilValue(trainingElementsStore);

  const element = React.useMemo(
    () => elements.find(el => el.elementId === id),
    [elements, id],
  );

  return {element};
};

export const useTrainingConstructorSetExercise = (
  setId: string,
  index: number,
) => {
  const {element} = useTrainingConstructorElement(setId);

  const exercise = React.useMemo(() => {
    if (!element || !TrainingUtils.isSet(element)) {
      return undefined;
    }

    return element.elements[index];
  }, [element, index]);

  return {exercise};
};
