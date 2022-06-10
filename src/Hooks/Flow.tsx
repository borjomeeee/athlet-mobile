import React from 'react';
import {Id} from 'src/Utils/Id';
import {Logger} from 'src/Utils/Logger';

type FlowReturnType<T> = Promise<[Awaited<T>, undefined] | [undefined, Error]>;

export const asyncCall = async <
  T extends (...args: any[]) => Promise<any> | any,
>(
  cb: T,
): FlowReturnType<ReturnType<typeof cb>> => {
  try {
    return [await cb(), undefined];
  } catch (e) {
    return [undefined, e];
  }
};
export class FlowAlreadyStartedError extends Error {
  flowId: string;
  message: string;

  constructor(flowId: string) {
    super();

    this.flowId = flowId;
    this.message = `Flow already started, flowId: ${flowId}`;
  }
}

const flowsStack: Record<string, true | undefined> = {};
export const useFlow = <T extends (...args: any[]) => Promise<any> | any>(
  cb: T,
  deps: any[],
  flowId: string = Id.generate(),
) => {
  return React.useCallback(
    async (...args: Parameters<T>): FlowReturnType<ReturnType<typeof cb>> => {
      if (flowsStack[flowId]) {
        const e = new FlowAlreadyStartedError(flowId);
        Logger.error(e.message);

        return [undefined, e];
      }

      const result = await asyncCall(() => cb(...args));
      delete flowsStack[flowId];

      return result;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );
};

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
