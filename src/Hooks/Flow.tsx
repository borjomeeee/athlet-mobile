import React from 'react';

type AnyFunc<T> = (arg: T) => Promise<unknown>;
export const useFlow = <T,>(cb: AnyFunc<T>, deps: any[]) => {
  return React.useCallback<typeof cb>(
    (...args) => {
      return cb(...args).catch(e => console.log(e.message));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deps],
  );
};
