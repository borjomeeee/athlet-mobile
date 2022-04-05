import React from 'react';
import {useRecoilValue} from 'recoil';
import {isSet, trainingElementsStore} from '../Store';

import * as UI from 'src/Components';
import {TrainingExercise} from './Exercise';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {
  ConstructorElementType,
  ConstructorElementViewList,
  ExercisesPositions,
} from '../Types';
import {SetHeader} from './SetHeader';
import {SetFooter} from './SetFooter';
import {SET_FOOTER_HEIGHT, SET_HEADER_HEIGHT} from '../Const';
import {getSetFooterId, getSetHeaderId} from '../Utils';

interface ElementsListProps {
  scrollViewRef: React.RefObject<Animated.ScrollView>;
  scrollY: Animated.SharedValue<number>;
}
export const ElementsList: React.FC<ElementsListProps> = ({
  scrollViewRef,
  scrollY,
}) => {
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
          const id = getSetHeaderId(element.element.elementId);
          acc[id] = {
            ...acc[id],
            id,
            type: ConstructorElementType.SET_HEADER,
            offsetY,
            height: SET_HEADER_HEIGHT,
            tempOffsetY: 0,
            order,
            changed: false,
          };

          offsetY += SET_HEADER_HEIGHT;
        } else if (element.type === ConstructorElementType.SET_FOOTER) {
          const id = getSetFooterId(element.element.elementId);
          acc[id] = {
            ...acc[id],
            id,
            type: ConstructorElementType.SET_FOOTER,
            offsetY,
            height: SET_FOOTER_HEIGHT,
            tempOffsetY: 0,
            order,
            changed: false,
          };

          offsetY += SET_FOOTER_HEIGHT;
        } else if (element.type === ConstructorElementType.EXERCISE) {
          acc[element.element.elementId] = {
            ...acc[element.element.elementId],
            id: element.element.elementId,
            type: ConstructorElementType.EXERCISE,
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
              scrollViewRef={scrollViewRef}
              scrollY={scrollY}
            />
          );
        } else if (element.type === ConstructorElementType.SET_HEADER) {
          return (
            <SetHeader
              key={getSetHeaderId(element.element.elementId)}
              id={getSetHeaderId(element.element.elementId)}
              setId={element.element.elementId}
              title={'СЕТ'}
              exercisesPositions={animatedExercisesPositions}
            />
          );
        } else if (element.type === ConstructorElementType.SET_FOOTER) {
          return (
            <SetFooter
              key={getSetFooterId(element.element.elementId)}
              id={getSetFooterId(element.element.elementId)}
              setId={element.element.elementId}
              restAfterComplete={element.element.restAfterComplete}
              exercisesPositions={animatedExercisesPositions}
            />
          );
        }
      })}
    </UI.View>
  );
};
