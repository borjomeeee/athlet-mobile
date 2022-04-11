import React from 'react';
import Animated, {ZoomIn, ZoomOut} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';

import * as UI from 'src/Components';
import HeaderOptionsIcon from 'src/Assets/Svg/HeaderOptions';
import {isCreatingSelector, isEditingSelector} from '../../Store';
import {OverlayWrapper} from 'src/Lib/Overlay';
import {OverlayRef} from 'src/Lib/Overlay/Types';
import s from '@borjomeeee/rn-styles';
import {
  useHeaderOptionsController,
  useHeaderOptionsOverlayController,
} from './Controller';
export const HeaderOptions = () => {
  const overlayRef = React.useRef<OverlayRef>(null);

  const {handlePressCancelEditingMode} = useHeaderOptionsController();

  const isCreating = useRecoilValue(isCreatingSelector);
  const isEditing = useRecoilValue(isEditingSelector);

  if (isEditing) {
    if (isCreating) {
      return null;
    }

    return (
      <Animated.View entering={ZoomIn} exiting={ZoomOut}>
        <UI.Pressable onPress={handlePressCancelEditingMode}>
          <UI.Text style={s(`c:red`)}>Cancel</UI.Text>
        </UI.Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={ZoomIn} exiting={ZoomOut}>
      <OverlayWrapper overlayRef={overlayRef} Component={HeaderOptionsOverlay}>
        <HeaderOptionsIcon />
      </OverlayWrapper>
    </Animated.View>
  );
};

const HeaderOptionsOverlay = () => {
  const {handlePressGoToEditMode} = useHeaderOptionsOverlayController();

  return (
    <UI.View style={s(`minW:150`)}>
      <UI.OverlayAction onPress={handlePressGoToEditMode}>
        <UI.Text>Изменить</UI.Text>
      </UI.OverlayAction>
      <UI.OverlayAction>
        <UI.Text style={s(`c:red`)}>Удалить</UI.Text>
      </UI.OverlayAction>
    </UI.View>
  );
};
