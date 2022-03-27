import s from '@borjomeeee/rn-styles';
import React from 'react';

import * as UI from 'src/Components';
import {Training} from 'src/Store/Models/Training';

import dayjs from 'dayjs';

interface TrainingElementProps {
  trainining: Training;
}
export const TrainingElement: React.FC<TrainingElementProps> = ({
  trainining,
}) => {
  const formattedCreationDate = React.useMemo(
    () => dayjs(trainining.createdAt).format('DD/MM/YYYY'),
    [trainining.createdAt],
  );
  return (
    <UI.View
      style={s(
        `btw:1 bbw:1 bc:ultraLightGray container pt:13 pb:15`,
        `bgc:white`,
      )}>
      <UI.Text style={s(`P7 medium`)}>{trainining.title}</UI.Text>
      <UI.HSpacer size={7} />
      <UI.Text style={s(`P8`)}>Дата создания - {formattedCreationDate}</UI.Text>
    </UI.View>
  );
};
