import s from '@borjomeeee/rn-styles';

import React from 'react';
import {View} from 'src/Components/Common';

import {Day} from './Day';

type WeekDates = (Date | undefined)[];
interface WeekProps {
  dates: WeekDates;
  calendarId: string;
}
export const Week: React.FC<WeekProps> = React.memo(({dates, calendarId}) => {
  return (
    <View style={s(`row jcsb pv:10`)}>
      {dates.map((date, indx) => (
        <Day
          key={date?.toISOString() || indx.toString()}
          calendarId={calendarId}
          date={date}
        />
      ))}
    </View>
  );
});
