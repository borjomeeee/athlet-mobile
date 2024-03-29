import React from 'react';
import {withHooks} from 'src/Utils/HOCs';
import {useTrainingEventNavigationEffect} from './Hooks/NavigationEffect';
import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {Header} from './Views/Header';
import {Content} from './Views/Content';
import {useTrainingEventController} from './Controller';

export const TrainingEvent = withHooks(
  [useTrainingEventNavigationEffect],
  () => {
    const {reset} = useTrainingEventController();
    React.useEffect(() => () => reset(), [reset]);

    return (
      <UI.ScrollView
        style={s(`fill bgc:layout`)}
        contentContainerStyle={s(`pb:100`)}
        bounces={false}>
        <Header />
        <UI.HSpacer size={8} />
        <Content />
      </UI.ScrollView>
    );
  },
);
