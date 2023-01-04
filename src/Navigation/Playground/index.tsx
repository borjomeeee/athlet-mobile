import React from 'react';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {Content} from './Views/Content';
import {usePlayground} from './Hooks';
import {isFinishedStore, isPauseStore, startTimeStore} from './Store';
import * as UI from 'src/Components';

import {Preview} from './Views/Preview';
import s from '@borjomeeee/rn-styles';
import {StatusBar} from 'react-native';
import {withHooks} from 'src/Utils/HOCs';

import {
  usePlaygroundNavigationEffect,
  usePlaygroundInitialTraining,
} from './Hooks';
import {Pause} from './Views/Pause';

export const Playground = withHooks(
  [usePlaygroundNavigationEffect, usePlaygroundInitialTraining],
  () => {
    const {reset, saveAndClose} = usePlayground();

    const startTime = useRecoilValue(startTimeStore);
    const isPause = useRecoilValue(isPauseStore);

    const handleCloseApp = useRecoilCallback(
      ({get}) =>
        () => {
          if (get(startTimeStore) && !get(isFinishedStore)) {
            saveAndClose();
            return;
          }
        },
      [saveAndClose],
    );

    React.useEffect(() => () => handleCloseApp(), [handleCloseApp]);
    React.useEffect(() => () => reset(), [reset]);

    return (
      <>
        <StatusBar barStyle="light-content" />
        <UI.View style={s(`fill bgc:playgroundBg`)}>
          {!startTime ? <Preview /> : <Content />}
          {isPause && <Pause />}
        </UI.View>
      </>
    );
  },
);
