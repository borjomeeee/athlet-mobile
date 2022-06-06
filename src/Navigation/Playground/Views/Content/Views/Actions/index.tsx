import React from 'react';
import * as UI from 'src/Components';
import {useRecoilValue} from 'recoil';
import {currentElementStore} from 'src/Navigation/Playground/Store';
import s from '@borjomeeee/rn-styles';
import {ElementType, ExerciseCompletionType} from 'src/Store/Models/Training';
import {usePlayground} from 'src/Navigation/Playground/Hooks';

export const Actions = () => {
  const currentElement = useRecoilValue(currentElementStore);

  // TODO: create force exit method
  const {goNext, exit} = usePlayground();

  const isTime = React.useMemo(() => {
    if (!currentElement) {
      return false;
    }

    return (
      (currentElement.type === ElementType.EXERCISE &&
        currentElement.completionType === ExerciseCompletionType.TIME) ||
      currentElement.type === ElementType.REST
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
        onPress={exit}
        style={s(`bgc:red bw:0`)}
      />
    </UI.View>
  );
};
