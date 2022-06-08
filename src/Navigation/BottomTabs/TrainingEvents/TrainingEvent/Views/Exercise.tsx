import React from 'react';
import {ExerciseElement} from 'src/Store/Models/Training';
import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';

import ArrowDifferenceIcon from 'src/Assets/Svg/ArrowDifference';
import {Colors} from 'src/Utils/Styles';

interface ExerciseProps {
  initialExercise: ExerciseElement;
  completedExercise?: ExerciseElement;
}
export const Exercise: React.FC<ExerciseProps> = ({
  initialExercise,
  completedExercise,
}) => {
  const formattedInitialRest = React.useMemo(() => {
    const restStr = TimeUtils.getFormattedTimeForTraining(
      initialExercise.restAfterComplete,
    );

    return initialExercise.restAfterComplete
      ? `Отдых - ${restStr}`
      : 'Без отдыха';
  }, [initialExercise]);

  const diffRest = React.useMemo(() => {
    if (completedExercise) {
      return (
        completedExercise.restAfterComplete - initialExercise.restAfterComplete
      );
    } else {
      return -initialExercise.restAfterComplete;
    }
  }, [initialExercise, completedExercise]);

  const renderRest = React.useCallback(() => {
    if (diffRest === 0) {
      return formattedInitialRest;
    } else {
      const completedExerciseRest = TimeUtils.getFormattedTimeForTraining(
        completedExercise?.restAfterComplete || 0,
      );

      const initialExerciseRest = TimeUtils.getFormattedTimeForTraining(
        initialExercise.restAfterComplete,
      );

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
  }, [diffRest, initialExercise, completedExercise, formattedInitialRest]);

  const initialValue = React.useMemo(() => {
    if (ExerciseUtils.isRepsExercise(initialExercise)) {
      return `${initialExercise.reps} раз.`;
    } else if (ExerciseUtils.isTimeExercise(initialExercise)) {
      return (
        TimeUtils.getFormattedTimeForTraining(initialExercise.time) || '0 сек.'
      );
    } else if (ExerciseUtils.isGymExercise(initialExercise)) {
      return `${initialExercise.reps} x ${initialExercise.kg} кг.`;
    }
  }, [initialExercise]);

  const value = React.useMemo(() => {
    if (ExerciseUtils.isRepsExercise(initialExercise)) {
      if (
        completedExercise &&
        ExerciseUtils.isRepsExercise(completedExercise)
      ) {
        return `${completedExercise.reps} раз.`;
      } else {
        return `0 раз.`;
      }
    } else if (ExerciseUtils.isTimeExercise(initialExercise)) {
      if (
        completedExercise &&
        ExerciseUtils.isTimeExercise(completedExercise)
      ) {
        return (
          TimeUtils.getFormattedTimeForTraining(completedExercise.time) ||
          '0 сек.'
        );
      } else {
        return '0 сек.';
      }
    } else if (ExerciseUtils.isGymExercise(initialExercise)) {
      if (completedExercise && ExerciseUtils.isGymExercise(completedExercise)) {
        return `${completedExercise.reps} x ${completedExercise.kg} кг.`;
      } else {
        return `0 x ${initialExercise.kg} кг.`;
      }
    }

    return 'Undefined';
  }, [initialExercise, completedExercise]);

  const valueDiff = React.useMemo(() => {
    if (ExerciseUtils.isTimeExercise(initialExercise)) {
      if (
        completedExercise &&
        ExerciseUtils.isTimeExercise(completedExercise)
      ) {
        return completedExercise.time - initialExercise.time;
      } else {
        return -initialExercise.time;
      }
    } else if (
      ExerciseUtils.isRepsExercise(initialExercise) ||
      ExerciseUtils.isGymExercise(initialExercise)
    ) {
      if (
        completedExercise &&
        (ExerciseUtils.isRepsExercise(completedExercise) ||
          ExerciseUtils.isGymExercise(completedExercise))
      ) {
        return completedExercise.reps - initialExercise.reps;
      } else {
        return -initialExercise.reps;
      }
    }

    return 0;
  }, [initialExercise, completedExercise]);

  const formattedValueDiff = React.useMemo(() => {
    if (ExerciseUtils.isTimeExercise(initialExercise)) {
      return (
        TimeUtils.getFormattedTimeForTraining(Math.abs(valueDiff)) || `0 сек.`
      );
    } else {
      return Math.abs(valueDiff);
    }
  }, [initialExercise, valueDiff]);

  return (
    <UI.View
      style={s(`bgc:white pv:8 ofv pr:20 pl:12`, `bbw:1 btw:1 bc:#DADADA`)}>
      <UI.View style={s(`row aic`)}>
        <UI.VSpacer size={8} />
        <UI.View style={s(`fill`)}>
          <UI.Text>{initialExercise.baseExercise.title}</UI.Text>
          <UI.View style={s(`asfs`)}>
            {/* <UI.Text style={s(`P8 medium c:gray`)}>{formattedRest}</UI.Text> */}
            {renderRest()}
          </UI.View>
        </UI.View>
        <UI.View style={s(`row aic jcc`)}>
          <UI.View style={s(`aife`)}>
            <UI.Text>{value}</UI.Text>
            {valueDiff !== 0 && (
              <UI.Text style={s(`P9 removed c:gray`)}>{initialValue}</UI.Text>
            )}
          </UI.View>
          {valueDiff !== 0 && (
            <UI.View style={s(`row aic jcc`)}>
              <UI.VSpacer size={5} />
              <ArrowDifferenceIcon
                fill={valueDiff < 0 ? Colors.red : Colors.green}
                style={s(valueDiff < 0 && `rotate`)}
              />
              <UI.VSpacer size={2} />
              <UI.Text style={s(`P9 c:green`, valueDiff < 0 && `c:red`)}>
                {formattedValueDiff}
              </UI.Text>
            </UI.View>
          )}
        </UI.View>
      </UI.View>
    </UI.View>
  );
};
