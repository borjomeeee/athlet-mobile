import s from '@borjomeeee/rn-styles';
import React from 'react';
import {SelectWheel, Text, View} from 'src/Components/Common';

interface SelectTimeWheelProps {
  selectedTime?: number;
  onChangeValue?: (value: number) => void;
}
export const SelectTimeWheel: React.FC<SelectTimeWheelProps> = ({
  selectedTime = 15,
  onChangeValue,
}) => {
  const [selectedMins, setSelectedMins] = React.useState(
    Math.floor(selectedTime / 60),
  );
  const [selectedSecs, setSelectedSecs] = React.useState(selectedTime % 60);

  const time = React.useMemo(
    () => selectedMins * 60 + selectedSecs,
    [selectedMins, selectedSecs],
  );

  React.useEffect(() => {
    onChangeValue?.(time);
  }, [time, onChangeValue]);

  return (
    <View style={s(`rel row`)}>
      <View style={s(`abs t:0 b:0 l:-35 aic jcc zi:-1`)}>
        <Text style={s(`P7 medium`)}>мин.</Text>
      </View>
      <SelectWheel
        start={0}
        end={99}
        onChangeValue={setSelectedMins}
        defaultValue={selectedMins}
      />
      <View style={s(`abs t:0 b:0 r:55 pb:3 aic jcc zi:-1`)}>
        <Text style={s(`P4 medium`)}>:</Text>
      </View>
      <SelectWheel
        start={0}
        end={59}
        onChangeValue={setSelectedSecs}
        defaultValue={selectedSecs}
      />
      <View style={s(`abs t:0 b:0 r:-30 aic jcc zi:-1`)}>
        <Text style={s(`P7 medium`)}>сек.</Text>
      </View>
    </View>
  );
};
