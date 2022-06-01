import {
  PlaygroundElement,
  PlaygroundElementType,
  PlaygroundRest,
} from './Types';

export class PlaygroundUtils {
  static isRest(element: PlaygroundElement): element is PlaygroundRest {
    return element.type === PlaygroundElementType.REST;
  }
}
