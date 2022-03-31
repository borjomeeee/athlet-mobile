import s from '@borjomeeee/rn-styles';
import React from 'react';

import * as UI from 'src/Components';
import {useTrainingConstructorHeader} from './Hooks';
import {AddElementButton} from './Views/AddElementButton';
import {ElementsList} from './Views/ElementsList';
import {Header} from './Views/Header';

export const Constructor = () => {
  useTrainingConstructorHeader();
  return (
    <UI.ScrollView
      style={s(`fill bgc:layout`)}
      contentContainerStyle={s(`pb:100`)}>
      <Header />
      <UI.HSpacer size={8} />
      <ElementsList />
      <AddElementButton />
    </UI.ScrollView>
  );
};
