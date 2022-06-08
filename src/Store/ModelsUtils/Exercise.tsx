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
          baseExercise: exercise,
          completionType: ExerciseCompletionType.REPS,
          type: ElementType.EXERCISE,
          reps: 15,
          restAfterComplete: 60,
        };
      case ExerciseCompletionType.TIME:
        return {
          baseExercise: exercise,
          completionType: ExerciseCompletionType.TIME,
          type: ElementType.EXERCISE,
          time: 30,
          restAfterComplete: 60,
        };
      case ExerciseCompletionType.GYM:
        return {
          baseExercise: exercise,
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

  static equals(exercise1: ExerciseElement, exercise2: ExerciseElement) {
    if (
      exercise1.baseExercise.id !== exercise2.baseExercise.id ||
      exercise1.baseExercise.title !== exercise2.baseExercise.title ||
      exercise1.restAfterComplete !== exercise2.restAfterComplete
    ) {
      return false;
    }

    if (
      ExerciseUtils.isRepsExercise(exercise1) &&
      ExerciseUtils.isRepsExercise(exercise2)
    ) {
      return exercise1.reps === exercise2.reps;
    } else if (
      ExerciseUtils.isTimeExercise(exercise1) &&
      ExerciseUtils.isTimeExercise(exercise2)
    ) {
      return exercise1.time === exercise2.time;
    } else if (
      ExerciseUtils.isGymExercise(exercise1) &&
      ExerciseUtils.isGymExercise(exercise2)
    ) {
      return exercise1.reps === exercise2.reps && exercise1.kg === exercise2.kg;
    }

    return false;
  }
}
