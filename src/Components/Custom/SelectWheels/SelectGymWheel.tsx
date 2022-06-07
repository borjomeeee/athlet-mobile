import s from '@borjomeeee/rn-styles';
import React from 'react';
import {SelectWheel, Text, View} from 'src/Components/Common';

interface SelectGymWheelProps {
  reps?: number;
  weight?: number;

  onChangeReps?: (value: number) => void;
  onChangeWeight?: (value: number) => void;
}
export const SelectGymWheel: React.FC<SelectGymWheelProps> = ({
  reps = 10,
  weight = 40,
  onChangeReps,
  onChangeWeight,
}) => {
  return (
    <View style={s(`row aic`)}>
      <View>
        <Text style={s(`P7 medium`)}>reps.</Text>
      </View>
      <SelectWheel
        start={0}
        end={99}
        onChangeValue={onChangeReps}
        defaultValue={reps}
      />
      <View>
        <Text style={s(`P5 medium l:5`)}>x</Text>
      </View>
      <SelectWheel
        width={90}
        start={0}
        end={240}
        onChangeValue={onChangeWeight}
        defaultValue={weight}
      />
      <View>
        <Text style={s(`P7 medium`)}>kg.</Text>
      </View>
    </View>
  );
};
