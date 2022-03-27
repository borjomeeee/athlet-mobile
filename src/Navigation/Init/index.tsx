import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';

import {useAppController} from 'src/Services/App';

export const Init = () => {
  const {init} = useAppController();

  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <UI.View style={s(`fill aic jcc`)}>
      <UI.Text style={s(`P3 bold`)}>Init</UI.Text>
    </UI.View>
  );
};
