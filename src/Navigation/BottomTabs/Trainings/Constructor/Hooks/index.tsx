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
  const {replaceExercise, changeExerciseRest} = useTrainingConstructorStore();

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

  return {handlePress, handlePressEditRest};
};

export const useTrainingConstructorSetController = (id: string) => {
  const {addExerciseToSet} = useTrainingConstructorStore();
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

  return {handlePressAddExercise};
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
