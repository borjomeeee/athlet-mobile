import React from 'react';
import {useRecoilValue} from 'recoil';
import {Content} from './Views/Content';
import {usePlayground} from './Hooks';
import {startTimeStore} from './Store';
import * as UI from 'src/Components';

import {Preview} from './Views/Preview';
import s from '@borjomeeee/rn-styles';
import {StatusBar} from 'react-native';
import {playgroundClock} from './Clock';
import {withHooks} from 'src/Utils/HOCs';

import {
  usePlaygroundNavigationEffect,
  usePlaygroundInitialTraining,
} from './Hooks';

export const Playground = withHooks(
  [usePlaygroundNavigationEffect, usePlaygroundInitialTraining],
  () => {
    const {reset} = usePlayground();

    const startTime = useRecoilValue(startTimeStore);
    React.useEffect(() => () => reset(), [reset]);

    React.useEffect(() => {
      if (startTime) {
        playgroundClock.start();
        return () => playgroundClock.stop();
      }
    }, [startTime]);

    return (
      <>
        <StatusBar barStyle="light-content" />
        <UI.View style={s(`fill bgc:playgroundBg`)}>
          {!startTime ? <Preview /> : <Content />}
        </UI.View>
      </>
    );
  },
);
