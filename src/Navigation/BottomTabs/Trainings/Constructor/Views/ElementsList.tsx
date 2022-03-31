import React from 'react';
import {useRecoilValue} from 'recoil';
import {trainingElementsStore} from '../Store';

import * as UI from 'src/Components';
import {ElementType} from 'src/Store/Models/Training';
import {TrainingExercise} from './Exercise';
import {Set} from './Set';

export const ElementsList = () => {
  const elements = useRecoilValue(trainingElementsStore);

  return (
    <UI.View>
      {elements.map((element, indx) => {
        const notShowBorder = elements[indx - 1]?.type === ElementType.EXERCISE;

        if (element.type === ElementType.EXERCISE) {
          return (
            <React.Fragment key={element.elementId}>
              <TrainingExercise
                id={element.elementId}
                exercise={element}
                notShowTopBorder={notShowBorder}
              />
            </React.Fragment>
          );
        } else if (element.type === ElementType.SET) {
          return (
            <React.Fragment key={element.elementId}>
              <Set
                id={element.elementId}
                set={element}
                notShowTopBorder={notShowBorder}
              />
            </React.Fragment>
          );
        }

        return null;
      })}

      {elements.length > 0 && <UI.HSpacer size={10} />}
    </UI.View>
  );
};
