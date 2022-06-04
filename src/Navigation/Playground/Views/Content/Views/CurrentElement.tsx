import React from 'react';
import * as UI from 'src/Components';
import {useRecoilValue} from 'recoil';
import {currentElementStore} from 'src/Navigation/Playground/Store';
import s from '@borjomeeee/rn-styles';
import {PlaygroundUtils} from 'src/Navigation/Playground/Utils';
import {PlaygroundElementType} from 'src/Navigation/Playground/Types';
import {ExerciseBody} from './ExerciseBody';
import {CompletionType} from 'src/Components/Modals/EditExercise/Views/CompletionType';
import {ExerciseCompletionType} from 'src/Store/Models/Training';
import {ExpirationTime} from './ExpirationTime';
import {usePlayground} from 'src/Navigation/Playground/Hooks';

export const CurrentElement = () => {
  const currentElement = useRecoilValue(currentElementStore);
  const {goNext} = usePlayground();

  const elementTitle = React.useMemo(() => {
    if (!currentElement) {
      return 'Undefined';
    }

    if (PlaygroundUtils.isRest(currentElement)) {
      return 'Отдых';
    }

    let title = currentElement.exercise.title;
    if (currentElement.exercise.completionType === ExerciseCompletionType.GYM) {
      title += ` · ${currentElement.exercise.kg}кг`;
    }
    return title;
  }, [currentElement]);

  if (!currentElement) {
    return null;
  }

  return (
    <UI.View style={s(`fill container`)}>
      <UI.View>
        <UI.Text style={s(`P7 medium c:#ffffff60`)}>Текущее упражнение</UI.Text>
        <UI.HSpacer size={5} />
        <UI.Text style={s(`P4 medium c:white`)}>{elementTitle}</UI.Text>
      </UI.View>
      <UI.View style={s(`fill aic jcc`)}>
        {currentElement.type === PlaygroundElementType.EXERCISE ? (
          <ExerciseBody />
        ) : (
          <ExpirationTime
            expirationDate={Date.now() + currentElement.duration}
            onExpire={goNext}
          />
        )}
      </UI.View>
    </UI.View>
  );
};
