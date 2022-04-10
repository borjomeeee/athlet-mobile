import Animated from 'react-native-reanimated';
import {ExerciseWithId, SetWithId} from './Store/Types';

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

export type ConstructorElementViewList = (
  | {
      type: ConstructorElementType.EXERCISE;
      element: ExerciseWithId;
    }
  | {
      type:
        | ConstructorElementType.SET_FOOTER
        | ConstructorElementType.SET_HEADER;
      element: Omit<SetWithId, 'elements'>;
    }
)[];

// export type ConstructorSetHeader = {setId: string; title: string};
// export type ConstructorFooter = {set: Exercise};
