import s from '@borjomeeee/rn-styles';
import React from 'react';
import * as UI from 'src/Components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from './Views/Header';
import {CurrentElement} from './Views/CurrentElement';
import {Actions} from './Views/Actions';

export const Content = () => {
  return (
    <SafeAreaView style={s(`fill`)}>
      <Header />
      <UI.HSpacer size={45} />
      <UI.View style={s(`fill`)}>
        <CurrentElement />
      </UI.View>
      <Actions />
      <UI.HSpacer size={20} />
    </SafeAreaView>
  );
};
