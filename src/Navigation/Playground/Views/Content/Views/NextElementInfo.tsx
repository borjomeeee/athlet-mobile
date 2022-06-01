import React from 'react';
import {useRecoilValue} from 'recoil';
import {nextElementStore} from 'src/Navigation/Playground/Store';
import {PlaygroundUtils} from 'src/Navigation/Playground/Utils';

import * as UI from 'src/Components';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import s from '@borjomeeee/rn-styles';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';

export const NextElementInfo = () => {
  const nextElement = useRecoilValue(nextElementStore);

  if (!nextElement) {
    return <UI.Text style={s(`P7 c:#FFFFFF tar`)}>Конец</UI.Text>;
  }

  if (PlaygroundUtils.isRest(nextElement)) {
    const formattedDuration = TimeUtils.getFormattedTimeForTraining(
      nextElement.duration,
    );
    return (
      <UI.Text
        style={s(`P7 c:#FFFFFF tar`)}>{`Отдых · ${formattedDuration}`}</UI.Text>
    );
  } else {
    const exercise = nextElement.exercise;
    const value = (() => {
      if (ExerciseUtils.isRepsExercise(exercise)) {
        return `${exercise.reps} раз.`;
      } else if (ExerciseUtils.isTimeExercise(exercise)) {
        return TimeUtils.getFormattedTimeForTraining(exercise.time) || '0 сек.';
      } else if (ExerciseUtils.isGymExercise(exercise)) {
        return `${exercise.reps} x ${exercise.kg} кг.`;
      }

      return 'Undefined';
    })();
    return (
      <UI.Text
        style={s(
          `P7 c:#FFFFFF tar`,
        )}>{`${nextElement.exercise.title} · ${value}`}</UI.Text>
    );
  }
};
