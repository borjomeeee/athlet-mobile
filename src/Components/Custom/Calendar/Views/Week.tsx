import s from '@borjomeeee/rn-styles';

import React from 'react';
import {View} from 'src/Components/Common';

import {Day} from './Day';

type WeekDates = (Date | undefined)[];
interface WeekProps {
  dates: WeekDates;
}
export const Week: React.FC<WeekProps> = ({dates}) => {
  return (
    <View style={s(`row jcsb pv:10`)}>
      {dates.map((date, indx) => (
        <Day key={date?.toISOString() || indx.toString()} date={date} />
      ))}
    </View>
  );
};
