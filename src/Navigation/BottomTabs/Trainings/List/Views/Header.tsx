import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';

export const Header = () => {
  return (
    <UI.View
      style={s(`h:88 aic jcc bgc:#fff bbw:1 bc:ultraLightGray pt:13 pb:15`)}>
      <UI.Text style={s(`P5 medium`)}>Мои тренировки</UI.Text>
    </UI.View>
  );
};
