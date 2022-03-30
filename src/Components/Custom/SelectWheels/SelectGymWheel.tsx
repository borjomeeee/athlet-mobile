import s from '@borjomeeee/rn-styles';
import React from 'react';
import {SelectWheel, Text, View} from 'src/Components/Common';

interface SelectGymWheelProps {
  reps?: number;
  weight?: number;
}
export const SelectGymWheel: React.FC<SelectGymWheelProps> = ({
  reps = 10,
  weight = 40,
}) => {
  return (
    <View style={s(`rel row`)}>
      <View style={s(`abs t:0 b:0 l:-45 aic jcc zi:-1`)}>
        <Text style={s(`P7 medium`)}>reps.</Text>
      </View>
      <SelectWheel start={0} end={99} defaultValue={reps} />
      <View style={s(`abs t:0 b:0 r:80 pb:3 aic jcc zi:-1`)}>
        <Text style={s(`P5 medium`)}>x</Text>
      </View>
      <SelectWheel width={90} start={0} end={240} defaultValue={weight} />
      <View style={s(`abs t:0 b:0 r:-17 aic jcc zi:-1`)}>
        <Text style={s(`P7 medium`)}>kg.</Text>
      </View>
    </View>
  );
};
