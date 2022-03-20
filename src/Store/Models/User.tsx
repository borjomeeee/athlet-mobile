import {z} from 'zod';
import {MayBeStringScheme} from './Common';

export const UserPreviewScheme = z.object({
  id: MayBeStringScheme,
  nickname: MayBeStringScheme.default('Undefined'),
});

export const UserScheme = z.object({
  id: z.string(),
  nickname: MayBeStringScheme.default('Undefined'),

  email: MayBeStringScheme.default(''),
});

export type UserPreview = z.TypeOf<typeof UserPreviewScheme>;
export type User = z.TypeOf<typeof UserScheme>;
