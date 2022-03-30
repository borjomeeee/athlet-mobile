import s from '@borjomeeee/rn-styles';
import React from 'react';
import {SelectWheel, Text, View} from 'src/Components/Common';

interface SelectTimeWheelProps {
  selectedTime?: number;
}
export const SelectTimeWheel: React.FC<SelectTimeWheelProps> = ({
  selectedTime = 15,
}) => {
  const mins = React.useMemo(
    () => Math.floor(selectedTime / 60),
    [selectedTime],
  );
  const secs = React.useMemo(
    () => Math.floor(selectedTime % 60),
    [selectedTime],
  );

  return (
    <View style={s(`rel row`)}>
      <View style={s(`abs t:0 b:0 l:-35 aic jcc zi:-1`)}>
        <Text style={s(`P7 medium`)}>мин.</Text>
      </View>
      <SelectWheel start={0} end={99} defaultValue={mins} />
      <View style={s(`abs t:0 b:0 r:55 pb:3 aic jcc zi:-1`)}>
        <Text style={s(`P4 medium`)}>:</Text>
      </View>
      <SelectWheel start={0} end={59} defaultValue={secs} />
      <View style={s(`abs t:0 b:0 r:-30 aic jcc zi:-1`)}>
        <Text style={s(`P7 medium`)}>сек.</Text>
      </View>
    </View>
  );
};
