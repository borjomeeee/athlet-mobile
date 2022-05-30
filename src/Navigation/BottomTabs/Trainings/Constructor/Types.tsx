import Animated from 'react-native-reanimated';
import {ExerciseWithId, SetWithId} from './Store/Types';

export enum ConstructorElementType {
  EXERCISE = 'exercise',
  SET_HEADER = 'set-header',
  SET_FOOTER = 'set-footer',
}

export interface ExerciseValues {
  elementId: string;

  height: number;
  order: number;

  // temp
  tempOffsetY: number;
  tempOrder: number;
}

export type ExerciseValuesStore = {
  [key: string]: ExerciseValues;
};
export type AnimatedExerciseValuesStore =
  Animated.SharedValue<ExerciseValuesStore>;

export type ConstructorElementViewList = (
  | {
      id: string;
      type: ConstructorElementType.EXERCISE;
      element: ExerciseWithId;
    }
  | {
      id: string;
      type:
        | ConstructorElementType.SET_FOOTER
        | ConstructorElementType.SET_HEADER;
      element: Omit<SetWithId, 'elements'>;
    }
)[];

// export type ConstructorSetHeader = {setId: string; title: string};
// export type ConstructorFooter = {set: Exercise};
