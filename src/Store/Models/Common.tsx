import {z, ZodTypeAny} from 'zod';

export const canBeNull = <T extends ZodTypeAny>(item: T) =>
  item.nullish().transform(val => {
    if (val === null || val === undefined) {
      return undefined;
    }

    return val;
  });

export const MayBeStringScheme = canBeNull(z.string());
export const MayBeIntegerScheme = canBeNull(z.number().int());

export const MayBeDateScheme = z.preprocess(arg => {
  if (typeof arg === 'string' || arg instanceof Date) {
    return new Date(arg);
  }
}, canBeNull(z.date()));
