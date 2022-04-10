export const is = <T,>(value: any, comparingValue: T): value is T => {
  return value === comparingValue;
};
