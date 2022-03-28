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

export type UserPreviewApi = z.input<typeof UserPreviewScheme>;
export type UserPreview = z.output<typeof UserPreviewScheme>;

export type UserApi = z.input<typeof UserScheme>;
export type User = z.output<typeof UserScheme>;
