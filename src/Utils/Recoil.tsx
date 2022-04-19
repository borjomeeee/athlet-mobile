import React from 'react';
import {
  atom,
  GetRecoilValue,
  RecoilState,
  RecoilValue,
  RecoilValueReadOnly,
  selector,
  useGetRecoilValueInfo_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';

export const getKeyFabricForDomain = (domain: string) => (key: string) =>
  `[${domain}] ${key}`;

export const RecoilObserver: React.FC<{
  node: RecoilValue<unknown>;
  onChange: <T>(newValue: T) => void;
}> = ({node, onChange}) => {
  const value = useRecoilValue(node);
  React.useEffect(() => onChange(value), [onChange, value]);
  return null;
};

export const useGetRecoilState = <T,>(atomInstance: RecoilValue<T>) => {
  const getRecoilValueInfo = useGetRecoilValueInfo_UNSTABLE();
  return React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => getRecoilValueInfo(atomInstance).loadable?.contents as T,
    [getRecoilValueInfo, atomInstance],
  );
};

export const state = <T,>(key: string, value: T) => atom({key, default: value});
export const select = <T extends (args: GetRecoilValue) => unknown>(
  key: string,
  cb: T,
): RecoilValueReadOnly<ReturnType<T>> =>
  selector({key, get: ({get}) => cb(get) as ReturnType<T>});

export const useRecoilStateActions = <T,>(atomInst: RecoilState<T>) => {
  const get = useGetRecoilState(atomInst);
  const set = useSetRecoilState(atomInst);
  const reset = useResetRecoilState(atomInst);

  return [get, set, reset];
};
