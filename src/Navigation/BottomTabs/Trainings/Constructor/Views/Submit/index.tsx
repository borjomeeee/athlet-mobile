import s from '@borjomeeee/rn-styles';
import React from 'react';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {isEditingSelector} from '../../Store';
import {useSubmitController} from './Controller';

export const Submit = () => {
  const isEditing = useRecoilValue(isEditingSelector);
  const {handlePressSubmit} = useSubmitController();
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
