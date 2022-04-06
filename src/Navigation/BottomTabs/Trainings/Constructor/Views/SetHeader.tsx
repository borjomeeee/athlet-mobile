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

import OptionsIcon from 'src/Assets/Svg/Options';
import {OverlayWrapper} from 'src/Lib/Overlay';
import {
  useTrainingConstructorSetController,
  useTrainingConstructorSetOptionsController,
} from '../Hooks';
import {OverlayRef} from 'src/Lib/Overlay/Types';

interface SetHeaderProps {
  id: string;

  setId: string;
  title: string;

  exercisesPositions: AnimatedExercisesPositions;
}

export const SetHeader: React.FC<SetHeaderProps> = ({
  setId,
  title,
  id,
  exercisesPositions,
}) => {
  const ref = React.useRef<OverlayRef>(null);

  const {handlePressOptions} = useTrainingConstructorSetOptionsController(ref);
  const {offsetY} = useDraggablePosition(id, exercisesPositions);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: withTiming(offsetY.value)}],
  }));

  const renderOptionsOverlay = React.useCallback(() => {
    return <SetHeaderOptions id={setId} />;
  }, [setId]);

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      style={animatedStyle}
      layout={Layout}>
      <UI.View
        style={s(
          `btw:1 bbw:1 bc:ultraLightGray bgc:#F6F8FA`,
          `h:${SET_HEADER_HEIGHT} row aic ph:16`,
        )}>
        <UI.View style={s(`fill`)}>
          <UI.Text style={s(`P8 bold c:#57606A`)}>{title}</UI.Text>
        </UI.View>

        <OverlayWrapper overlayRef={ref} Component={renderOptionsOverlay}>
          <UI.Pressable onPress={handlePressOptions}>
            <OptionsIcon />
          </UI.Pressable>
        </OverlayWrapper>
      </UI.View>
    </Animated.View>
  );
};

interface SetHeaderOptionsProps {
  id: string;
}
const SetHeaderOptions: React.FC<SetHeaderOptionsProps> = ({id}) => {
  const {
    handlePressRemoveSet,
    handlePressSwapWithNext,
    handlePressSwapWithPrevious,
  } = useTrainingConstructorSetController(id);

  return (
    <UI.View>
      <UI.OverlayAction
        style={s(`pr:20`)}
        onPress={handlePressSwapWithPrevious}>
        <UI.Text>Переместить вверх</UI.Text>
      </UI.OverlayAction>
      <UI.OverlayAction onPress={handlePressSwapWithNext}>
        <UI.Text>Переместить вниз</UI.Text>
      </UI.OverlayAction>
      <UI.OverlayAction onPress={handlePressRemoveSet}>
        <UI.Text style={s(`c:red`)}>Удалить</UI.Text>
      </UI.OverlayAction>
    </UI.View>
  );
};
