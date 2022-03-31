import React from 'react';
import {ExerciseElement} from 'src/Store/Models/Training';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';
import {Pressable} from 'src/Components';
import {
  useTrainingConstructorElementController,
  useTrainingConstructorExerciseController,
  useTrainingConstructorSetExerciseController,
} from '../Hooks';

interface ExerciseProps {
  exercise: ExerciseElement;
  notShowTopBorder?: boolean;

  handlePressRest?: () => void;
  handlePress?: () => void;
}
export const Exercise: React.FC<ExerciseProps> = ({
  exercise,
  notShowTopBorder,

  handlePressRest,
  handlePress,
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
    <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
      <UI.PressableItem
        style={s(
          `container row aic pv:8 btw:${
            notShowTopBorder ? 0 : 1
          } bbw:1 bc:ultraLightGray bgc:white`,
        )}
        onPress={handlePress}>
        <>
          <UI.View style={s(`fill`)}>
            <UI.Text>{exercise.title}</UI.Text>
            <Pressable style={s(`asfs`)} onPress={handlePressRest}>
              <UI.Text style={s(`P8 medium c:gray`)}>
                Отдых - {formattedRest}
              </UI.Text>
            </Pressable>
          </UI.View>
          <UI.View>
            <UI.Text>{value}</UI.Text>
          </UI.View>
        </>
      </UI.PressableItem>
    </Animated.View>
  );
};

interface TrainingExerciseProps extends ExerciseProps {
  id: string;
}
export const TrainingExercise: React.FC<TrainingExerciseProps> = ({
  id,
  ...props
}) => {
  const {handlePressEditRest} = useTrainingConstructorElementController(id);
  const {handlePress} = useTrainingConstructorExerciseController(id);
  return (
    <Exercise
      handlePress={handlePress}
      handlePressRest={handlePressEditRest}
      {...props}
    />
  );
};

interface SetExerciseProps extends ExerciseProps {
  setId: string;
  index: number;
}
export const SetExercise: React.FC<SetExerciseProps> = ({
  setId,
  index,
  ...props
}) => {
  const {handlePressEditRest, handlePress} =
    useTrainingConstructorSetExerciseController(setId, index);
  return (
    <Exercise
      handlePress={handlePress}
      handlePressRest={handlePressEditRest}
      {...props}
    />
  );
};
