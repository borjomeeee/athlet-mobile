import s from '@borjomeeee/rn-styles';
import React from 'react';
import {Text, View} from 'src/Components/Common';

const dayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

export const DayNames = () => {
  return (
    <View style={s(`row bgc:layout container jcsb`)}>
      {dayNames.map(name => (
        <Text key={name} style={s(`fsz:10 c:#ACACAC`)}>
          {name}
        </Text>
      ))}
    </View>
  );
};
