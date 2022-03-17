import React from 'react';
import {View, Text} from 'src/Components';
import s from '@borjomeeee/rn-styles';

export const DeveloperInfo = () => {
  return (
    <View style={s(`bw:1 bc:ultraLightGray aic jcc pv:6 ph:15`)}>
      <Text style={s(`fsz:14 bold c:lightGray`)}>powered by</Text>
      <Text style={s(`fsz:14 bold`)}>SPIRIDONOV ANDREY</Text>
    </View>
  );
};
