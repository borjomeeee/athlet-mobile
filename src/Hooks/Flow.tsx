import React from 'react';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
type FlowReturnType<T> = [T, undefined] | [undefined, Error];

export const useFlow = <T extends (...args: any[]) => Promise<any>>(
  cb: T,
  deps: any[],
) => {
  return React.useCallback(
    async (
      ...args: Parameters<typeof cb>
    ): Promise<FlowReturnType<Awaited<ReturnType<typeof cb>>>> => {
      try {
        return [await cb(...args), undefined];
      } catch (e) {
        console.error(e.message);
        return [undefined, e];
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deps],
  );
};
