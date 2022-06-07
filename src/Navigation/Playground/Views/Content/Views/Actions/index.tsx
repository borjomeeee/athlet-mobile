import React from 'react';
import * as UI from 'src/Components';
import {useRecoilValue} from 'recoil';
import {currentElementStore} from 'src/Navigation/Playground/Store';
import s from '@borjomeeee/rn-styles';
import {ElementType, ExerciseCompletionType} from 'src/Store/Models/Training';
import {usePlayground} from 'src/Navigation/Playground/Hooks';

import StopIcon from 'src/Assets/Svg/Stop';
import PauseIcon from 'src/Assets/Svg/Pause';
import {Colors} from 'src/Utils/Styles';
import {useActionsController} from './Controller';

export const Actions = () => {
  const currentElement = useRecoilValue(currentElementStore);
  const {handlePressFinish, handlePressPause, handlePressSkip} =
    useActionsController();

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
          onPress={handlePressSkip}
        />
      ) : (
        <UI.GithubButton label="Дальше" onPress={handlePressSkip} />
      )}
      <UI.HSpacer size={10} />

      <UI.View style={s(`row`)}>
        <UI.GithubButton
          label="Завершить тренировку"
          onPress={handlePressFinish}
          style={s(`fill bgc:red bw:0 pv:10`)}>
          <StopIcon />
        </UI.GithubButton>
        <UI.VSpacer size={10} />
        <UI.GithubButton
          label="Пауза"
          onPress={handlePressPause}
          style={s(`fill bgc:#F8F8F8 bw:0 pv:10`)}>
          <PauseIcon fill={Colors.black} />
        </UI.GithubButton>
      </UI.View>
    </UI.View>
  );
};
