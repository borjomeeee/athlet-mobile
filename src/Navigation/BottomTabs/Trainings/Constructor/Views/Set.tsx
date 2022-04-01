import React from 'react';
import {SetElement} from 'src/Store/Models/Training';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {
  useTrainingConstructorElementController,
  useTrainingConstructorSetController,
} from '../Hooks';
import {SetExercise} from './Exercise';
import {TimeUtils} from 'src/Store/ModelsUtils/Time';
import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';

interface SetProps {
  id: string;

  set: SetElement;
  notShowTopBorder?: boolean;
}
export const Set: React.FC<SetProps> = ({id, set, notShowTopBorder}) => {
  const {handlePressEditRest} = useTrainingConstructorElementController(id);
  const {handlePressAddExercise} = useTrainingConstructorSetController(id);

  const formattedRest = React.useMemo(() => {
    const restStr = TimeUtils.getFormattedTimeForTraining(
      set.restAfterComplete,
    );
    return restStr ? `Отдых - ${restStr}` : 'Без отдыха';
  }, [set.restAfterComplete]);

  return (
    <Animated.View entering={SlideInRight} exiting={SlideOutLeft}>
      <UI.AnimatedHeightBox>
        <UI.View
          style={s(
            `btw:${
              notShowTopBorder ? 0 : 1
            } bbw:1 bc:ultraLightGray bgc:#F6F8FA`,
            `pv:4 ph:16`,
          )}>
          <UI.Text style={s(`P8 bold c:#57606A`)}>СЕТ</UI.Text>
        </UI.View>

        {set.elements.map((exercise, indx) => (
          <SetExercise
            setId={id}
            index={indx}
            key={id + indx}
            exercise={exercise}
            notShowTopBorder
          />
        ))}

        <UI.Pressable
          style={s(`container h:36 bbw:1 bc:ultraLightGray bgc:white jcc`)}
          onPress={handlePressAddExercise}>
          <UI.Text style={s(`P7 c:ultraLightGray`)}>
            Добавить упражнение ...
          </UI.Text>
        </UI.Pressable>

        <UI.View style={s(`pv:10 aic jcc`)}>
          <UI.Pressable onPress={handlePressEditRest}>
            <UI.Text style={s(`P8 medium c:gray`)}>{formattedRest}</UI.Text>
          </UI.Pressable>
        </UI.View>
      </UI.AnimatedHeightBox>
    </Animated.View>
  );
};
