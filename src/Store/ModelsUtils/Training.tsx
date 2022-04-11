import {
  ElementType,
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
}
