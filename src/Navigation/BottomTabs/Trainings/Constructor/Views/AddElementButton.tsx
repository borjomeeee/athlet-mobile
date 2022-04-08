import s from '@borjomeeee/rn-styles';
import React from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {useTrainingConstructorController} from '../Hooks';
import {isEditingSelector} from '../Store';

export const AddElementButton = () => {
  const isEditing = useRecoilValue(isEditingSelector);
  const {handlePressAddElement} = useTrainingConstructorController();

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      {isEditing && (
        <UI.Pressable
          style={s(
            `container h:36 btw:1 bbw:1 bc:ultraLightGray bgc:white jcc`,
          )}
          onPress={handlePressAddElement}>
          <UI.Text style={s(`P7 c:ultraLightGray`)}>
            Добавить элемент ...
          </UI.Text>
        </UI.Pressable>
      )}
    </Animated.View>
  );
};
