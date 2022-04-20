import React from 'react';
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

  return (
    <UI.View>
      {isEditing && !isCreating && (
        <UI.Pressable onPress={handlePressCancelEditingMode}>
          <UI.Text style={s(`c:red`)}>Cancel</UI.Text>
        </UI.Pressable>
      )}
      {!isEditing && (
        <OverlayWrapper
          overlayRef={overlayRef}
          Component={HeaderOptionsOverlay}>
          <HeaderOptionsIcon />
        </OverlayWrapper>
      )}
    </UI.View>
  );
};

const HeaderOptionsOverlay = () => {
  const {handlePressGoToEditMode, handlePressDelete} =
    useHeaderOptionsOverlayController();

  return (
    <UI.View style={s(`minW:150`)}>
      <UI.OverlayAction onPress={handlePressGoToEditMode}>
        <UI.Text>Изменить</UI.Text>
      </UI.OverlayAction>

      <UI.OverlayAction onPress={handlePressDelete}>
        <UI.Text style={s(`c:red`)}>Удалить</UI.Text>
      </UI.OverlayAction>
    </UI.View>
  );
};
