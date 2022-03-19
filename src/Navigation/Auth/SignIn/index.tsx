import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';

import {Header} from './Views/Header';
import {Content} from './Views/Content';
import {useSignInController} from './Hooks';
import {useFocusEffect} from '@react-navigation/core';

export const SignIn = () => {
  const {resetForm} = useSignInController();

  useFocusEffect(React.useCallback(() => () => resetForm(), [resetForm]));

  return (
    <UI.View style={s(`fill bgc:white`)}>
      <SafeAreaView style={s(`fill container pb:14`)}>
        <UI.HSpacer size={57} />
        <Header />

        <UI.KeyboardAvoidingView style={s(`fill`)}>
          <UI.View style={s(`fill`)} />
          <UI.View>
            <UI.ScrollView style={s(`ofv zi:10`)}>
              <Content />
              <UI.HSpacer size={20} />
            </UI.ScrollView>
          </UI.View>
        </UI.KeyboardAvoidingView>

        <UI.HSpacer size={68} />

        <UI.View style={s(`aic`)}>
          <UI.DeveloperInfo />
        </UI.View>
      </SafeAreaView>
    </UI.View>
  );
};
