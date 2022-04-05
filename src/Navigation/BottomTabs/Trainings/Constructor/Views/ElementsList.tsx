import React from 'react';
import {useRecoilValue} from 'recoil';
import {isSet, trainingElementsStore} from '../Store';

import * as UI from 'src/Components';
import {TrainingExercise} from './Exercise';
import {useSharedValue} from 'react-native-reanimated';
import {
  ConstructorElementType,
  ConstructorElementViewList,
  ExercisesPositions,
} from '../Types';
import {SetHeader} from './SetHeader';
import {SetFooter} from './SetFooter';
import {SET_FOOTER_HEIGHT, SET_HEADER_HEIGHT} from '../Const';

export const ElementsList = () => {
  const elements = useRecoilValue(trainingElementsStore);

  const viewElements = React.useMemo(() => {
    const data: ConstructorElementViewList = [];
    elements.forEach(element => {
      if (isSet(element)) {
        const {elements: _, ...set} = element;

        data.push({type: ConstructorElementType.SET_HEADER, element: set});
        element.elements.forEach(exercise => {
          data.push({
            type: ConstructorElementType.EXERCISE,
            element: exercise,
          });
        });
        data.push({type: ConstructorElementType.SET_FOOTER, element: set});
        return;
      }

      data.push({
        type: ConstructorElementType.EXERCISE,
        element: element,
      });
    });

    return data;
  }, [elements]);

  const animatedExercisesPositions = useSharedValue<ExercisesPositions>({});

  React.useLayoutEffect(() => {
    let offsetY = 0;
    animatedExercisesPositions.value = viewElements.reduce(
      (acc, element, order) => {
        if (element.type === ConstructorElementType.SET_HEADER) {
          offsetY += SET_HEADER_HEIGHT;
        } else if (element.type === ConstructorElementType.SET_FOOTER) {
          offsetY += SET_FOOTER_HEIGHT;
        } else if (element.type === ConstructorElementType.EXERCISE) {
          acc[element.element.elementId] = {
            ...acc[element.element.elementId],
            id: element.element.elementId,
            offsetY,
            tempOffsetY: 0,
            order,
            changed: false,
          };

          if (acc[element.element.elementId].height) {
            offsetY += acc[element.element.elementId].height || 0;
          }
        }
        return acc;
      },
      {...animatedExercisesPositions.value},
    );
  }, [viewElements, animatedExercisesPositions]);

  return (
    <UI.View>
      {viewElements.map(element => {
        if (element.type === ConstructorElementType.EXERCISE) {
          return (
            <TrainingExercise
              key={element.element.elementId}
              exercisesPositions={animatedExercisesPositions}
              exercise={element.element}
            />
          );
        } else if (element.type === ConstructorElementType.SET_HEADER) {
          return (
            <SetHeader
              key={`set-header(setId=${element.element.elementId})`}
              setId={element.element.elementId}
              title={'СЕТ'}
            />
          );
        } else if (element.type === ConstructorElementType.SET_FOOTER) {
          return (
            <SetFooter
              key={`set-footer(setId=${element.element.elementId})`}
              setId={element.element.elementId}
              restAfterComplete={element.element.restAfterComplete}
            />
          );
        }
      })}
    </UI.View>
  );
};
