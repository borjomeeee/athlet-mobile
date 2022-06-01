import React from 'react';
import * as UI from 'src/Components';
import {useRecoilValue} from 'recoil';
import {currentElementStore} from 'src/Navigation/Playground/Store';
import {usePlaygroundActionsController} from './Controller';
import s from '@borjomeeee/rn-styles';
import {PlaygroundElementType} from 'src/Navigation/Playground/Types';
import {ExerciseCompletionType} from 'src/Store/Models/Training';

export const Actions = () => {
  const currentElement = useRecoilValue(currentElementStore);
  const {goNext, forceFinish} = usePlaygroundActionsController();

  const isTime = React.useMemo(() => {
    if (!currentElement) {
      return false;
    }

    return (
      (currentElement.type === PlaygroundElementType.EXERCISE &&
        currentElement.exercise.completionType ===
          ExerciseCompletionType.TIME) ||
      currentElement.type === PlaygroundElementType.REST
    );
  }, [currentElement]);

  if (!currentElement) {
    return null;
  }

  return (
    <UI.View style={s(`container`)}>
      {isTime ? (
        <UI.Button
          style={s(`bw:1 bc:#FFFFFF50 br:6`, `ph:47 bgc:#ffffff10`)}
          label="Пропустить"
          onPress={goNext}
        />
      ) : (
        <UI.GithubButton label="Дальше" onPress={goNext} />
      )}
      <UI.HSpacer size={10} />
      <UI.GithubButton
        label="Завершить тренировку"
        onPress={forceFinish}
        style={s(`bgc:red bw:0`)}
      />
    </UI.View>
  );
};
