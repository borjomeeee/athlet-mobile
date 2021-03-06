import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';
import {SET_HEADER_HEIGHT} from '../../Const';
import {useDraggableController} from '../../Hooks/Draggable';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

import OptionsIcon from 'src/Assets/Svg/Options';
import {OverlayWrapper} from 'src/Lib/Overlay';
import {useRecoilValue} from 'recoil';
import {isEditingSelector} from '../../Store';
import {useSetHeaderOptionsController} from './Controller';

interface SetHeaderProps {
  positionId: string;

  setId: string;
  title: string;

  order: number;
}

export const SetHeader: React.FC<SetHeaderProps> = ({
  setId,
  title,
  positionId,
  order,
}) => {
  const {tempOffsetY, lastOrder, layout} = useDraggableController(positionId);
  const isEditing = useRecoilValue(isEditingSelector);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          lastOrder.value === order ? withTiming(tempOffsetY.value) : 0,
      },
    ],
  }));

  const renderOptionsOverlay = React.useCallback(() => {
    return <SetHeaderOptions id={setId} />;
  }, [setId]);

  React.useEffect(() => {
    layout(SET_HEADER_HEIGHT);
  });

  return (
    <Animated.View style={animatedStyle}>
      <UI.View
        style={s(
          `btw:1 bbw:1 bc:ultraLightGray bgc:#F6F8FA`,
          `h:${SET_HEADER_HEIGHT} row aic ph:16`,
        )}>
        <UI.View style={s(`fill`)}>
          <UI.Text style={s(`P8 bold c:#57606A uppercase`)}>{title}</UI.Text>
        </UI.View>

        <UI.VSpacer size={20} />
        {isEditing && (
          <Animated.View>
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
        <UI.Text>?????????????????????? ??????????</UI.Text>
      </UI.OverlayAction>
      <UI.OverlayAction onPress={handlePressSwapWithNext}>
        <UI.Text>?????????????????????? ????????</UI.Text>
      </UI.OverlayAction>
      <UI.OverlayAction onPress={handlePressRemoveSet}>
        <UI.Text style={s(`c:red`)}>??????????????</UI.Text>
      </UI.OverlayAction>
    </UI.View>
  );
};
