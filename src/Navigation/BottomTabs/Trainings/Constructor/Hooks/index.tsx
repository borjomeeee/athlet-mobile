import React from 'react';

import {
  useTrainingConstructorStore,
  useTrainingConstructorHistoryStore,
} from '../Store';

import {useModal} from 'src/Lib/ModalRouter';
import {AddElementBottomSheet} from '../Views/AddElementBottomSheet';
import {Modals} from '../Const';

export const useTrainingConstructorController = () => {
  const {
    setTitle,
    resetAll,
    swithToViewMode,
    setInitialTraining,
    resetInitialTraining,

    setInitialTrainingId,
  } = useTrainingConstructorStore();
  const {reorder} = useTrainingConstructorHistoryStore();
  const {show: showAddElement} = useModal(Modals.AddElement);

  const handlePressAddElement = React.useCallback(() => {
    showAddElement(AddElementBottomSheet, {});
  }, [showAddElement]);

  const handleChangeTitle = React.useCallback(
    (newTitle: string) => {
      setTitle(newTitle);
    },
    [setTitle],
  );

  const initWithTrainingId = React.useCallback(
    (trainingId: string) => {
      setInitialTrainingId(trainingId);
      swithToViewMode();
    },
    [setInitialTrainingId, swithToViewMode],
  );

  return {
    handlePressAddElement,
    handleChangeTitle,

    setInitialTraining,
    resetInitialTraining,

    initWithTrainingId,

    reorder,
    reset: resetAll,
  };
};
