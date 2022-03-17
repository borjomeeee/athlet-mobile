import React from 'react';

type AnyFunc<T, R> = (...args: T[]) => Promise<R>;
export const useFlow = <T, R>(cb: AnyFunc<T, R>, deps: any[]) => {
  return React.useCallback(
    async (...args: T[]) => {
      try {
        return await cb(...args);
      } catch (e) {
        console.log(e.message);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deps],
  );
};
