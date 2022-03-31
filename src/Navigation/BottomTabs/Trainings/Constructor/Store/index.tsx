import React from 'react';
import {atom, useRecoilValue, useSetRecoilState} from 'recoil';
import {ExerciseElement, TrainingElement} from 'src/Store/Models/Training';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('training constructor');
export const trainingTitle = atom({
  key: createKey('trainingTitle'),
  default: '',
});

type TrainingElementWithId = TrainingElement & {id: string};
export const trainingElementsStore = atom<TrainingElementWithId[]>({
  key: createKey('trainingElements'),
  default: [],
});

export const useTrainingConstructorStore = () => {
  const setTitle = useSetRecoilState(trainingTitle);
  const setElements = useSetRecoilState(trainingElementsStore);

  const addElement = React.useCallback(
    (element: TrainingElement) =>
      setElements(currentElements => [
        ...currentElements,
        {id: Date.now().toString(), ...element},
      ]),
    [setElements],
  );

  const addExerciseToSet = React.useCallback(
    (setId: string, exercise: ExerciseElement) => {
      setElements(currentElements => {
        const set = currentElements.find(element => element.id === setId);

        if (!set || !TrainingUtils.isSet(set)) {
          return currentElements;
        }

        return currentElements.map(element =>
          element.id !== setId
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
        currentElements.filter(element => element.id !== id),
      ),
    [setElements],
  );

  const removeExerciseFromSet = React.useCallback(
    (setId: string, index: number) => {
      setElements(currentElements => {
        const set = currentElements.find(element => element.id === setId);
        if (!set || !TrainingUtils.isSet(set)) {
          return currentElements;
        }

        return currentElements.map(element =>
          element.id !== setId
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
          currElement.id === id ? {id, ...element} : currElement,
        ),
      ),
    [setElements],
  );

  const replaceSetExercise = React.useCallback(
    (setId: string, index: number, exercise: ExerciseElement) => {
      setElements(currentElements => {
        const set = currentElements.find(element => element.id === setId);
        if (!set || !TrainingUtils.isSet(set)) {
          return currentElements;
        }

        return currentElements.map(currElement =>
          currElement.id === setId
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
          currElement.id === id
            ? {...currElement, restAfterComplete: rest}
            : currElement,
        ),
      ),
    [setElements],
  );

  const changeSetExerciseRest = React.useCallback(
    (setId: string, index: number, rest: number) =>
      setElements(currentElements => {
        const set = currentElements.find(element => element.id === setId);
        if (!set || !TrainingUtils.isSet(set)) {
          return currentElements;
        }

        return currentElements.map(currElement =>
          currElement.id === setId
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
    () => elements.find(el => el.id === id),
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
