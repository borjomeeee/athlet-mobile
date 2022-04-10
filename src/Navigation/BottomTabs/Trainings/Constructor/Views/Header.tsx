import React from 'react';
import s from '@borjomeeee/rn-styles';

import * as UI from 'src/Components';
import {useRecoilValue} from 'recoil';
import {isEditingSelector, currentTrainingTitleSelector} from '../Store';
import {useTrainingConstructorController} from '../Hooks';

export const Header = () => {
  const trainingTitle = useRecoilValue(currentTrainingTitleSelector);
  const isEditing = useRecoilValue(isEditingSelector);

  const {handleChangeTitle} = useTrainingConstructorController();

  return (
    <UI.View style={s(`bgc:white container bbw:1 bc:ultraLightGray`)}>
      <UI.HSpacer size={25} />
      {isEditing ? (
        <UI.Input
          style={s(`P5 medium p:0 m:0`)}
          placeholder="Введите название тренировки ..."
          value={trainingTitle}
          onChangeText={handleChangeTitle}
          multiline={true}
        />
      ) : (
        <UI.Text style={s(`P5 medium`)}>{trainingTitle || 'Undefined'}</UI.Text>
      )}

      <UI.HSpacer size={15} />
    </UI.View>
  );
};
