import {ElementType, SetElement, TrainingElement} from '../Models/Training';

export class TrainingUtils {
  static isSet(element: TrainingElement): element is SetElement {
    return element.type === ElementType.SET;
  }
}
