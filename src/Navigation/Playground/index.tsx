import React from 'react';
import {useRecoilValue} from 'recoil';
import {Content} from './Views/Content';
import {usePlayground} from './Hooks';
import {isPauseStore, startTimeStore} from './Store';
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
    const {reset} = usePlayground();

    const startTime = useRecoilValue(startTimeStore);
    const isPause = useRecoilValue(isPauseStore);

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
