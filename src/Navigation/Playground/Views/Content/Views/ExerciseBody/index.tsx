import s from '@borjomeeee/rn-styles';
import React from 'react';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {usePlayground} from 'src/Navigation/Playground/Hooks';
import {currentElementStore} from 'src/Navigation/Playground/Store';
import {PlaygroundElementType} from 'src/Navigation/Playground/Types';
import {ExerciseCompletionType} from 'src/Store/Models/Training';
import {Colors} from 'src/Utils/Styles';
import {ExpirationTime} from '../ExpirationTime';

export const ExerciseBody = () => {
  const currentElement = useRecoilValue(currentElementStore);
  const {goNext} = usePlayground();

  if (
    !currentElement ||
    currentElement.type !== PlaygroundElementType.EXERCISE
  ) {
    return null;
  }

  const exercise = currentElement.exercise;
  return (
    <UI.View style={s(`minW:200 ofh aic`)}>
      {exercise.completionType === ExerciseCompletionType.REPS && (
        <UI.SelectRepsWheel
          defaultValue={exercise.reps}
          textStyle={s(`c:white`)}
          gradientColor={'#24292E'}
          labelStyle={s(`c:white`)}
          valueChild={{
            value: exercise.reps,
            Component: () => (
              <UI.ShadowView
                dx={0}
                dy={0}
                color={Colors.green + '50'}
                blur={10}>
                <UI.View style={s(`w:45 pv:4 br:3 bgc:green aic jcc`)}>
                  <UI.Text style={s(`P9 medium c:white`)}>ЦЕЛЬ</UI.Text>
                </UI.View>
              </UI.ShadowView>
            ),
            style: s(`l:-45 t:5`),
          }}
          disableOverflow
        />
      )}
      {exercise.completionType === ExerciseCompletionType.TIME && (
        <ExpirationTime
          expirationDate={Date.now() + exercise.time}
          onExpire={goNext}
        />
      )}
      {exercise.completionType === ExerciseCompletionType.GYM && (
        <UI.SelectRepsWheel
          defaultValue={exercise.reps}
          textStyle={s(`c:white`)}
          gradientColor={'#24292E'}
          labelStyle={s(`c:white`)}
          valueChild={{
            value: exercise.reps,
            Component: () => (
              <UI.ShadowView
                dx={0}
                dy={0}
                color={Colors.green + '50'}
                blur={10}>
                <UI.View style={s(`w:45 pv:4 br:3 bgc:green aic jcc`)}>
                  <UI.Text style={s(`P9 medium c:white`)}>ЦЕЛЬ</UI.Text>
                </UI.View>
              </UI.ShadowView>
            ),
            style: s(`l:-45 t:5`),
          }}
          disableOverflow
        />
      )}
    </UI.View>
  );
};
