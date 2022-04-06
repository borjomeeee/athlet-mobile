import Animated from 'react-native-reanimated';
import {ExerciseElement, SetElement} from 'src/Store/Models/Training';

export enum ConstructorElementType {
  EXERCISE = 'exercise',
  SET_HEADER = 'set-header',
  SET_FOOTER = 'set-footer',
}

export interface ExercisePosition {
  id: string;
  type: ConstructorElementType;

  offsetY: number;
  tempOffsetY: number;

  height?: number;
  order: number;
}

export type ExercisesPositions = {
  [key: string]: ExercisePosition;
};
export type AnimatedExercisesPositions =
  Animated.SharedValue<ExercisesPositions>;

export type ConstructorExercise = ExerciseElement & {elementId: string};
export type ConstructorSetExercise = ConstructorExercise;

export type ConstructorSet = Omit<SetElement, 'elements'> & {
  elementId: string;
  elements: ConstructorSetExercise[];
};

export type ConstructorElement = {
  [ConstructorElementType.EXERCISE]: ConstructorExercise;
  [ConstructorElementType.SET_FOOTER]: ConstructorSet;
  [ConstructorElementType.SET_HEADER]: ConstructorSet;
};

export type ConstructorElementViewList = (
  | {
      type: ConstructorElementType.EXERCISE;
      element: ConstructorExercise;
    }
  | {
      type:
        | ConstructorElementType.SET_FOOTER
        | ConstructorElementType.SET_HEADER;
      element: Omit<ConstructorSet, 'elements'>;
    }
)[];

// export type ConstructorSetHeader = {setId: string; title: string};
// export type ConstructorFooter = {set: Exercise};
