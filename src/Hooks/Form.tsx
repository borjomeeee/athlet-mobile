import React from 'react';
import {RecoilState, useRecoilState} from 'recoil';

export const useInputRecoilState = (
  valueAtom: RecoilState<string>,
  errorAtom: RecoilState<string>,

  notTrim?: boolean,
) => {
  const [value, setValue] = useRecoilState(valueAtom);
  const [error, setError] = useRecoilState(errorAtom);

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
    value,
    setValue: handleChangeValue,

    error,
    setError,
  };
};
