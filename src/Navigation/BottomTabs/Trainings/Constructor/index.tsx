import s from '@borjomeeee/rn-styles';
import React from 'react';

import * as UI from 'src/Components';
import {useTrainingConstructorHeader} from './Hooks';
import {AddElementButton} from './Views/AddElementButton';
import {Header} from './Views/Header';

export const Constructor = () => {
  useTrainingConstructorHeader();
  return (
    <UI.ScrollView style={s(`fill bgc:layout`)}>
      <Header />
      <UI.HSpacer size={8} />
      <AddElementButton />
    </UI.ScrollView>
  );
};
