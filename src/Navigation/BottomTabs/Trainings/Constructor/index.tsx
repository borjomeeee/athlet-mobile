import s from '@borjomeeee/rn-styles';
import {useFocusEffect} from '@react-navigation/core';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

import * as UI from 'src/Components';
import {
  useTrainingConstructorController,
  useTrainingConstructorHeader,
} from './Hooks';
import {AddElementButton} from './Views/AddElementButton';
import {ElementsList} from './Views/ElementsList';
import {Header} from './Views/Header';

export const Constructor = () => {
  const {reset} = useTrainingConstructorController();
  useTrainingConstructorHeader();

  useFocusEffect(React.useCallback(() => () => reset(), [reset]));

  return (
    <ScrollView
      style={s(`fill bgc:layout`)}
      contentContainerStyle={s(`pb:100`)}
      scrollEnabled={false}>
      <Header />
      <UI.HSpacer size={8} />
      <ElementsList />
      <AddElementButton />
    </ScrollView>
  );
};
