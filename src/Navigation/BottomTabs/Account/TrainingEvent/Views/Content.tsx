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

    let indx = -1;
    return trainingEvent.initialTraining.elements.map((element, i) => {
      indx++;
      if (element.type === ElementType.EXERCISE) {
        return (
          <Exercise
            key={`Exercise(indx=${i})`}
            initialExercise={element}
            completedExercise={
              trainingEvent.completedElements[indx] as ExerciseElement
            }
          />
        );
      } else if (element.type === ElementType.SET) {
        return (
          <React.Fragment key={`Set(indx=${i})`}>
            <SetHeader title={element.title} />
            {element.elements.map((setElement, j) => {
              const elem = trainingEvent.completedElements[indx];
              return (
                <Exercise
                  key={`SetExercise(set=${i}, indx=${j})`}
                  initialExercise={setElement}
                  completedExercise={
                    elem && elem.type === ElementType.SET
                      ? elem.elements[j]
                      : undefined
                  }
                />
              );
            })}
            <SetFooter
              initialRest={element.restAfterComplete}
              completedRest={
                trainingEvent.completedElements[indx]?.restAfterComplete
              }
            />
          </React.Fragment>
        );
      }
    });
  }, [trainingEvent]);

  if (!trainingEvent) {
    return null;
  }

  return <>{renderElements()}</>;
};
