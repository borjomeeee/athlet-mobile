import s from '@borjomeeee/rn-styles';
import React from 'react';
import * as UI from 'src/Components';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';

interface SetFooterProps {
  rest: number;
}
export const SetFooter: React.FC<SetFooterProps> = ({rest}) => {
  const formattedRest = React.useMemo(() => {
    const restStr = TimeUtils.getFormattedTimeForTraining(rest);
    return restStr ? `Отдых - ${restStr}` : 'Без отдыха';
  }, [rest]);

  return (
    <UI.View style={s(`h:34 aic jcc`)}>
      <UI.Text style={s(`P8 medium c:gray`)}>{formattedRest}</UI.Text>
    </UI.View>
  );
};
