import React from 'react';
import s from '@borjomeeee/rn-styles';

import * as UI from 'src/Components';

export const Header = () => {
  return (
    <UI.View style={s(`bgc:white container bbw:1 bc:ultraLightGray`)}>
      <UI.AnimatedHeightBox>
        <UI.HSpacer size={25} />
        <UI.Input
          style={s(`P5 medium p:0 m:0`)}
          placeholder="Введите название тренировки ..."
          multiline={true}
        />
        <UI.HSpacer size={15} />
      </UI.AnimatedHeightBox>
    </UI.View>
  );
};
