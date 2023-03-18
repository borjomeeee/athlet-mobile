import s from '@borjomeeee/rn-styles';
import React from 'react';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {usePlayground} from 'src/Navigation/Playground/Hooks';
import {
  currentElementStore,
  currentIndexStore,
} from 'src/Navigation/Playground/Store';
import {ElementType, ExerciseCompletionType} from 'src/Store/Models/Training';
import {Colors} from 'src/Utils/Styles';
import {useCurrentElementController} from '../CurrentElement/Controller';
import {ExpirationTime} from '../ExpirationTime';

export const ExerciseBody = () => {
  const currentElement = useRecoilValue(currentElementStore);
  const currentIndex = useRecoilValue(currentIndexStore);

  const {goNext} = usePlayground();
  const {handleChangeReps, handleChangeTime} = useCurrentElementController();

  if (!currentElement || currentElement.type !== ElementType.EXERCISE) {
    return null;
  }

  const exercise = currentElement;
  return (
    <UI.View style={s(`minW:200 ofh aic`)}>
      {exercise.completionType === ExerciseCompletionType.REPS && (
        <UI.SelectRepsWheel
          defaultValue={exercise.reps}
          textStyle={s(`c:white`)}
          gradientColor={'#24292E'}
          labelStyle={s(`c:white`)}
          onChangeValue={handleChangeReps}
          valueChild={{
            value: exercise.reps,
            Component: GoalComponent,
            style: s(`l:-45 t:5`),
          }}
          disableOverflow
        />
      )}
      {exercise.completionType === ExerciseCompletionType.TIME && (
        <ExpirationTime
          key={Date.now() + exercise.time}
          duration={exercise.time}
          onExpire={() => goNext(currentIndex)}
          onChange={handleChangeTime}
        />
      )}
      {exercise.completionType === ExerciseCompletionType.GYM && (
        <UI.SelectRepsWheel
          defaultValue={exercise.reps}
          textStyle={s(`c:white`)}
          gradientColor={'#24292E'}
          labelStyle={s(`c:white`)}
          onChangeValue={handleChangeReps}
          valueChild={{
            value: exercise.reps,
            Component: GoalComponent,
            style: s(`l:-45 t:5`),
          }}
          disableOverflow
        />
      )}
    </UI.View>
  );
};

function GoalComponent() {
  return (
    <UI.ShadowView dx={0} dy={0} color={Colors.green + '50'} blur={10}>
      <UI.View style={s(`w:45 pv:4 br:3 bgc:green aic jcc`)}>
        <UI.Text style={s(`P9 medium c:white`)}>ЦЕЛЬ</UI.Text>
      </UI.View>
    </UI.ShadowView>
  );
}
