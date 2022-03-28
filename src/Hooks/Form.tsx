import React from 'react';
import {RecoilState, useSetRecoilState} from 'recoil';

export const useInputRecoilState = (
  valueAtom: RecoilState<string>,
  errorAtom: RecoilState<string>,

  notTrim?: boolean,
) => {
  const setValue = useSetRecoilState(valueAtom);
  const setError = useSetRecoilState(errorAtom);

  const handleChangeValue = React.useCallback(
    (text: string) => {
      let resText = text;
      if (!notTrim) {
        resText = resText.trim();
      }

      setValue(resText);
      setError('');
    },
    [setValue, setError, notTrim],
  );

  return {
    setValue: handleChangeValue,
    setError,
  };
};
