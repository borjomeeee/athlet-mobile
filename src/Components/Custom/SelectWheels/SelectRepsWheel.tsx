import React from 'react';

import s from '@borjomeeee/rn-styles';
import {SelectWheel, Text, View} from 'src/Components/Common';

interface SelectRepsWheelProps {
  selectedNumber?: number;
}
export const SelectRepsWheel: React.FC<SelectRepsWheelProps> = ({
  selectedNumber = 15,
}) => {
  return (
    <View style={s(`rel`)}>
      <SelectWheel start={0} end={99} defaultValue={selectedNumber} />
      <View style={s(`abs t:0 b:0 l:60 aic jcc zi:-1`)}>
        <Text style={s(`P6 medium`)}>раз</Text>
      </View>
    </View>
  );
};
