import s from '@borjomeeee/rn-styles';
import React from 'react';
import * as UI from 'src/Components';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';

interface SetFooterProps {
  initialRest: number;
  completedRest?: number;
}
export const SetFooter: React.FC<SetFooterProps> = ({
  initialRest,
  completedRest,
}) => {
  const formattedInitialRest = React.useMemo(() => {
    const restStr = TimeUtils.getFormattedTimeForTraining(initialRest);

    return initialRest ? `Отдых - ${restStr}` : 'Без отдыха';
  }, [initialRest]);

  const diffRest = React.useMemo(() => {
    if (completedRest) {
      return completedRest - initialRest;
    } else {
      return -initialRest;
    }
  }, [initialRest, completedRest]);

  const renderRest = React.useCallback(() => {
    if (diffRest === 0) {
      return formattedInitialRest;
    } else {
      const completedExerciseRest = TimeUtils.getFormattedTimeForTraining(
        completedRest || 0,
      );

      const initialExerciseRest =
        TimeUtils.getFormattedTimeForTraining(initialRest);

      return (
        <UI.View style={s(`row aic`)}>
          <UI.Text>
            <UI.Text style={s(`P8 medium c:gray`)}>Отдых - </UI.Text>
            <UI.Text style={s(`P8 medium c:gray o:0.5 removed`)}>
              {initialExerciseRest}
            </UI.Text>
            <UI.Text style={s(`P8 medium`)}> </UI.Text>
            <UI.Text style={s(`P8 medium c:gray`)}>
              {completedExerciseRest}
            </UI.Text>
            <UI.Text style={s(`P8 medium`)}> </UI.Text>
          </UI.Text>
          <UI.VSpacer size={5} />
          <UI.Text style={s(`P8 c:red`, diffRest < 0 && `c:green`)}>
            {TimeUtils.getFormattedTimeForTraining(diffRest)}
          </UI.Text>
        </UI.View>
      );
    }
  }, [diffRest, initialRest, completedRest, formattedInitialRest]);

  return <UI.View style={s(`h:34 aic jcc`)}>{renderRest()}</UI.View>;
};
