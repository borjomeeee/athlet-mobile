import React from 'react';
import s from '@borjomeeee/rn-styles';

import {View, Text} from 'src/Components';

export const DeveloperInfo = () => {
  return (
    <View style={s(`bgc:white bw:1 bc:ultraLightGray aic jcc pv:6 ph:15`)}>
      <Text style={s(`montserrat c:lightGray`)}>powered by</Text>
      <Text style={s(`montserrat`)}>SPIRIDONOV ANDREY</Text>
    </View>
  );
};
