import React from 'react';
import {TrainingEvent} from 'src/Store/Models/Training';

import * as UI from 'src/Components';
import RightArrowIcon from 'src/Assets/Svg/RightArrow';
import s from '@borjomeeee/rn-styles';
import {useTrainingEventController} from './Controller';

interface TrainingEventCardProps {
  trainingEvent: TrainingEvent;
}
export const TrainingEventCard: React.FC<TrainingEventCardProps> = ({
  trainingEvent,
}) => {
  const {handlePress} = useTrainingEventController(trainingEvent.id);
  return (
    <UI.View style={s(`container`)}>
      <UI.Scalable onPress={handlePress}>
        <UI.ShadowView dx={0} dy={0} color={'#E1E4E875'} blur={10}>
          <UI.View style={s(`row bgc:white br:20 ph:16 pv:10 aic`)}>
            <UI.View style={s(`fill`)}>
              <UI.Text style={s(`P7 medium`)}>
                {trainingEvent.initialTraining.title}
              </UI.Text>
            </UI.View>
            <RightArrowIcon />
          </UI.View>
        </UI.ShadowView>
      </UI.Scalable>
    </UI.View>
  );
};
