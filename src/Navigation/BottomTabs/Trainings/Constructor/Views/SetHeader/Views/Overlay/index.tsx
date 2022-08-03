import React from 'react';
import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {useSetHeaderOverlayController} from './Controller';

interface SetHeaderOptionsProps {
  id: string;
}
export const SetHeaderOptions: React.FC<SetHeaderOptionsProps> = ({id}) => {
  const {
    handlePressRemoveSet,
    handlePressSwapWithNext,
    handlePressSwapWithPrevious,
  } = useSetHeaderOverlayController(id);

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
