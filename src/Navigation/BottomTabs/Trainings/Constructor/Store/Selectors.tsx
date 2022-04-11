import {selector} from 'recoil';
import {Training} from 'src/Store/Models/Training';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {myTrainingsStore} from 'src/Store/Trainings';
import {
  actionHistoryAtom,
  createKey,
  screenStateAtom,
  trainingIdAtom,
} from './Atoms';
import {HistoryActionType, ScreenState} from './Types';
import {
  getConstructorElementsFromTraining,
  HistoryUtils,
  reorder,
} from './Utils';

export const currentTrainingSelector = selector({
  key: createKey('currentTraining'),
  get: ({get}) => {
    const trainingId = get(trainingIdAtom);

    if (!trainingId) {
      return;
    }

    const myTrainings = get(myTrainingsStore);
    return myTrainings[trainingId] as Training | undefined;
  },
});

export const currentTrainingTitleSelector = selector({
  key: createKey('training title'),
  get: ({get}) => get(currentTrainingSelector)?.title || '',
});

export const currentTrainingElementsSelector = selector({
  key: createKey('training elements'),
  get: ({get}) => {
    const training = get(currentTrainingSelector);
    return training ? getConstructorElementsFromTraining(training) : [];
  },
});

export const isEditingSelector = selector({
  key: createKey('isEditing'),
  get: ({get}) => get(screenStateAtom) === ScreenState.EDITING,
});

export const isCreatingSelector = selector({
  key: createKey('isCreating'),
  get: ({get}) => !get(trainingIdAtom),
});

export const constructorElementsSelector = selector({
  key: createKey('constructor elements'),
  get: ({get}) => {
    let elements = [...get(currentTrainingElementsSelector)];

    const actionHistory = get(actionHistoryAtom);
    actionHistory.forEach(action => {
      if (HistoryUtils.is(action, HistoryActionType.ADD_EXERCISE)) {
        elements.push(action.payload.exercise);
      } else if (
        HistoryUtils.is(action, HistoryActionType.ADD_EXERCISE_TO_SET)
      ) {
        elements = elements.map(element => {
          if (
            TrainingUtils.isSet(element) &&
            element.elementId === action.payload.setId
          ) {
            return {
              ...element,
              elements: [...element.elements, action.payload.exercise],
            };
          }

          return element;
        });
      } else if (HistoryUtils.is(action, HistoryActionType.REMOVE_EXERCISE)) {
        elements = elements
          .map(element => {
            if (TrainingUtils.isSet(element)) {
              const id = action.payload.id;
              if (
                element.elements.findIndex(
                  exercise => exercise.elementId === id,
                ) !== -1
              ) {
                return {
                  ...element,
                  elements: element.elements.filter(
                    exercise => exercise.elementId !== id,
                  ),
                };
              }
            }
            return element;
          })
          .filter(
            element =>
              TrainingUtils.isSet(element) ||
              element.elementId !== action.payload.id,
          );
      } else if (HistoryUtils.is(action, HistoryActionType.ADD_SET)) {
        elements.push(action.payload.set);
      } else if (HistoryUtils.is(action, HistoryActionType.REMOVE_SET)) {
        elements = elements.filter(
          element => element.elementId !== action.payload.id,
        );
      } else if (HistoryUtils.is(action, HistoryActionType.REPLACE_EXERCISE)) {
        elements = elements.map(element => {
          if (TrainingUtils.isSet(element)) {
            const id = action.payload.id;
            if (
              element.elements.findIndex(
                exercise => exercise.elementId === id,
              ) !== -1
            ) {
              return {
                ...element,
                elements: element.elements.map(exercise =>
                  exercise.elementId === id
                    ? {...action.payload.exercise, setId: element.elementId}
                    : exercise,
                ),
              };
            }

            return element;
          }

          return element.elementId === action.payload.id
            ? action.payload.exercise
            : element;
        });
      } else if (HistoryUtils.is(action, HistoryActionType.REPLACE_SET)) {
        elements = elements.map(element =>
          element.elementId === action.payload.id
            ? action.payload.set
            : element,
        );
      } else if (HistoryUtils.is(action, HistoryActionType.SWAP_WITH_PREV)) {
        const elementIndex = elements.findIndex(
          element => element.elementId === action.payload.id,
        );

        if (elementIndex < 1) {
          return;
        }

        const currentElementForPrev = elements[elementIndex];
        const prevElement = elements[elementIndex - 1];

        elements[elementIndex] = prevElement;
        elements[elementIndex - 1] = currentElementForPrev;
      } else if (HistoryUtils.is(action, HistoryActionType.SWAP_WITH_NEXT)) {
        const elementIndex = elements.findIndex(
          element => element.elementId === action.payload.id,
        );

        if (elementIndex >= elements.length - 1 || elementIndex === -1) {
          return;
        }

        const currentElement = elements[elementIndex];
        const nextElement = elements[elementIndex + 1];

        elements[elementIndex] = nextElement;
        elements[elementIndex + 1] = currentElement;
      } else if (HistoryUtils.is(action, HistoryActionType.REORDER)) {
        elements = reorder(elements, action.payload.ids);
      }
    });

    return elements;
  },
});
