import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';
import {SET_HEADER_HEIGHT} from '../Const';
import {AnimatedExercisesPositions} from '../Types';
import {useDraggablePosition} from '../Hooks/Draggable';
import Animated, {
  Layout,
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface SetHeaderProps {
  id: string;

  setId: string;
  title: string;

  exercisesPositions: AnimatedExercisesPositions;
}
export const SetHeader: React.FC<SetHeaderProps> = ({
  setId: _,
  title,
  id,
  exercisesPositions,
}) => {
  const {offsetY} = useDraggablePosition(id, exercisesPositions);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: withTiming(offsetY.value)}],
  }));

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      style={animatedStyle}
      layout={Layout}>
      <UI.View
        style={s(
          `btw:1 bbw:1 bc:ultraLightGray bgc:#F6F8FA`,
          `h:${SET_HEADER_HEIGHT} jcc ph:16`,
        )}>
        <UI.Text style={s(`P8 bold c:#57606A`)}>{title}</UI.Text>
      </UI.View>
    </Animated.View>
  );
};
