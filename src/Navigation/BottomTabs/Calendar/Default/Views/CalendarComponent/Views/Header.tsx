import React from 'react';
import * as UI from 'src/Components';

import s from '@borjomeeee/rn-styles';
import {useRecoilValue} from 'recoil';
import {showedDateStore} from '../../../Store';
import {MonthsByIndex} from 'src/Utils/Dates';
import {Controls} from './Controls';

export const Header = () => {
  const showedDate = useRecoilValue(showedDateStore);
  const currentYear = React.useMemo(
    () => new Date(showedDate).getFullYear(),
    [showedDate],
  );

  const currentMonth = React.useMemo(
    () => MonthsByIndex[new Date(showedDate).getMonth()],
    [showedDate],
  );

  return (
    <UI.View style={s(`row aic`)}>
      <UI.View style={s(`fill`)}>
        <UI.Text style={s(`P5 medium`)}>{currentMonth}</UI.Text>
        <UI.Text style={s(`medium c:gray`)}>{currentYear}</UI.Text>
      </UI.View>

      <Controls />
    </UI.View>
  );
};
