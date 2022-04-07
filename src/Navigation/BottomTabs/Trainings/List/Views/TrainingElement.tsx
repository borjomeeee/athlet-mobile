import s from '@borjomeeee/rn-styles';
import React from 'react';

import * as UI from 'src/Components';
import {Training} from 'src/Store/Models/Training';

import dayjs from 'dayjs';
import {useTrainingListTrainingElementController} from '../Hooks';

interface TrainingElementProps {
  training: Training;
}
export const TrainingElement: React.FC<TrainingElementProps> = ({training}) => {
  const {handlePress} = useTrainingListTrainingElementController(training.id);

  const formattedCreationDate = React.useMemo(
    () => dayjs(training.createdAt).format('DD/MM/YYYY'),
    [training.createdAt],
  );

  return (
    <UI.PressableItem
      onPress={handlePress}
      style={s(
        `btw:1 bbw:1 bc:ultraLightGray container pt:13 pb:15`,
        `bgc:white`,
      )}>
      <>
        <UI.Text style={s(`P7 medium`)}>{training.title}</UI.Text>
        <UI.HSpacer size={7} />
        <UI.Text style={s(`P8`)}>
          Дата создания - {formattedCreationDate}
        </UI.Text>
      </>
    </UI.PressableItem>
  );
};
