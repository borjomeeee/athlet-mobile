import React from 'react';

import {useNavigation} from '@react-navigation/core';

import * as UI from 'src/Components';
import {AddElementBottomSheet} from '../Views/AddElementBottomSheet';
import {useModal} from 'src/Lib/ModalRouter';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {
  useTrainingConstructorExercise,
  useTrainingConstructorSet,
  useTrainingConstructorStore,
} from '../Store';
import {ElementType} from 'src/Store/Models/Training';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {OverlayRef} from 'src/Lib/Overlay/Types';

export const useTrainingConstructorController = () => {
  const {addElement, resetElements, resetTitle, replaceExercises} =
    useTrainingConstructorStore();
  const {show: showAddElement, hide: hideAddElement} = useModal('add-element');
  const {show: showSelectExercise} = useModal(
    'trainingConstructor__selectExercise',
  );
  const {show: showEditExercise} = useModal(
    'trainingConstructor__editExercise',
  );

  const handlePressAddElement = React.useCallback(() => {
    showAddElement(AddElementBottomSheet, {});
  }, [showAddElement]);

  const handlePressAddExercise = React.useCallback(() => {
    hideAddElement();
    showSelectExercise(UI.SelectExercise, {
      onSelect: exercise => {
        showEditExercise(UI.EditExercise, {
          exercise: ExerciseUtils.getExerciseElementFromBase(exercise),
          onEdit: editedExercise => {
            addElement(editedExercise);
          },
        });
      },
    });
  }, [hideAddElement, showSelectExercise, showEditExercise, addElement]);

  const handlePressAddSet = React.useCallback(() => {
    hideAddElement();
    addElement({type: ElementType.SET, elements: [], restAfterComplete: 15});
  }, [hideAddElement, addElement]);

  const reset = React.useCallback(() => {
    resetElements();
    resetTitle();
  }, [resetElements, resetTitle]);

  return {
    handlePressAddElement,
    handlePressAddExercise,
    handlePressAddSet,

    replaceExercises,

    reset,
  };
};

export const useTrainingConstructorExerciseController = (id: string) => {
  const {replaceExercise, changeExerciseRest, removeExercise} =
    useTrainingConstructorStore();

  const {show: showEditRest} = useModal('trainingConstructor__editRest');
  const {show: showEditExercise} = useModal(
    'trainingConstructor__editExercise',
  );

  const {exercise} = useTrainingConstructorExercise(id);

  const handlePress = React.useCallback(() => {
    if (!exercise || TrainingUtils.isSet(exercise)) {
      return;
    }

    showEditExercise(UI.EditExercise, {
      onEdit: newExercise => {
        replaceExercise(id, newExercise);
      },
      exercise: exercise,
    });
  }, [showEditExercise, id, exercise, replaceExercise]);

  const handlePressEditRest = React.useCallback(() => {
    if (!exercise) {
      return;
    }

    showEditRest(UI.SelectRest, {
      onSelect: rest => changeExerciseRest(id, rest),
      defaultRest: exercise.restAfterComplete,
    });
  }, [showEditRest, exercise, id, changeExerciseRest]);

  const handlePressRemove = React.useCallback(() => {
    removeExercise(id);
  }, [id, removeExercise]);

  return {handlePress, handlePressEditRest, handlePressRemove};
};

export const useTrainingConstructorSetController = (id: string) => {
  const {
    addExerciseToSet,
    removeElement,
    swapElementWithNext,
    swapElementWithPrevious,
    changeSetTitle,
    processSetTitle,
  } = useTrainingConstructorStore();
  const {show: showSelectExercise} = useModal(
    'trainingConstructor__selectExercise',
  );
  const {show: showEditExercise} = useModal(
    'trainingConstructor__editExercise',
  );

  const handlePressAddExercise = React.useCallback(
    () =>
      showSelectExercise(UI.SelectExercise, {
        onSelect: exercise => {
          showEditExercise(UI.EditExercise, {
            exercise: ExerciseUtils.getExerciseElementFromBase(exercise),
            onEdit: editedExercise => {
              addExerciseToSet(id, editedExercise);
            },
          });
        },
      }),
    [showSelectExercise, showEditExercise, addExerciseToSet, id],
  );

  const handlePressRemoveSet = React.useCallback(() => {
    removeElement(id);
  }, [id, removeElement]);

  const handlePressSwapWithPrevious = React.useCallback(() => {
    swapElementWithPrevious(id);
  }, [swapElementWithPrevious, id]);

  const handlePressSwapWithNext = React.useCallback(() => {
    swapElementWithNext(id);
  }, [swapElementWithNext, id]);

  const handleChangeSetTitle = React.useCallback(
    (title: string) => {
      changeSetTitle(id, title);
    },
    [changeSetTitle, id],
  );

  const handleBlurSetTitle = React.useCallback(() => {
    processSetTitle(id);
  }, [processSetTitle, id]);

  return {
    handlePressAddExercise,
    handlePressRemoveSet,
    handlePressSwapWithNext,
    handlePressSwapWithPrevious,
    handleChangeSetTitle,
    handleBlurSetTitle,
  };
};

export const useTrainingConstructorSetOptionsController = (
  ref: React.RefObject<OverlayRef>,
) => {
  const handlePressOptions = React.useCallback(() => {
    ref.current?.show();
  }, [ref]);

  return {handlePressOptions};
};

export const useTrainingConstructorSetRestController = (id: string) => {
  const {changeSetRest} = useTrainingConstructorStore();

  const {set} = useTrainingConstructorSet(id);
  const {show: showEditRest} = useModal('trainingConstructor__editRest');

  const handlePressEditRest = React.useCallback(() => {
    if (!set) {
      return;
    }

    showEditRest(UI.SelectRest, {
      onSelect: rest => changeSetRest(id, rest),
      defaultRest: set.restAfterComplete,
    });
  }, [showEditRest, set, id, changeSetRest]);

  return {handlePressEditRest};
};

export const useTrainingConstructorHeader = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({title: ''});
  }, [navigation]);
};
