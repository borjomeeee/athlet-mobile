import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const Header = () => {
  const {top} = useSafeAreaInsets();
  return (
    <UI.View style={s(`container`)}>
      <UI.HSpacer size={top} />
      <UI.Text style={s(`P3 semibold pt:40 pb:30`)}>Мои тренировки</UI.Text>
    </UI.View>
  );
};
