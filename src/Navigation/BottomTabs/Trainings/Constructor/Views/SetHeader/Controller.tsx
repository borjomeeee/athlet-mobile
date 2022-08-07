import React from 'react';
import {useRecoilCallback} from 'recoil';
import {
  useTrainingConstructorHistory,
  constructorElementsByIdSelector,
} from '../../Store';
import {SetWithId} from '../../Store/Types';

export const useSetHeaderController = (id: string) => {
  const {replaceSet} = useTrainingConstructorHistory();

  const handleChangeSetTitle = useRecoilCallback(
    ({get}) =>
      (title: string) => {
        const set = get(constructorElementsByIdSelector)[id] as SetWithId;
        replaceSet(id, {...set, title});
      },
    [replaceSet, id],
  );

  return {handleChangeSetTitle};
};
