import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';

import {
  useTrainingConstructorElementController,
  useTrainingConstructorSetController,
} from '../Hooks';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import {
  SET_FOOTER_ADD_EXERCISE_BUTTON_HEIGHT,
  SET_FOOTER_HEIGHT,
  SET_FOOTER_REST_BLOCK_HEIGHT,
} from '../Const';

interface SetFooterProps {
  setId: string;
  restAfterComplete: number;
}
export const SetFooter: React.FC<SetFooterProps> = ({
  setId,
  restAfterComplete,
}) => {
  const {handlePressAddExercise} = useTrainingConstructorSetController(setId);
  const {handlePressEditRest} = useTrainingConstructorElementController(setId);

  const formattedRest = React.useMemo(() => {
    const restStr = TimeUtils.getFormattedTimeForTraining(restAfterComplete);
    return restStr ? `Отдых - ${restStr}` : 'Без отдыха';
  }, [restAfterComplete]);

  return (
    <>
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
      <UI.View style={s(`h:${SET_FOOTER_REST_BLOCK_HEIGHT} aic jcc`)}>
        <UI.Pressable onPress={handlePressEditRest}>
          <UI.Text style={s(`P8 medium c:gray`)}>{formattedRest}</UI.Text>
        </UI.Pressable>
      </UI.View>
    </>
  );
};
