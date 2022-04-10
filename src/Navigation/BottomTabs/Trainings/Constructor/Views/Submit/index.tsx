import s from '@borjomeeee/rn-styles';
import React from 'react';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {isCreatingSelector, isEditingSelector} from '../../Store';
import {useSubmitController} from './Controller';

export const Submit = () => {
  const isCreating = useRecoilValue(isCreatingSelector);
  const isEditing = useRecoilValue(isEditingSelector);

  const {handlePressCreateTraining, handlePressUpdateTraining} =
    useSubmitController();

  if (!isEditing) {
    return null;
  }

  return (
    <UI.View style={s(`container`)}>
      <UI.Button
        style={s(`bgc:green`)}
        label={'Сохранить'}
        onPress={
          isCreating ? handlePressCreateTraining : handlePressUpdateTraining
        }
      />
    </UI.View>
  );
};
