import Animated from 'react-native-reanimated';
import {
  ExerciseElement,
  SetElement,
  SetExercise,
} from 'src/Store/Models/Training';

export interface ExercisePosition {
  id: string;

  offsetY: number;
  tempOffsetY: number;

  height?: number;
  order: number;

  changed?: boolean;
}

export type ExercisesPositions = {
  [key: string]: ExercisePosition;
};
export type AnimatedExercisesPositions =
  Animated.SharedValue<ExercisesPositions>;

export enum ConstructorElementType {
  EXERCISE = 'exercise',
  SET_EXERCISE = 'set-exercise',
  SET_HEADER = 'set-header',
  SET_FOOTER = 'set-footer',
}

export type ConstructorExercise = ExerciseElement & {elementId: string};
export type ConstructorSetExercise = SetExercise &
  ConstructorExercise & {setId: string};

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
      type: ConstructorElementType.SET_EXERCISE;
      element: ConstructorSetExercise;
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
