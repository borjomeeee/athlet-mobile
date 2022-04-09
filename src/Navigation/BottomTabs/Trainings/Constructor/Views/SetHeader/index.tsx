import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';
import {SET_HEADER_HEIGHT} from '../../Const';
import {AnimatedExercisesPositions} from '../../Types';
import {useDraggablePosition} from '../../Hooks/Draggable';
import Animated, {
  Layout,
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';

import OptionsIcon from 'src/Assets/Svg/Options';
import {OverlayWrapper} from 'src/Lib/Overlay';
import {useRecoilValue} from 'recoil';
import {isEditingSelector} from '../../Store';
import {
  useSetHeaderController,
  useSetHeaderOptionsController,
} from './Controller';

interface SetHeaderProps {
  positionId: string;

  setId: string;
  title: string;

  exercisesPositions: AnimatedExercisesPositions;
}

export const SetHeader: React.FC<SetHeaderProps> = ({
  setId,
  title,
  positionId,
  exercisesPositions,
}) => {
  const {handleChangeSetTitle, handleBlurSetTitle} =
    useSetHeaderController(setId);

  const {offsetY} = useDraggablePosition(positionId, exercisesPositions);

  const isEditing = useRecoilValue(isEditingSelector);

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
          <UI.Input
            style={s(`P8 bold c:#57606A uppercase`)}
            onChangeText={handleChangeSetTitle}
            value={title}
            placeholder="Введите название сета ..."
            autoCapitalize="characters"
            onBlur={handleBlurSetTitle}
            editable={isEditing}
          />
        </UI.View>

        <UI.VSpacer size={20} />
        {isEditing && (
          <Animated.View entering={ZoomIn} exiting={ZoomOut}>
            <OverlayWrapper Component={renderOptionsOverlay}>
              <OptionsIcon />
            </OverlayWrapper>
          </Animated.View>
        )}
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
  } = useSetHeaderOptionsController(id);

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