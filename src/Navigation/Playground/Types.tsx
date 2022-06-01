import {ExerciseElement} from 'src/Store/Models/Training';

export enum PlaygroundElementType {
  EXERCISE,
  REST,
}

export type PlaygroundExercise = {
  exercise: ExerciseElement;
  type: PlaygroundElementType.EXERCISE;
};
export type PlaygroundRest = {
  duration: number;
  type: PlaygroundElementType.REST;
};

export type PlaygroundElement = PlaygroundExercise | PlaygroundRest;
