import React from 'react';
import {useRecoilValue} from 'recoil';
import {ElementType, ExerciseElement} from 'src/Store/Models/Training';
import {trainingEventStore} from '../Store';
import {Exercise} from './Exercise';
import {SetFooter} from './SetFooter';
import {SetHeader} from './SetHeader';

export const Content = () => {
  const trainingEvent = useRecoilValue(trainingEventStore);

  const renderElements = React.useCallback(() => {
    if (!trainingEvent) {
      return null;
    }

    let indx = 0;
    const completedElementsLength = trainingEvent.completedElements.length;
    return trainingEvent.initialTraining.elements.map(element => {
      if (element.type === ElementType.EXERCISE) {
        indx++;
        return (
          <Exercise
            initialExercise={element}
            completedExercise={
              indx < completedElementsLength
                ? (trainingEvent.completedElements[indx] as ExerciseElement)
                : undefined
            }
          />
        );
      } else if (element.type === ElementType.SET) {
        indx += element.elements.length;
        return (
          <>
            <SetHeader title={element.title} />
            {element.elements.map(setElement => (
              <Exercise
                initialExercise={setElement}
                completedExercise={
                  indx < completedElementsLength
                    ? (trainingEvent.completedElements[indx] as ExerciseElement)
                    : undefined
                }
              />
            ))}
            <SetFooter rest={element.restAfterComplete} />
          </>
        );
      }
    });
  }, [trainingEvent]);

  if (!trainingEvent) {
    return null;
  }

  return <>{renderElements()}</>;
};
