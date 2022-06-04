import s from '@borjomeeee/rn-styles';
import React from 'react';
import {TextStyle} from 'react-native';
import {SelectWheel, SelectWheelProps, Text, View} from 'src/Components/Common';
import {Centered} from 'src/Components/Unique';

export interface SelectTimeWheelProps
  extends Omit<SelectWheelProps, 'start' | 'end'> {
  labelStyle?: TextStyle;
}
export const SelectTimeWheel: React.FC<SelectTimeWheelProps> = ({
  defaultValue = 15,
  onChangeValue,
  labelStyle,
  ...props
}) => {
  const [selectedMins, setSelectedMins] = React.useState(
    Math.floor(defaultValue / 60),
  );
  const [selectedSecs, setSelectedSecs] = React.useState(defaultValue % 60);

  const time = React.useMemo(
    () => selectedMins * 60 + selectedSecs,
    [selectedMins, selectedSecs],
  );

  React.useEffect(() => {
    onChangeValue?.(time);
  }, [time, onChangeValue]);

  const middleLStyle = React.useMemo(
    () => [s(`P4 medium`), labelStyle],
    [labelStyle],
  );

  const lStyle = React.useMemo(
    () => [s(`P7 medium`), labelStyle],
    [labelStyle],
  );
  return (
    <View style={s(`row aic`)}>
      <View>
        <Text style={lStyle}>мин.</Text>
      </View>
      <SelectWheel
        start={0}
        end={99}
        onChangeValue={setSelectedMins}
        defaultValue={selectedMins}
        {...props}
      />

      <View>
        <Text style={middleLStyle}>:</Text>
      </View>
      <SelectWheel
        start={0}
        end={59}
        onChangeValue={setSelectedSecs}
        defaultValue={selectedSecs}
        {...props}
      />
      <View>
        <Text style={lStyle}>сек.</Text>
      </View>
    </View>
  );
};
