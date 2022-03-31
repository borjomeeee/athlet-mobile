import React from 'react';
import {ExerciseElement} from 'src/Store/Models/Training';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';

interface ExerciseProps {
  exercise: ExerciseElement;
  notShowTopBorder?: boolean;
}
export const Exercise: React.FC<ExerciseProps> = ({
  exercise,
  notShowTopBorder,
}) => {
  const formattedRest = React.useMemo(() => {
    return (
      TimeUtils.getFormattedTimeForTraining(exercise.restAfterComplete) ||
      'Без отдыха'
    );
  }, [exercise]);

  const value = React.useMemo(() => {
    if (ExerciseUtils.isRepsExercise(exercise)) {
      return `${exercise.reps} раз.`;
    } else if (ExerciseUtils.isTimeExercise(exercise)) {
      return TimeUtils.getFormattedTimeForTraining(exercise.time) || '0 сек.';
    } else if (ExerciseUtils.isGymExercise(exercise)) {
      return `${exercise.reps} x ${exercise.kg} кг.`;
    }

    return 'Undefined';
  }, [exercise]);
  return (
    <UI.View
      style={s(
        `container row aic pv:8 btw:${
          notShowTopBorder ? 0 : 1
        } bbw:1 bc:ultraLightGray bgc:white`,
      )}>
      <UI.View style={s(`fill`)}>
        <UI.Text>{exercise.title}</UI.Text>
        <UI.Text style={s(`P8 medium c:gray`)}>Отдых - {formattedRest}</UI.Text>
      </UI.View>
      <UI.View>
        <UI.Text>{value}</UI.Text>
      </UI.View>
    </UI.View>
  );
};
