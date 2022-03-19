type FlowReturnType<T> = [T, undefined] | [undefined, Error];
export const flow = async <T extends () => Promise<any>>(
  cb: T,
): Promise<FlowReturnType<ReturnType<typeof cb>>> => {
  try {
    return [await cb(), undefined];
  } catch (e) {
    console.error(e.message);
    return [undefined, e];
  }
};
