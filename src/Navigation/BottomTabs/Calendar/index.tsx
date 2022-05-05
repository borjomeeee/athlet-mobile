import s from '@borjomeeee/rn-styles';
import React from 'react';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import * as UI from 'src/Components';

export const Calendar = () => {
  return (
    <UI.View style={s(`fill bgc:layout container`)}>
      <SafeAreaView style={s(`fill`)} edges={safeAreaEdges}>
        <UI.HSpacer size={40} />
        <UI.Text style={s(`P3 medium`)}>Календарь</UI.Text>
        <UI.HSpacer size={30} />
        <UI.Calendar id={'home-screen'} />
        <UI.Calendar id={'home-screen-2'} />
      </SafeAreaView>
    </UI.View>
  );
};
const safeAreaEdges: Edge[] = ['top'];
