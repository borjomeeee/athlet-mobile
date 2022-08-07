import {
  ElementType,
  ExerciseElement,
  RestElement,
  SetElement,
  Training,
  TrainingElement,
} from '../Models/Training';
import {ExerciseUtils} from './Exercise';
import {SetUtils} from './Set';

export class TrainingUtils {
  static isSet(element: TrainingElement): element is SetElement {
    return element.type === ElementType.SET;
  }

  static elementEquals(
    trainingElement1: TrainingElement,
    trainingElement2: TrainingElement,
  ) {
    if (trainingElement1.type === trainingElement2.type) {
      if (
        TrainingUtils.isSet(trainingElement1) &&
        TrainingUtils.isSet(trainingElement2)
      ) {
        return SetUtils.equals(trainingElement1, trainingElement2);
      } else if (
        !TrainingUtils.isSet(trainingElement1) &&
        !TrainingUtils.isSet(trainingElement2)
      ) {
        return ExerciseUtils.equals(trainingElement1, trainingElement2);
      }
    }

    return false;
  }

  static equals(
    training1: Pick<Training, 'title' | 'elements'>,
    training2: Pick<Training, 'title' | 'elements'>,
  ) {
    return (
      training1.title === training2.title &&
      training1.elements.length === training2.elements.length &&
      training1.elements.every((_, indx) => {
        return TrainingUtils.elementEquals(
          training1.elements[indx],
          training2.elements[indx],
        );
      })
    );
  }

  static iterable(elements: TrainingElement[]): IterableTrainingElement[] {
    const iterableElements: IterableTrainingElement[] = [];

    let sets = 0;
    let currentSet: IterableTrainingSet | undefined;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].type === ElementType.SET) {
        const set = elements[i] as SetElement;
        currentSet = {index: sets, title: set.title};

        for (let j = 0; j < set.elements.length; j++) {
          iterableElements.push({...set.elements[j], setInfo: currentSet});

          iterableElements.push({
            type: ElementType.REST,
            duration: set.elements[j].restAfterComplete,
            setInfo: currentSet,
          });
        }

        iterableElements.push({
          duration: set.restAfterComplete,
          type: ElementType.REST,
          setInfo: currentSet,
          closeSet: true,
        });

        currentSet = undefined;
        sets++;
      } else {
        const exercise = elements[i] as ExerciseElement;
        iterableElements.push(exercise);

        iterableElements.push({
          duration: exercise.restAfterComplete,
          type: ElementType.REST,
        });
      }
    }

    return iterableElements;
  }

  static fromIterable(iterableElements: IterableTrainingElement[]) {
    const elements: TrainingElement[] = [];

    let currentSetIndex = -1;
    let currentSet: SetElement | undefined;

    for (let i = 0; i < iterableElements.length; i++) {
      if (iterableElements[i].type === ElementType.EXERCISE) {
        const element = iterableElements[i] as IterableTrainingElement;
        const exerciseElement = {
          ...element,
          restAfterComplete: 0,
        } as ExerciseElement;

        if (currentSet && element.setInfo?.index === currentSetIndex) {
          currentSet.elements.push(exerciseElement);
        } else if (element.setInfo) {
          currentSet = {
            type: ElementType.SET,
            title: element.setInfo.title,
            restAfterComplete: 0,
            elements: [exerciseElement],
          };

          elements.push(currentSet);

          currentSetIndex = element.setInfo.index;
        } else {
          elements.push(exerciseElement);
        }
      } else {
        const element = iterableElements[i] as IterableTrainingRest;
        if (currentSet && element.setInfo?.index === currentSetIndex) {
          if (element.closeSet) {
            currentSet.restAfterComplete = element.duration;
          } else {
            const lastExercise =
              currentSet.elements[currentSet.elements.length - 1];

            lastExercise.restAfterComplete = element.duration;
          }
        } else if (element.setInfo) {
          currentSet = {
            type: ElementType.SET,
            title: element.setInfo.title,
            restAfterComplete: element.duration,
            elements: [],
          };

          elements.push(currentSet);

          currentSetIndex = element.setInfo.index;
        } else {
          const lastElement = elements[elements.length - 1];
          if (lastElement.type === ElementType.EXERCISE) {
            lastElement.restAfterComplete = element.duration;
          }
        }
      }
    }

    return elements;
  }
}

export type IterableTrainingSet = {
  index: number;
  title: string;
};
export type IterableTrainingExercise = ExerciseElement & {
  setInfo?: IterableTrainingSet;
};
export type IterableTrainingRest = RestElement & {
  setInfo?: IterableTrainingSet;
  closeSet?: boolean;
};

export type IterableTrainingElement =
  | IterableTrainingExercise
  | IterableTrainingRest;
