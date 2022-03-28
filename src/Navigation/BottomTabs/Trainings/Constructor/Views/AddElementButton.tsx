import s from '@borjomeeee/rn-styles';
import React from 'react';
import * as UI from 'src/Components';
import {useTrainingConstructorController} from '../Hooks';

export const AddElementButton = () => {
  const {handlePressAddElement} = useTrainingConstructorController();
  return (
    <UI.Pressable
      style={s(`container h:36 btw:1 bbw:1 bc:ultraLightGray bgc:white jcc`)}
      onPress={handlePressAddElement}>
      <UI.Text style={s(`P7 c:ultraLightGray`)}>Добавить элемент ...</UI.Text>
    </UI.Pressable>
  );
};
