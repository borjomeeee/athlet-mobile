import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';

import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import {
  SET_FOOTER_ADD_EXERCISE_BUTTON_HEIGHT,
  SET_FOOTER_HEIGHT,
  SET_FOOTER_REST_BLOCK_HEIGHT,
} from '../../Const';
import Animated, {
  Layout,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useDraggableController} from '../../Hooks/Draggable';
import {useRecoilValue} from 'recoil';
import {isEditingSelector} from '../../Store';
import {useSetFooterController} from './Controller';

interface SetFooterProps {
  positionId: string;

  setId: string;
  restAfterComplete: number;

  order: number;
}
export const SetFooter: React.FC<SetFooterProps> = ({
  setId,
  restAfterComplete,

  positionId,
  order,
}) => {
  const {tempOffsetY, lastOrder, layout} = useDraggableController(positionId);

  const {handlePressAddExercise, handlePressEditRest} =
    useSetFooterController(setId);

  const isEditing = useRecoilValue(isEditingSelector);

  const formattedRest = React.useMemo(() => {
    const restStr = TimeUtils.getFormattedTimeForTraining(restAfterComplete);
    return restStr ? `Отдых - ${restStr}` : 'Без отдыха';
  }, [restAfterComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          lastOrder.value === order ? withTiming(tempOffsetY.value) : 0,
      },
    ],
  }));

  React.useEffect(() => {
    layout(SET_FOOTER_HEIGHT);
  });

  return (
    <Animated.View
      // entering={isEditing ? SlideInRight : undefined}
      // exiting={isEditing ? SlideOutLeft : undefined}
      style={animatedStyle}
      layout={Layout}>
      {isEditing && (
        <Animated.View
          // entering={FadeIn} exiting={FadeOut}
          layout={Layout}>
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
        </Animated.View>
      )}

      <Animated.View
        style={s(`h:${SET_FOOTER_REST_BLOCK_HEIGHT} aic jcc`)}
        layout={Layout}>
        <UI.Pressable onPress={handlePressEditRest} disabled={!isEditing}>
          <UI.Text style={s(`P8 medium c:gray`)}>{formattedRest}</UI.Text>
        </UI.Pressable>
      </Animated.View>
    </Animated.View>
  );
};
