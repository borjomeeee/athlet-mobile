import React from 'react';

import {useNavigation} from '@react-navigation/core';

import * as UI from 'src/Components';
import {AddElementBottomSheet} from '../Views/AddElementBottomSheet';
import {useModal} from 'src/Lib/ModalRouter';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {
  useTrainingConstructorElement,
  useTrainingConstructorSetExercise,
  useTrainingConstructorStore,
} from '../Store';
import {ElementType} from 'src/Store/Models/Training';

export const useTrainingConstructorController = () => {
  const {addElement} = useTrainingConstructorStore();
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

  return {
    handlePressAddElement,
    handlePressAddExercise,
    handlePressAddSet,
  };
};

export const useTrainingConstructorElementController = (id: string) => {
  const {changeElementRest} = useTrainingConstructorStore();

  const {element} = useTrainingConstructorElement(id);
  const {show: showEditRest} = useModal('trainingConstructor__editRest');

  const handlePressEditRest = React.useCallback(() => {
    if (!element) {
      return;
    }

    showEditRest(UI.SelectRest, {
      onSelect: rest => changeElementRest(id, rest),
      defaultRest: element.restAfterComplete,
    });
  }, [showEditRest, element, id, changeElementRest]);

  return {handlePressEditRest};
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

export const useTrainingConstructorSetExerciseController = (
  setId: string,
  index: number,
) => {
  const {changeSetExerciseRest} = useTrainingConstructorStore();

  const {exercise} = useTrainingConstructorSetExercise(setId, index);
  const {show: showEditRest} = useModal('trainingConstructor__editRest');

  const handlePressEditRest = React.useCallback(() => {
    if (!exercise) {
      return;
    }

    showEditRest(UI.SelectRest, {
      onSelect: rest => changeSetExerciseRest(setId, index, rest),
      defaultRest: exercise.restAfterComplete,
    });
  }, [showEditRest, exercise, setId, index, changeSetExerciseRest]);

  return {handlePressEditRest};
};

export const useTrainingConstructorHeader = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({title: ''});
  }, [navigation]);
};
