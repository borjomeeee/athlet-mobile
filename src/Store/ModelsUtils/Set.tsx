import {ElementType, SetElement} from '../Models/Training';

export class SetUtils {
  static generateElement(): SetElement {
    return {
      type: ElementType.SET,
      title: 'Сет',
      elements: [],
      restAfterComplete: 10,
    };
  }
}
