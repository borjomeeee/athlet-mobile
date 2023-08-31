import React from 'react';
import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';
import {Day, DayProps} from './Day';

interface WeekProps {
  days: DayProps[];
}
export const Week: React.FC<WeekProps> = ({days}) => {
  return (
    <UI.View style={s(`row jcsb`)}>
      {days.map(day => (
        <Day key={day.date} {...day} />
      ))}
    </UI.View>
  );
};
