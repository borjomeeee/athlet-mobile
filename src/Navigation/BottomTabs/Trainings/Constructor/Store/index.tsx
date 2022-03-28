import React from 'react';
import {atom, useSetRecoilState} from 'recoil';
import {TrainingElement} from 'src/Store/Models/Training';
import {getKeyFabricForDomain} from 'src/Utils/Recoil';

const createKey = getKeyFabricForDomain('training constructor');
export const trainingTitle = atom({
  key: createKey('trainingTitle'),
  default: '',
});

type TrainingElementWithId = TrainingElement & {id: string};
export const trainingElements = atom<TrainingElementWithId[]>({
  key: createKey('trainingElements'),
  default: [],
});

export const useTrainingConstructorStore = () => {
  const setTitle = useSetRecoilState(trainingTitle);
  const setElements = useSetRecoilState(trainingElements);

  const addElement = React.useCallback(
    (element: TrainingElement) =>
      setElements(currentElements => [
        ...currentElements,
        {id: Date.now().toString(), ...element},
      ]),
    [setElements],
  );

  const removeElement = React.useCallback(
    (id: string) =>
      setElements(currentElements =>
        currentElements.filter(element => element.id !== id),
      ),
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

  return {
    setTitle,

    addElement,
    removeElement,
    replaceElement,
  };
};
