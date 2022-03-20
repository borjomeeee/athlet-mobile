import {Logger} from 'src/Utils/Logger';

type FlowReturnType<T> = [T, undefined] | [undefined, Error];
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
export const flow = async <T extends () => Promise<any>>(
  cb: T,
  id?: string,
): Promise<FlowReturnType<ReturnType<typeof cb>>> => {
  const flowId = id ?? Date.now().toString();
  if (flowsStack[flowId]) {
    const e = new FlowAlreadyStartedError(flowId);
    Logger.error(e.message);

    return [undefined, e];
  }

  try {
    flowsStack[flowId] = true;
    return [await cb(), undefined];
  } catch (e) {
    Logger.error(e.message);
    return [undefined, e];
  } finally {
    delete flowsStack[flowId];
  }
};
