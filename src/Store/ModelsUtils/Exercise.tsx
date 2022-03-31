import {
  ElementType,
  Exercise,
  ExerciseCompletionType,
  ExerciseElement,
  GymExercise,
  RepsExercise,
  TimeExercise,
} from '../Models/Training';

export class ExerciseUtils {
  static getExerciseElementFromBase(exercise: Exercise): ExerciseElement {
    switch (exercise.completionType) {
      case ExerciseCompletionType.REPS:
        return {
          ...exercise,
          completionType: ExerciseCompletionType.REPS,
          type: ElementType.EXERCISE,
          reps: 15,
          restAfterComplete: 60,
        };
      case ExerciseCompletionType.TIME:
        return {
          ...exercise,
          completionType: ExerciseCompletionType.TIME,
          type: ElementType.EXERCISE,
          time: 30,
          restAfterComplete: 60,
        };
      case ExerciseCompletionType.GYM:
        return {
          ...exercise,
          completionType: ExerciseCompletionType.GYM,
          type: ElementType.EXERCISE,
          reps: 10,
          kg: 40,
          restAfterComplete: 60,
        };
    }
  }

  static isRepsExercise(exercise: ExerciseElement): exercise is RepsExercise {
    return exercise.completionType === ExerciseCompletionType.REPS;
  }

  static isTimeExercise(exercise: ExerciseElement): exercise is TimeExercise {
    return exercise.completionType === ExerciseCompletionType.TIME;
  }

  static isGymExercise(exercise: ExerciseElement): exercise is GymExercise {
    return exercise.completionType === ExerciseCompletionType.GYM;
  }
}
