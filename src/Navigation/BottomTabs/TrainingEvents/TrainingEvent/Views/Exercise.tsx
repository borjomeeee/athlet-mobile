import React from 'react';
import {ExerciseElement} from 'src/Store/Models/Training';
import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';

interface ExerciseProps {
  initialExercise: ExerciseElement;
  completedExercise?: ExerciseElement;
}
export const Exercise: React.FC<ExerciseProps> = ({
  initialExercise,
  completedExercise,
}) => {
  const formattedRest = React.useMemo(() => {
    const restStr = TimeUtils.getFormattedTimeForTraining(
      initialExercise.restAfterComplete,
    );

    return restStr ? `Отдых - ${restStr}` : 'Без отдыха';
  }, [initialExercise]);

  const value = React.useMemo(() => {
    if (ExerciseUtils.isRepsExercise(initialExercise)) {
      return `${initialExercise.reps} раз.`;
    } else if (ExerciseUtils.isTimeExercise(initialExercise)) {
      return (
        TimeUtils.getFormattedTimeForTraining(initialExercise.time) || '0 сек.'
      );
    } else if (ExerciseUtils.isGymExercise(initialExercise)) {
      return `${initialExercise.reps} x ${initialExercise.kg} кг.`;
    }

    return 'Undefined';
  }, [initialExercise]);

  return (
    <UI.View
      style={s(`bgc:white pv:8 ofv pr:20 pl:12`, `bbw:1 btw:1 bc:#DADADA`)}>
      <UI.View style={s(`row aic`)}>
        <UI.VSpacer size={8} />
        <UI.View style={s(`fill`)}>
          <UI.Text>{initialExercise.baseExercise.title}</UI.Text>
          <UI.View style={s(`asfs`)}>
            <UI.Text style={s(`P8 medium c:gray`)}>{formattedRest}</UI.Text>
          </UI.View>
        </UI.View>
        <UI.View>
          <UI.Text>{value}</UI.Text>
        </UI.View>
      </UI.View>
    </UI.View>
  );
};
