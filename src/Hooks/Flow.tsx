import React from 'react';

export const useFlow = <T extends (...args: any[]) => any>(
  cb: T,
  deps: any[],
) => {
  return React.useCallback(
    (...args: Parameters<typeof cb>) => {
      return cb(...args).catch((e: Error) =>
        console.log(e.message),
      ) as ReturnType<T>;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deps],
  );
};
