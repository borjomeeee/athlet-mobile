import React from 'react';
import {useRecoilCallback} from 'recoil';

import {
  useTrainingConstructorStore,
  useTrainingConstructorHistoryStore,
  constructorViewElementsSelector,
} from './Store';
import {ConstructorElementViewListItem} from './Types';

export const useTrainingConstructorController = () => {
  const {
    resetAll,
    setInitialTraining,
    resetInitialTraining,

    switchToViewMode,
    setInitialTrainingId,
  } = useTrainingConstructorStore();
  const {reorder: _reorder} = useTrainingConstructorHistoryStore();

  const initWithTrainingId = React.useCallback(
    (trainingId: string) => {
      setInitialTrainingId(trainingId);
      switchToViewMode();
    },
    [setInitialTrainingId, switchToViewMode],
  );

  const reorder = useRecoilCallback(
    ({get}) =>
      (prevIndex: number, newIndex: number) => {
        const elements = get(constructorViewElementsSelector);
        _reorder(
          elements
            .reduce((acc, item, indx) => {
              if (newIndex < prevIndex) {
                if (indx < newIndex) {
                  acc.push(item);
                } else if (indx === newIndex) {
                  acc.push(elements[prevIndex]);
                } else if (indx > newIndex && indx <= prevIndex) {
                  acc.push(elements[indx - 1]);
                } else {
                  acc.push(item);
                }
              } else {
                if (indx > newIndex) {
                  acc.push(item);
                } else if (indx === newIndex) {
                  acc.push(elements[prevIndex]);
                } else if (indx >= prevIndex && indx < newIndex) {
                  acc.push(elements[indx + 1]);
                } else {
                  acc.push(item);
                }
              }
              return acc;
            }, [] as ConstructorElementViewListItem[])
            .map(el => el.id),
        );
      },
    [_reorder],
  );

  return {
    setInitialTraining,
    resetInitialTraining,

    initWithTrainingId,

    reorder,
    reset: resetAll,
  };
};
