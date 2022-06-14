import s from '@borjomeeee/rn-styles';
import React from 'react';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {trainingEventStore} from '../Store';

export const Header = () => {
  const trainingEvent = useRecoilValue(trainingEventStore);
  if (!trainingEvent) {
    return null;
  }

  return (
    <UI.View style={s(`bgc:white container bbw:1 bc:ultraLightGray`)}>
      <UI.HSpacer size={25} />
      <UI.Text style={s(`P5 medium`)}>
        {trainingEvent.initialTraining.title || 'Undefined'}
      </UI.Text>

      <UI.HSpacer size={15} />
    </UI.View>
  );
};
