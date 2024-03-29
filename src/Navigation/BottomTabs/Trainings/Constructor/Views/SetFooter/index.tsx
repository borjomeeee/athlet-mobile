import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';

import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import {
  SET_FOOTER_ADD_EXERCISE_BUTTON_HEIGHT,
  SET_FOOTER_REST_BLOCK_HEIGHT,
} from '../../Const';
import Animated from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import {isEditingSelector} from '../../Store';
import {useSetFooterController} from './Controller';

interface SetFooterProps {
  setId: string;
  restAfterComplete: number;
}

export const SetFooter: React.FC<SetFooterProps> = ({
  setId,
  restAfterComplete,
}) => {
  const {handlePressAddExercise, handlePressEditRest} =
    useSetFooterController(setId);

  const isEditing = useRecoilValue(isEditingSelector);

  const formattedRest = React.useMemo(() => {
    const restStr = TimeUtils.getFormattedTimeForTraining(restAfterComplete);
    return restStr ? `Отдых - ${restStr}` : 'Без отдыха';
  }, [restAfterComplete]);

  return (
    <Animated.View>
      {isEditing && (
        <UI.Pressable
          style={s(
            `container h:${SET_FOOTER_ADD_EXERCISE_BUTTON_HEIGHT} bgc:white jcc`,
            `bbw:1 bc:ultraLightGray`,
          )}
          onPress={handlePressAddExercise}>
          <UI.Text style={s(`P7 c:ultraLightGray`)}>
            Добавить упражнение ...
          </UI.Text>
        </UI.Pressable>
      )}

      <Animated.View style={s(`h:${SET_FOOTER_REST_BLOCK_HEIGHT} aic jcc`)}>
        <UI.Pressable onPress={handlePressEditRest} disabled={!isEditing}>
          <UI.Text style={s(`P8 medium c:gray`)}>{formattedRest}</UI.Text>
        </UI.Pressable>
      </Animated.View>
    </Animated.View>
  );
};
