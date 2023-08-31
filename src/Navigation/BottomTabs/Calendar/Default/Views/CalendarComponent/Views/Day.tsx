import dayjs from 'dayjs';
import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';

export interface DayProps {
  date: number;
  hidden: boolean;
}
export const Day: React.FC<DayProps> = ({date}) => {
  const day = React.useMemo(() => dayjs(date).get('date'), [date]);
  return (
    <UI.Pressable style={s(`rel w:20 h:20 aic jcc`)}>
      <UI.Text>{day}</UI.Text>
    </UI.Pressable>
  );
};
