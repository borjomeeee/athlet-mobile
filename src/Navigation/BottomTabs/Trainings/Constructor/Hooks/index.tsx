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
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';

export const useTrainingConstructorController = () => {
  const {addElement, resetElements, resetTitle} = useTrainingConstructorStore();
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

    reset,
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

export const useTrainingConstructorExerciseController = (id: string) => {
  const {replaceElement} = useTrainingConstructorStore();
  const {show: showEditExercise} = useModal(
    'trainingConstructor__editExercise',
  );

  const {element} = useTrainingConstructorElement(id);

  const handlePress = React.useCallback(() => {
    if (!element || TrainingUtils.isSet(element)) {
      return;
    }

    showEditExercise(UI.EditExercise, {
      onEdit: exercise => {
        replaceElement(id, exercise);
      },
      exercise: element,
    });
  }, [showEditExercise, id, element, replaceElement]);

  return {handlePress};
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
  const {changeSetExerciseRest, replaceSetExercise} =
    useTrainingConstructorStore();

  const {exercise} = useTrainingConstructorSetExercise(setId, index);
  const {show: showEditRest} = useModal('trainingConstructor__editRest');
  const {show: showEditExercise} = useModal(
    'trainingConstructor__editExercise',
  );

  const handlePressEditRest = React.useCallback(() => {
    if (!exercise) {
      return;
    }

    showEditRest(UI.SelectRest, {
      onSelect: rest => changeSetExerciseRest(setId, index, rest),
      defaultRest: exercise.restAfterComplete,
    });
  }, [showEditRest, exercise, setId, index, changeSetExerciseRest]);

  const handlePress = React.useCallback(() => {
    if (!exercise) {
      return;
    }

    showEditExercise(UI.EditExercise, {
      onEdit: newExercise => {
        replaceSetExercise(setId, index, newExercise);
      },
      exercise,
    });
  }, [exercise, index, showEditExercise, replaceSetExercise, setId]);

  return {handlePressEditRest, handlePress};
};

export const useTrainingConstructorHeader = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({title: ''});
  }, [navigation]);
};
