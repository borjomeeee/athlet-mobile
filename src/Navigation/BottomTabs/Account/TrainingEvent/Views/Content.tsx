import React from 'react';
import {useRecoilValue} from 'recoil';
import {ElementType, ExerciseElement} from 'src/Store/Models/Training';
import {trainingEventStore} from '../Store';
import {Exercise} from './Exercise';
import {SetFooter} from './SetFooter';
import {SetHeader} from './SetHeader';

export const Content = () => {
  const trainingEvent = useRecoilValue(trainingEventStore);

  if (!trainingEvent) {
    return null;
  }

  return (
    <>
      {trainingEvent.initialTraining.elements.map((element, indx) => {
        if (element.type === ElementType.EXERCISE) {
          return (
            <Exercise
              key={`Exercise(indx=${indx})`}
              initialExercise={element}
              completedExercise={
                trainingEvent.completedElements[indx] as ExerciseElement
              }
            />
          );
        } else if (element.type === ElementType.SET) {
          return (
            <React.Fragment key={`Set(indx=${indx})`}>
              <SetHeader title={element.title} />
              {element.elements.map((setElement, j) => {
                const elem = trainingEvent.completedElements[indx];
                return (
                  <Exercise
                    key={`SetExercise(set=${indx}, indx=${j})`}
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
      })}
    </>
  );
};
