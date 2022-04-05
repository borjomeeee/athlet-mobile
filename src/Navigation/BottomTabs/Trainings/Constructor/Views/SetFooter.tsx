import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';

import {
  useTrainingConstructorSetController,
  useTrainingConstructorSetRestController,
} from '../Hooks';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import {
  SET_FOOTER_ADD_EXERCISE_BUTTON_HEIGHT,
  SET_FOOTER_REST_BLOCK_HEIGHT,
} from '../Const';
import {AnimatedExercisesPositions} from '../Types';
import Animated, {
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useDraggablePosition} from '../Hooks/Draggable';

interface SetFooterProps {
  id: string;

  setId: string;
  restAfterComplete: number;

  exercisesPositions: AnimatedExercisesPositions;
}
export const SetFooter: React.FC<SetFooterProps> = ({
  setId,
  restAfterComplete,

  id,
  exercisesPositions,
}) => {
  const {changed, offsetY} = useDraggablePosition(id, exercisesPositions);

  const {handlePressAddExercise} = useTrainingConstructorSetController(setId);
  const {handlePressEditRest} = useTrainingConstructorSetRestController(setId);

  const formattedRest = React.useMemo(() => {
    const restStr = TimeUtils.getFormattedTimeForTraining(restAfterComplete);
    return restStr ? `Отдых - ${restStr}` : 'Без отдыха';
  }, [restAfterComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateY: changed.value ? withTiming(offsetY.value) : offsetY.value},
    ],
  }));

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      style={animatedStyle}>
      <UI.Pressable
        style={s(
          `container h:${SET_FOOTER_ADD_EXERCISE_BUTTON_HEIGHT} bgc:white jcc`,
          `bbw:1 bc:ultraLightGray`,
        )}
        onPress={handlePressAddExercise}>
        <UI.Text style={s(`P7 c:ultraLightGray`)}>
          Добавить упражнение ...
        </UI.Text>
      </UI.Pressable>
      <UI.View style={s(`h:${SET_FOOTER_REST_BLOCK_HEIGHT} aic jcc`)}>
        <UI.Pressable onPress={handlePressEditRest}>
          <UI.Text style={s(`P8 medium c:gray`)}>{formattedRest}</UI.Text>
        </UI.Pressable>
      </UI.View>
    </Animated.View>
  );
};
