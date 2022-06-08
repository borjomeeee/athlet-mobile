import {
  ElementType,
  ExerciseApi,
  ExerciseCompletionType,
  TrainingApi,
} from 'src/Store/Models/Training';
import {UserApi} from 'src/Store/Models/User';

export const account: UserApi = {
  id: '1',
  email: 'test@test.com',
  nickname: 'borjome',
};

export const training: TrainingApi = {
  id: '1',

  title: 'First training',
  author: {
    id: account.id,
    nickname: account.nickname,
  },

  createdAt: '2022-03-20T22:12:07.399Z' as any,
  updatedAt: '2022-03-20T22:12:07.399Z' as any,

  elements: [
    {
      baseExercise: {
        id: '1',
        title: 'Подтягивания',
      },
      type: ElementType.EXERCISE,
      completionType: ExerciseCompletionType.REPS,
      reps: 10,
      restAfterComplete: 30000,
    },
    {
      type: ElementType.SET,
      elements: [
        {
          baseExercise: {
            id: '1',
            title: 'Подтягивания',
          },
          type: ElementType.EXERCISE,

          completionType: ExerciseCompletionType.REPS,
          reps: 10,
          restAfterComplete: 30000,
        },
        {
          baseExercise: {
            id: '1',
            title: 'Подтягивания',
          },
          type: ElementType.EXERCISE,

          completionType: ExerciseCompletionType.TIME,
          time: 15000,
          restAfterComplete: 30000,
        },
        {
          baseExercise: {
            id: '1',
            title: 'Подтягивания',
          },
          type: ElementType.EXERCISE,
          completionType: ExerciseCompletionType.GYM,
          reps: 10,
          kg: 150,
          restAfterComplete: 30000,
        },
      ],
      restAfterComplete: 90000,
    },
    {
      type: ElementType.SET,
      elements: [
        {
          baseExercise: {
            id: '1',
            title: 'Подтягивания',
          },
          type: ElementType.EXERCISE,
          completionType: ExerciseCompletionType.REPS,
          reps: 10,
          restAfterComplete: 1000,
        },
        {
          baseExercise: {
            id: '1',
            title: 'Подтягивания',
          },
          type: ElementType.EXERCISE,

          completionType: ExerciseCompletionType.TIME,
          time: 15000,
          restAfterComplete: 15000,
        },
        {
          baseExercise: {
            id: '1',
            title: 'Подтягивания',
          },
          type: ElementType.EXERCISE,

          completionType: ExerciseCompletionType.GYM,
          reps: 10,
          kg: 150,
          restAfterComplete: 15000,
        },
      ],
      restAfterComplete: 90000,
    },
  ],
};

export const exercises: ExerciseApi[] = [
  {id: '1', title: 'Подтягивания'},
  {id: '2', title: 'Бег', completionType: ExerciseCompletionType.TIME},
];
