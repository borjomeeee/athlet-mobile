import React from 'react';
import {useRecoilValue} from 'recoil';
import {constructorElementsSelector} from '../Store';

import * as UI from 'src/Components';
import {TrainingExercise} from './Exercise';
import Animated, {runOnUI, useSharedValue} from 'react-native-reanimated';
import {
  ConstructorElementType,
  ConstructorElementViewList,
  ExerciseValuesStore,
} from '../Types';
import {SetHeader} from './SetHeader';
import {SetFooter} from './SetFooter';
import {getSetFooterId, getSetHeaderId} from '../Utils';
import {TrainingUtils} from 'src/Store/ModelsUtils/Training';
import {AnimationsContext} from '../Store/Animations';

interface ElementsListProps {
  scrollViewRef: React.RefObject<Animated.ScrollView>;
  scrollY: Animated.SharedValue<number>;
}
export const ElementsList: React.FC<ElementsListProps> = React.memo(
  ({scrollViewRef, scrollY}) => {
    const elements = useRecoilValue(constructorElementsSelector);

    const viewElements = React.useMemo(() => {
      const data: ConstructorElementViewList = [];
      elements.forEach(element => {
        if (TrainingUtils.isSet(element)) {
          const {elements: _, ...set} = element;

          data.push({
            id: getSetHeaderId(set.elementId),
            type: ConstructorElementType.SET_HEADER,
            element: set,
          });
          element.elements.forEach(exercise => {
            data.push({
              id: exercise.elementId,
              type: ConstructorElementType.EXERCISE,
              element: exercise,
            });
          });
          data.push({
            id: getSetFooterId(set.elementId),
            type: ConstructorElementType.SET_FOOTER,
            element: set,
          });
          return;
        }

        data.push({
          id: element.elementId,
          type: ConstructorElementType.EXERCISE,
          element: element,
        });
      });

      return data;
    }, [elements]);

    const sharedExercisesPositions = useSharedValue<ExerciseValuesStore>({});

    React.useEffect(() => {
      const newPositions = viewElements.reduce((acc, element, order) => {
        acc[element.id] = {
          elementId: element.id,
          tempOrder: order,
          tempOffsetY: 0,
          height: 0,
          order,
        };
        return acc;
      }, {} as ExerciseValuesStore);

      runOnUI(() => {
        'worklet';
        sharedExercisesPositions.value = newPositions;
      })();
    }, [sharedExercisesPositions, viewElements]);

    const data = React.useMemo(
      () => ({scrollViewRef, scrollY, positions: sharedExercisesPositions}),
      [scrollViewRef, scrollY, sharedExercisesPositions],
    );

    return (
      <AnimationsContext.Provider value={data}>
        <UI.View key={JSON.stringify(viewElements)}>
          {viewElements.map((element, indx) => {
            if (element.type === ConstructorElementType.EXERCISE) {
              return (
                <TrainingExercise
                  key={element.id}
                  exercise={element.element}
                  order={indx}
                />
              );
            } else if (element.type === ConstructorElementType.SET_HEADER) {
              return (
                <SetHeader
                  key={element.id}
                  positionId={element.id}
                  setId={element.element.elementId}
                  title={element.element.title}
                  order={indx}
                />
              );
            } else if (element.type === ConstructorElementType.SET_FOOTER) {
              return (
                <SetFooter
                  key={element.id}
                  positionId={element.id}
                  setId={element.element.elementId}
                  restAfterComplete={element.element.restAfterComplete}
                  order={indx}
                />
              );
            }
          })}
        </UI.View>
      </AnimationsContext.Provider>
    );
  },
);
