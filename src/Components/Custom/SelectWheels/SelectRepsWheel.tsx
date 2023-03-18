import React from 'react';

import s from '@borjomeeee/rn-styles';
import {SelectWheel, SelectWheelProps, Text, View} from 'src/Components/Common';
import {TextStyle} from 'react-native';

export interface SelectRepsWheelProps
  extends Omit<SelectWheelProps, 'start' | 'end'> {
  labelStyle?: TextStyle;
}
export const SelectRepsWheel: React.FC<SelectRepsWheelProps> = ({
  defaultValue = 15,
  labelStyle,
  ...props
}) => {
  const lStyle = React.useMemo(
    () => [s(`P6 medium`), labelStyle],
    [labelStyle],
  );

  return (
    <View style={s(`row aic l:18`)}>
      <SelectWheel start={0} end={99} defaultValue={defaultValue} {...props} />
      <View>
        <Text style={lStyle}>раз</Text>
      </View>
    </View>
  );
};
