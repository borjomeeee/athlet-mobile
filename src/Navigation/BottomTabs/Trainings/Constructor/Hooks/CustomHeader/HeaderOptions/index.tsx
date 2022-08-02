import React from 'react';
import {useRecoilValue} from 'recoil';

import * as UI from 'src/Components';
import HeaderOptionsIcon from 'src/Assets/Svg/HeaderOptions';

import {OverlayWrapper} from 'src/Lib/Overlay';
import {OverlayRef} from 'src/Lib/Overlay/Types';
import s from '@borjomeeee/rn-styles';
import {useHeaderOptionsController} from './Controller';
import {isCreatingSelector, isEditingSelector} from '../../../Store';
import {HeaderOptionsOverlay} from './Views/Overlay';

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
