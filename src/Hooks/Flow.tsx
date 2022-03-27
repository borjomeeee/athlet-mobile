import React from 'react';
import {Logger} from 'src/Utils/Logger';

type FlowReturnType<T> = Promise<[Awaited<T>, undefined] | [undefined, Error]>;
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
  flowId: string,
  cb: T,
  deps: any[],
) => {
  return React.useCallback(
    async (
      ...args: Parameters<T>
    ): Promise<FlowReturnType<ReturnType<typeof cb>>> => {
      if (flowsStack[flowId]) {
        const e = new FlowAlreadyStartedError(flowId);
        Logger.error(e.message);

        return [undefined, e];
      }

      try {
        flowsStack[flowId] = true;
        return [await cb(...args), undefined];
      } catch (e) {
        Logger.error(e.message);
        return [undefined, new Error()];
      } finally {
        delete flowsStack[flowId];
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );
};

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
