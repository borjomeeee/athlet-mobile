import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';
import {SET_HEADER_HEIGHT} from '../../Const';
import Animated from 'react-native-reanimated';

import OptionsIcon from 'src/Assets/Svg/Options';
import {OverlayWrapper} from 'src/Lib/Overlay';
import {useRecoilValue} from 'recoil';
import {isEditingSelector} from '../../Store';
import {SetHeaderOptions} from './Views/Overlay';

interface SetHeaderProps {
  setId: string;
  title: string;
}

export const SetHeader: React.FC<SetHeaderProps> = ({setId, title}) => {
  const isEditing = useRecoilValue(isEditingSelector);

  const renderOptionsOverlay = React.useCallback(() => {
    return <SetHeaderOptions id={setId} />;
  }, [setId]);

  return (
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
  );
};
