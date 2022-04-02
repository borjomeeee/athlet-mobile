import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';
import {SET_HEADER_HEIGHT} from '../Const';

interface SetHeaderProps {
  setId: string;
  title: string;
}
export const SetHeader: React.FC<SetHeaderProps> = ({setId: _, title}) => {
  return (
    <UI.View
      style={s(
        `btw:1 bbw:1 bc:ultraLightGray bgc:#F6F8FA`,
        `h:${SET_HEADER_HEIGHT} jcc ph:16`,
      )}>
      <UI.Text style={s(`P8 bold c:#57606A`)}>{title}</UI.Text>
    </UI.View>
  );
};
