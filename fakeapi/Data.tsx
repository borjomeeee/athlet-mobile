import {
  ElementType,
  ExerciseCompletionType,
  Training,
} from 'src/Store/Models/Training';
import {User} from 'src/Store/Models/User';

export const account: User = {
  id: '1',
  email: 'test@test.com',
  nickname: 'borjome',
};

export const training: Training = {
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
      type: ElementType.EXERCISE,
      title: 'Подтягивания',
      completionType: ExerciseCompletionType.REPS,
      reps: 10,
    },
    {
      type: ElementType.SET,
      elements: [
        {
          type: ElementType.EXERCISE,
          title: 'Подтягивания',
          completionType: ExerciseCompletionType.REPS,
          reps: 10,
        },
        {
          type: ElementType.REST,
          duration: 10,
        },
        {
          type: ElementType.EXERCISE,
          title: 'Подтягивания',
          completionType: ExerciseCompletionType.REPS,
          reps: 10,
        },
      ],
    },
    {
      type: ElementType.REST,
      duration: 10,
    },
    {
      type: ElementType.SET,
      elements: [
        {
          type: ElementType.EXERCISE,
          title: 'Подтягивания',
          completionType: ExerciseCompletionType.REPS,
          reps: 10,
        },
        {
          type: ElementType.REST,
          duration: 10,
        },
        {
          type: ElementType.EXERCISE,
          title: 'Подтягивания',
          completionType: ExerciseCompletionType.REPS,
          reps: 10,
        },
      ],
    },
  ],
};
