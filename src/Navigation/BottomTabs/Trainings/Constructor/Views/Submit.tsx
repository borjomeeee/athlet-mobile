import s from '@borjomeeee/rn-styles';
import React from 'react';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {useTrainingConstructorController} from '../Hooks';
import {isEditingSelector} from '../Store';

export const Submit = () => {
  const isEditing = useRecoilValue(isEditingSelector);
  const {setScreenState} = useTrainingConstructorController();

  const handlePressSubmit = React.useCallback(() => {
    setScreenState(currVal => +!currVal);
  }, [setScreenState]);

  return (
    <UI.View style={s(`container`)}>
      <UI.Button
        style={s(`bgc:green`)}
        label={isEditing ? 'Сохранить' : 'Начать'}
        onPress={isEditing ? handlePressSubmit : undefined}
      />
    </UI.View>
  );
};
