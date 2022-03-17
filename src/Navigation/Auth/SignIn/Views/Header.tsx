import React from 'react';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';

import AuthHeaderIcon from 'src/Assets/Svg/AuthHeaderIcon';
import {Colors} from 'src/Utils/Styles';

export const Header = () => {
  return (
    <UI.View style={s(`asfe`)}>
      <UI.Pressable style={s(`row aic`)}>
        <AuthHeaderIcon fill={Colors.lightGray} />
        <UI.VSpacer size={30} />
        <UI.Text style={s(`uppercase P4 bold c:lightGray`)}>
          Регистрация
        </UI.Text>
      </UI.Pressable>
    </UI.View>
  );
};
