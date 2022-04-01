import React from 'react';
import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {ExerciseElement, TrainingElement} from 'src/Store/Models/Training';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('training constructor');
export const trainingTitle = atom({
  key: createKey('trainingTitle'),
  default: '',
});

type TrainingElementWithId = TrainingElement & {elementId: string};
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
        {elementId: Date.now().toString(), ...element},
      ]),
    [setElements],
  );

  const addExerciseToSet = React.useCallback(
    (setId: string, exercise: ExerciseElement) => {
      setElements(currentElements => {
        const set = currentElements.find(
          element => element.elementId === setId,
        );

        if (!set || !TrainingUtils.isSet(set)) {
          return currentElements;
        }

        return currentElements.map(element =>
          element.elementId !== setId
            ? element
            : {...set, elements: [...set.elements, exercise]},
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
    (setId: string, index: number) => {
      setElements(currentElements => {
        const set = currentElements.find(
          element => element.elementId === setId,
        );
        if (!set || !TrainingUtils.isSet(set)) {
          return currentElements;
        }

        return currentElements.map(element =>
          element.elementId !== setId
            ? element
            : {
                ...set,
                elements: set.elements.filter((_, indx) => indx !== index),
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
            ? {elementId: id, ...element}
            : currElement,
        ),
      ),
    [setElements],
  );

  const replaceSetExercise = React.useCallback(
    (setId: string, index: number, exercise: ExerciseElement) => {
      setElements(currentElements => {
        const set = currentElements.find(
          element => element.elementId === setId,
        );
        if (!set || !TrainingUtils.isSet(set)) {
          return currentElements;
        }

        return currentElements.map(currElement =>
          currElement.elementId === setId
            ? {
                ...set,
                elements: set.elements.map((el, indx) =>
                  indx !== index ? el : exercise,
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
    (setId: string, index: number, rest: number) =>
      setElements(currentElements => {
        const set = currentElements.find(
          element => element.elementId === setId,
        );
        if (!set || !TrainingUtils.isSet(set)) {
          return currentElements;
        }

        return currentElements.map(currElement =>
          currElement.elementId === setId
            ? {
                ...set,
                elements: set.elements.map((el, indx) =>
                  indx !== index ? el : {...el, restAfterComplete: rest},
                ),
              }
            : currElement,
        );
      }),
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
  };
};

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
