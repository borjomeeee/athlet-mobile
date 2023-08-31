import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CalendarComponent} from './Views/CalendarComponent';

export const Calendar = () => {
  const {top} = useSafeAreaInsets();

  return (
    <UI.View style={s(`fill bgc:layout`)}>
      <UI.View style={s(`container bgc:white`)}>
        <UI.HSpacer size={top + 25} />
        <CalendarComponent />
      </UI.View>
      <UI.View style={s(`fill`)} />
    </UI.View>
  );
};
