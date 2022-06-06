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

export type Element = z.output<typeof ElementSheme>;

export enum ExerciseCompletionType {
  REPS = 'reps',
  TIME = 'time',
  GYM = 'gym',
}
export const ElementCompletionTypeScheme = z.nativeEnum(ExerciseCompletionType);

export const ExerciseScheme = z.object({
  id: z.string(),
  title: MayBeStringScheme.default('Undefined'),
  completionType: canBeNull(ElementCompletionTypeScheme).default(
    ExerciseCompletionType.REPS,
  ),
});

export type ExerciseApi = z.input<typeof ExerciseScheme>;
export type Exercise = z.output<typeof ExerciseScheme>;

export const TrainingExerciseScheme = ElementSheme.merge(ExerciseScheme).extend(
  {
    type: z.literal(ElementType.EXERCISE),
    restAfterComplete: MayBeIntegerScheme.default(0),
  },
);

export type TrainingExercise = z.output<typeof TrainingExerciseScheme>;

export const RestExerciseScheme = TrainingExerciseScheme.extend({
  completionType: z.literal(ExerciseCompletionType.REPS),
  reps: MayBeIntegerScheme.default(0),
});
export type RepsExercise = z.output<typeof RestExerciseScheme>;

export const TimeExerciseScheme = TrainingExerciseScheme.extend({
  completionType: z.literal(ExerciseCompletionType.TIME),
  time: MayBeIntegerScheme.default(0),
});
export type TimeExercise = z.output<typeof TimeExerciseScheme>;

export const GymExerciseScheme = TrainingExerciseScheme.extend({
  completionType: z.literal(ExerciseCompletionType.GYM),
  reps: MayBeIntegerScheme.default(0),
  kg: MayBeIntegerScheme.default(0),
});
export type GymExercise = z.output<typeof GymExerciseScheme>;

export const RestElementScheme = ElementSheme.extend({
  type: z.literal(ElementType.REST),
  duration: MayBeIntegerScheme.default(0),
});
export type RestElement = z.output<typeof RestElementScheme>;

export const ExerciseElementScheme = z.union([
  RestExerciseScheme,
  TimeExerciseScheme,
  GymExerciseScheme,
]);
export type ExerciseElement = z.output<typeof ExerciseElementScheme>;

export const SetElementScheme = ElementSheme.extend({
  type: z.literal(ElementType.SET),
  title: MayBeStringScheme.default('Undefined'),
  elements: canBeNull(z.array(ExerciseElementScheme)).default([]),
  restAfterComplete: MayBeIntegerScheme.default(0),
});
export type SetElement = z.output<typeof SetElementScheme>;

export const TrainingElementScheme = z.union([
  SetElementScheme,
  ExerciseElementScheme,
]);
export type TrainingElement = z.output<typeof TrainingElementScheme>;

export const TrainingScheme = z.object({
  id: z.string(),

  createdAt: MayBeDateScheme,
  updatedAt: MayBeDateScheme,

  author: canBeNull(UserPreviewScheme).default({}),

  title: MayBeStringScheme.default('Undefined'),
  elements: canBeNull(z.array(TrainingElementScheme)).default([]),
});

export type TrainingApi = z.input<typeof TrainingScheme>;
export type Training = z.output<typeof TrainingScheme>;

export type CreatingTraining = Pick<Training, 'title' | 'elements'>;
