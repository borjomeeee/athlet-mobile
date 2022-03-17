import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';

import {Header} from './Views/Header';
import {Content} from './Views/Content';

export const SignIn = () => {
  return (
    <UI.View style={s(`fill bgc:white`)}>
      <UI.ScrollView contentContainerStyle={s(`fill pb:14`)}>
        <SafeAreaView style={s(`fill`)}>
          <Header />
          <UI.View style={s(`fill`)} />
          <Content />

          <UI.HSpacer size={88} />

          <UI.View style={s(`aic`)}>
            <UI.DeveloperInfo />
          </UI.View>
        </SafeAreaView>
      </UI.ScrollView>
    </UI.View>
  );
};
