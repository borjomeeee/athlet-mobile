import React from 'react';
import * as UI from 'src/Components';
import {useRecoilValue} from 'recoil';
import {currentElementStore} from 'src/Navigation/Playground/Store';
import s from '@borjomeeee/rn-styles';
import {PlaygroundUtils} from 'src/Navigation/Playground/Utils';

export const CurrentElement = () => {
  const currentElement = useRecoilValue(currentElementStore);

  const elementTitle = React.useMemo(() => {
    if (!currentElement) {
      return 'Undefined';
    }

    return PlaygroundUtils.isRest(currentElement)
      ? 'Отдых'
      : currentElement.exercise.title;
  }, [currentElement]);

  if (!currentElement) {
    return null;
  }

  return (
    <UI.View style={s(`container`)}>
      <UI.View>
        <UI.Text style={s(`P7 medium c:#ffffff60`)}>Текущее упражнение</UI.Text>
        <UI.HSpacer size={5} />
        <UI.Text style={s(`P4 medium c:white`)}>{elementTitle}</UI.Text>
      </UI.View>
      <UI.View style={s(`fill`)} />
    </UI.View>
  );
};
