import React from 'react';
import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Header} from './Views/Header';
import {Content} from './Views/Content';
import {useFocusEffect} from '@react-navigation/core';
import {useSignUpController} from './Hooks';

export const SignUp = () => {
  const {resetForm} = useSignUpController();

  useFocusEffect(React.useCallback(() => () => resetForm(), [resetForm]));

  return (
    <UI.View style={s(`fill bgc:layout`)}>
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
