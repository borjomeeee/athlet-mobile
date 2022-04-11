import {ElementType, SetElement} from '../Models/Training';
import {ExerciseUtils} from './Exercise';

export class SetUtils {
  static generateElement(): SetElement {
    return {
      type: ElementType.SET,
      title: 'Сет',
      elements: [],
      restAfterComplete: 10,
    };
  }

  static equals(set1: SetElement, set2: SetElement) {
    if (
      set1.title !== set2.title ||
      set1.restAfterComplete !== set2.restAfterComplete ||
      set1.elements.length !== set2.elements.length
    ) {
      return false;
    }

    return set1.elements.every((_, indx) =>
      ExerciseUtils.equals(set1.elements[indx], set2.elements[indx]),
    );
  }
}
