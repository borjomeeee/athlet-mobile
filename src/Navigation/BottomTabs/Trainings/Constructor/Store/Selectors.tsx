import {selector} from 'recoil';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {ConstructorElementType, ConstructorElementViewList} from '../Types';
import {getSetFooterId, getSetHeaderId} from '../Utils';
import {
  actionHistoryAtom,
  createKey,
  screenStateAtom,
  initialTrainingAtom,
} from './Atoms';
import {HistoryActionType, ScreenState} from './Types';
import {
  getConstructorElementsFromTraining,
  getElementsByIdFromList,
  HistoryUtils,
  reorder,
} from './Utils';

export const initialTrainingTitleSelector = selector({
  key: createKey('training title'),
  get: ({get}) => get(initialTrainingAtom)?.title,
});

export const initialTrainingElementsSelector = selector({
  key: createKey('training elements'),
  get: ({get}) => {
    const training = get(initialTrainingAtom);
    return training ? getConstructorElementsFromTraining(training) : [];
  },
});

export const isEditingSelector = selector({
  key: createKey('isEditing'),
  get: ({get}) => get(screenStateAtom) === ScreenState.EDITING,
});

export const isCreatingSelector = selector({
  key: createKey('isCreating'),
  get: ({get}) => !get(initialTrainingAtom),
});

export const constructorElementsSelector = selector({
  key: createKey('constructorElements'),
  get: ({get}) => {
    let elements = [...get(initialTrainingElementsSelector)];

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
                    ? {
                        ...action.payload.exercise,
                        setId: element.elementId,
                      }
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

export const constructorElementsByIdSelector = selector({
  key: createKey('constructorElementsById'),
  get: ({get}) => getElementsByIdFromList(get(constructorElementsSelector)),
});

export const constructorViewElementsSelector = selector({
  key: createKey('constructorViewElements'),
  get: ({get}) => {
    const elements = get(constructorElementsSelector);
    const elems: ConstructorElementViewList = [];

    elements.forEach(element => {
      if (TrainingUtils.isSet(element)) {
        const {elements: _, ...set} = element;

        elems.push({
          id: getSetHeaderId(set.elementId),
          type: ConstructorElementType.SET_HEADER,
          element: set,
        });
        element.elements.forEach(exercise => {
          elems.push({
            id: exercise.elementId,
            type: ConstructorElementType.EXERCISE,
            element: exercise,
          });
        });
        elems.push({
          id: getSetFooterId(set.elementId),
          type: ConstructorElementType.SET_FOOTER,
          element: set,
        });
        return;
      }

      elems.push({
        id: element.elementId,
        type: ConstructorElementType.EXERCISE,
        element: element,
      });
    });

    return elems;
  },
});
