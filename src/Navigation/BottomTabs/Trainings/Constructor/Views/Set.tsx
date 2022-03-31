import React from 'react';
import {SetElement} from 'src/Store/Models/Training';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {useTrainingConstructorSetController} from '../Hooks';
import {Exercise} from './Exercise';
import {ExerciseUtils} from 'src/Store/ModelsUtils/Exercise';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';

interface SetProps {
  id: string;

  set: SetElement;
  notShowTopBorder?: boolean;
}
export const Set: React.FC<SetProps> = ({id, set, notShowTopBorder}) => {
  const {handlePressAddExercise} = useTrainingConstructorSetController(id);

  return (
    <UI.View>
      <UI.View
        style={s(
          `btw:${notShowTopBorder ? 0 : 1} bbw:1 bc:ultraLightGray bgc:#F6F8FA`,
          `pv:4 ph:16`,
        )}>
        <UI.Text style={s(`P8 bold c:#57606A`)}>СЕТ</UI.Text>
      </UI.View>

      {set.elements.map(exercise => (
        <Exercise key={exercise.id} exercise={exercise} notShowTopBorder />
      ))}

      <UI.Pressable
        style={s(`container h:36 bbw:1 bc:ultraLightGray bgc:white jcc`)}
        onPress={handlePressAddExercise}>
        <UI.Text style={s(`P7 c:ultraLightGray`)}>
          Добавить упражнение ...
        </UI.Text>
      </UI.Pressable>

      <UI.View style={s(`pv:10 aic jcc`)}>
        <UI.Text style={s(`P8 medium c:gray`)}>
          {TimeUtils.getFormattedTimeForTraining(set.restAfterComplete) ||
            'Без отдыха'}
        </UI.Text>
      </UI.View>
    </UI.View>
  );
};
