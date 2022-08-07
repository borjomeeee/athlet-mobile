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
import {useDebounce} from 'src/Hooks/Common';
import {useSetHeaderController} from './Controller';

interface SetHeaderProps {
  setId: string;
  title: string;
}

export const SetHeader: React.FC<SetHeaderProps> = ({setId, title}) => {
  const isEditing = useRecoilValue(isEditingSelector);
  const {handleChangeSetTitle} = useSetHeaderController(setId);

  const [changableTitle, setChangableTitle] = React.useState(title);
  const debouncedTitle = useDebounce(changableTitle, 400);

  const handleChangeText = React.useCallback((text: string) => {
    setChangableTitle(text.trimLeft());
  }, []);

  React.useEffect(() => {
    if (debouncedTitle !== title) {
      handleChangeSetTitle(debouncedTitle);
    }
  }, [debouncedTitle, title, handleChangeSetTitle]);

  const renderOptionsOverlay = React.useCallback(() => {
    return <SetHeaderOptions id={setId} />;
  }, [setId]);

  return (
    <UI.View
      style={s(`btw:1 bbw:1 bc:ultraLightGray bgc:#F6F8FA`, `row aic ph:16`)}>
      <UI.View style={s(`fill`)}>
        <UI.Input
          value={changableTitle}
          editable={isEditing}
          style={s(`P8 bold c:#57606A uppercase p:0 m:0`)}
          onChangeText={handleChangeText}
        />
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
