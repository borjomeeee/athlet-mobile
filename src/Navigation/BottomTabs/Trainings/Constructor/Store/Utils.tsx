import {Training} from 'src/Store/Models/Training';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {Id} from 'src/Utils/Id';
import {isSetFooter, isSetHeader, parseSetHeaderId} from '../Utils';
import {
  ConstructorElement,
  ExerciseWithId,
  HistoryAction,
  HistoryActionType,
  SetExerciseWithId,
  SetWithId,
} from './Types';

export class HistoryUtils {
  static is<T extends HistoryActionType>(
    action: HistoryAction<HistoryActionType>,
    type: T,
  ): action is HistoryAction<T> {
    return action.type === type;
  }
}

export function getConstructorElementsFromTraining(
  training: Training,
): ConstructorElement[] {
  const elements: ConstructorElement[] = [];
  training.elements.forEach(trElem => {
    if (TrainingUtils.isSet(trElem)) {
      const elementId = Id.generate();
      const exercises: SetExerciseWithId[] = [];

      for (const exercise of trElem.elements) {
        exercises.push({
          ...exercise,
          setId: elementId,
          elementId: Id.generate(),
        });
      }

      elements.push({
        ...trElem,
        elementId: Id.generate(),
        elements: exercises,
      });
    } else {
      elements.push({...trElem, elementId: Id.generate()});
    }
  });

  return elements;
}

export function getElementsByIdFromList(elements: ConstructorElement[]) {
  const res: Record<string, ConstructorElement> = {};
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (TrainingUtils.isSet(element)) {
      for (let j = 0; j < element.elements.length; j++) {
        const {setId: _, ...exercise} = element.elements[j];
        res[exercise.elementId] = exercise;
      }
    }

    res[element.elementId] = element;
  }

  return res;
}

// Deprecated
export function findExercise(
  elements: ConstructorElement[],
  exerciseId: string,
) {
  for (const element of elements) {
    if (!TrainingUtils.isSet(element) && element.elementId === exerciseId) {
      return element;
    }

    if (TrainingUtils.isSet(element)) {
      for (const setExercise of element.elements) {
        if (setExercise.elementId === exerciseId) {
          return setExercise;
        }
      }
    }
  }
}

export function reorder(elements: ConstructorElement[], orderedIds: string[]) {
  const elementsById = getElementsByIdFromList(elements);
  const newElements: ConstructorElement[] = [];

  let index = 0;
  let currentSet: SetWithId | undefined;

  while (index !== orderedIds.length) {
    const id = orderedIds[index];

    if (isSetHeader(id)) {
      const set = elementsById[parseSetHeaderId(id)] as SetWithId | undefined;

      if (set) {
        currentSet = {...set, elements: []};
        newElements.push(currentSet);
      }

      index++;
      continue;
    }
    if (isSetFooter(id)) {
      currentSet = undefined;

      index++;
      continue;
    }

    if (elementsById[id]) {
      if (currentSet) {
        currentSet.elements.push({
          ...(elementsById[id] as ExerciseWithId),
          setId: currentSet.elementId,
        });
      } else {
        newElements.push(elementsById[id]);
      }
    }

    index++;
  }

  return newElements;
}
