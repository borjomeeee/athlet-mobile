import React from 'react';
import * as UI from 'src/Components';
import {useRecoilValue} from 'recoil';
import {
  currentElementStore,
  currentIndexStore,
} from 'src/Navigation/Playground/Store';
import s from '@borjomeeee/rn-styles';
import {ExerciseBody} from '../ExerciseBody';
import {ElementType, ExerciseCompletionType} from 'src/Store/Models/Training';
import {ExpirationTime} from '../ExpirationTime';
import {usePlayground} from 'src/Navigation/Playground/Hooks';
import {useCurrentElementController} from './Controller';

export const CurrentElement = () => {
  const currentIndex = useRecoilValue(currentIndexStore);
  const currentElement = useRecoilValue(currentElementStore);

  const {goNext, setCompletingElement} = usePlayground();
  const {handleChangeRest} = useCurrentElementController();

  const elementTitle = React.useMemo(() => {
    if (!currentElement) {
      return 'Undefined';
    }

    if (currentElement.type === ElementType.REST) {
      return 'Отдых';
    }

    let title = currentElement.title;
    if (currentElement.completionType === ExerciseCompletionType.GYM) {
      title += ` · ${currentElement.kg}кг`;
    }
    return title;
  }, [currentElement]);

  React.useEffect(() => {
    if (!currentElement) {
      return;
    }

    if (currentElement.type === ElementType.EXERCISE) {
      setCompletingElement(currentElement);
    } else {
      setCompletingElement({...currentElement, duration: 0});
    }
  }, [currentElement, setCompletingElement]);

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
        {currentElement.type === ElementType.EXERCISE ? (
          <ExerciseBody />
        ) : (
          <ExpirationTime
            key={`ExpirationTime(index=${currentIndex.toString()})`}
            duration={currentElement.duration}
            onChange={handleChangeRest}
            onExpire={goNext}
          />
        )}
      </UI.View>
    </UI.View>
  );
};
