import s from '@borjomeeee/rn-styles';
import dayjs from 'dayjs';
import React from 'react';
import {Text, View} from 'src/Components/Common';

interface DayProps {
  date: Date | undefined;
}
export const Day: React.FC<DayProps> = ({date}) => {
  return (
    <View style={s(`w:20 h:16 aic jcc`)}>
      {date && <Text>{dayjs(date).date()}</Text>}
    </View>
  );
};
