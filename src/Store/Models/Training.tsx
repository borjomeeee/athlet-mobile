import {z} from 'zod';
import {
  canBeNull,
  MayBeDateScheme,
  MayBeIntegerScheme,
  MayBeStringScheme,
} from './Common';
import {UserPreviewScheme} from './User';

export enum ElementType {
  EXERCISE = 'exercise',
  REST = 'rest',
  SET = 'set',
}
export const ElementTypeScheme = z.nativeEnum(ElementType);
export const ElementSheme = z.object({
  type: ElementTypeScheme,
});
export type Element = z.TypeOf<typeof ElementSheme>;

export enum ExerciseCompletionType {
  REPS = 'reps',
  TIME = 'time',
  GYM = 'gym',
}
export const ElementCompletionTypeScheme = z.nativeEnum(ExerciseCompletionType);

export const ExerciseScheme = ElementSheme.extend({
  type: z.literal(ElementType.EXERCISE),
  title: MayBeStringScheme.default('Undefined'),
  completionType: ElementCompletionTypeScheme.default(
    ExerciseCompletionType.REPS,
  ),
});
export type Exercise = z.TypeOf<typeof ExerciseScheme>;

export const RestExerciseScheme = ExerciseScheme.extend({
  completionType: z.literal(ExerciseCompletionType.REPS),
  reps: MayBeIntegerScheme.default(0),
});
export type RepsExercise = z.TypeOf<typeof RestExerciseScheme>;

export const TimeExerciseScheme = ExerciseScheme.extend({
  completionType: z.literal(ExerciseCompletionType.TIME),
  time: MayBeIntegerScheme.default(0),
});
export type TimeExercise = z.TypeOf<typeof TimeExerciseScheme>;

export const GymExerciseScheme = ExerciseScheme.extend({
  completionType: z.literal(ExerciseCompletionType.GYM),
  reps: MayBeIntegerScheme.default(0),
  kg: MayBeIntegerScheme.default(0),
});
export type GymExercise = z.TypeOf<typeof GymExerciseScheme>;

export const RestScheme = ElementSheme.extend({
  type: z.literal(ElementType.REST),
  duration: MayBeIntegerScheme.default(0),
});
export type Rest = z.TypeOf<typeof RestScheme>;

export const ExerciseElementScheme = z.union([
  RestExerciseScheme,
  TimeExerciseScheme,
  GymExerciseScheme,
]);
export type ExerciseElement = z.TypeOf<typeof ExerciseElementScheme>;

export const SetElementScheme = z.union([ExerciseElementScheme, RestScheme]);
export type SetElement = z.TypeOf<typeof SetElementScheme>;

export const SetScheme = ElementSheme.extend({
  type: z.literal(ElementType.SET),
  elements: canBeNull(z.array(SetElementScheme)).default([]),
});
export type Set = z.TypeOf<typeof SetScheme>;

export const TrainingElementScheme = z.union([
  SetScheme,
  RestScheme,
  ExerciseElementScheme,
]);
export type TrainingElement = z.TypeOf<typeof TrainingElementScheme>;

export const TrainingScheme = z.object({
  id: z.string(),

  createdAt: MayBeDateScheme,
  updatedAt: MayBeDateScheme,

  author: canBeNull(UserPreviewScheme).default({}),

  title: MayBeStringScheme.default('Undefined'),
  elements: canBeNull(z.array(TrainingElementScheme)).default([]),
});
export type Training = z.TypeOf<typeof TrainingScheme>;
