import s from '@borjomeeee/rn-styles';
import React from 'react';
import * as UI from 'src/Components';

interface SetHeaderProps {
  title: string;
}
export const SetHeader: React.FC<SetHeaderProps> = ({title}) => {
  return (
    <UI.View
      style={s(
        `btw:1 bbw:1 bc:ultraLightGray bgc:#F6F8FA`,
        `h:28 row aic ph:16`,
      )}>
      <UI.View style={s(`fill`)}>
        <UI.Text style={s(`P8 bold c:#57606A uppercase`)}>{title}</UI.Text>
      </UI.View>

      <UI.VSpacer size={20} />
    </UI.View>
  );
};
