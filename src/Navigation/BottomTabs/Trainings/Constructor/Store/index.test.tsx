import {renderHook, act} from '@testing-library/react-hooks/native'; // will use react-test-renderer
import {RecoilRoot, useRecoilValue} from 'recoil';
import {
  ElementType,
  ExerciseCompletionType,
  ExerciseElement,
} from 'src/Store/Models/Training';
import {ConstructorExercise, ConstructorSet} from '../Types';
import {useTrainingConstructorStore} from './index';

const firstElement: ExerciseElement = {
  type: ElementType.EXERCISE,
  id: '1',
  title: 'Hello, world!',
  completionType: ExerciseCompletionType.REPS,
  restAfterComplete: 10,
  reps: 10,
};

const secondElement: ExerciseElement = {
  type: ElementType.EXERCISE,
  id: '2',
  title: 'Hello, world!',
  completionType: ExerciseCompletionType.TIME,
  restAfterComplete: 10,
  time: 10,
};

// describe('trainings constructor store', () => {
//   it('change title', () => {
//     const {result: storeResult} = renderHook(
//       () => ({
//         constructorStore: useTrainingConstructorStore(),
//         title: useRecoilValue(trainingTitleStore),
//       }),
//       {
//         wrapper: RecoilRoot,
//       },
//     );

//     expect(storeResult.current.title).toBe('');

//     act(() => {
//       storeResult.current.constructorStore.setTitle('Hello, world!');
//     });

//     expect(storeResult.current.title).toBe('Hello, world!');
//   });

//   it('add/remove element', () => {
//     const {result: storeResult} = renderHook(
//       () => ({
//         constructorStore: useTrainingConstructorStore(),
//         elements: useRecoilValue(trainingElementsStore),
//       }),
//       {
//         wrapper: RecoilRoot,
//       },
//     );

//     expect(storeResult.current.elements).toHaveLength(0);

//     act(() => {
//       storeResult.current.constructorStore.addElement(firstElement);
//     });

//     expect(storeResult.current.elements).toHaveLength(1);

//     act(() => {
//       storeResult.current.constructorStore.removeElement('random id');
//     });

//     expect(storeResult.current.elements).toHaveLength(1);

//     act(() => {
//       storeResult.current.constructorStore.removeElement(
//         storeResult.current.elements[0]?.elementId,
//       );
//     });

//     expect(storeResult.current.elements).toHaveLength(0);
//   });

//   it('swap with next/prev', () => {
//     const {result: storeResult} = renderHook(
//       () => ({
//         constructorStore: useTrainingConstructorStore(),
//         elements: useRecoilValue(trainingElementsStore),
//       }),
//       {
//         wrapper: RecoilRoot,
//       },
//     );

//     expect(storeResult.current.elements).toHaveLength(0);

//     act(() => {
//       storeResult.current.constructorStore.addElement(firstElement);
//       storeResult.current.constructorStore.addElement(secondElement);
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect((storeResult.current.elements[0] as ConstructorExercise)?.id).toBe(
//       firstElement.id,
//     );
//     expect((storeResult.current.elements[1] as ConstructorExercise)?.id).toBe(
//       secondElement.id,
//     );

//     // swap first element with prev (Must nothing happines)
//     act(() => {
//       storeResult.current.constructorStore.swapElementWithPrevious(
//         storeResult.current.elements[0].elementId,
//       );
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect((storeResult.current.elements[0] as ConstructorExercise)?.id).toBe(
//       firstElement.id,
//     );
//     expect((storeResult.current.elements[1] as ConstructorExercise)?.id).toBe(
//       secondElement.id,
//     );

//     // swap second element with prev (Must swap happines)
//     act(() => {
//       storeResult.current.constructorStore.swapElementWithPrevious(
//         storeResult.current.elements[1].elementId,
//       );
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect((storeResult.current.elements[0] as ConstructorExercise)?.id).toBe(
//       secondElement.id,
//     );
//     expect((storeResult.current.elements[1] as ConstructorExercise)?.id).toBe(
//       firstElement.id,
//     );

//     // swap second element with next (Must nothing happines)
//     act(() => {
//       storeResult.current.constructorStore.swapElementWithNext(
//         storeResult.current.elements[1].elementId,
//       );
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect((storeResult.current.elements[0] as ConstructorExercise)?.id).toBe(
//       secondElement.id,
//     );
//     expect((storeResult.current.elements[1] as ConstructorExercise)?.id).toBe(
//       firstElement.id,
//     );

//     // swap first element with next (Must swap happines)
//     act(() => {
//       storeResult.current.constructorStore.swapElementWithNext(
//         storeResult.current.elements[0].elementId,
//       );
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect((storeResult.current.elements[0] as ConstructorExercise)?.id).toBe(
//       firstElement.id,
//     );
//     expect((storeResult.current.elements[1] as ConstructorExercise)?.id).toBe(
//       secondElement.id,
//     );
//   });

//   it('add exercise to set', () => {
//     const {result: storeResult} = renderHook(
//       () => ({
//         constructorStore: useTrainingConstructorStore(),
//         elements: useRecoilValue(trainingElementsStore),
//       }),
//       {
//         wrapper: RecoilRoot,
//       },
//     );

//     expect(storeResult.current.elements).toHaveLength(0);

//     act(() => {
//       storeResult.current.constructorStore.addElement({
//         type: ElementType.SET,
//         elements: [],
//         restAfterComplete: 10,
//       });

//       storeResult.current.constructorStore.addElement({
//         type: ElementType.SET,
//         elements: [],
//         restAfterComplete: 10,
//       });
//     });

//     expect(storeResult.current.elements).toHaveLength(2);

//     act(() => {
//       const setId = storeResult.current.elements[0].elementId;
//       storeResult.current.constructorStore.addExerciseToSet(
//         setId,
//         firstElement,
//       );
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect(
//       (storeResult.current.elements[0] as ConstructorSet).elements,
//     ).toHaveLength(1);
//     expect(
//       (storeResult.current.elements[1] as ConstructorSet).elements,
//     ).toHaveLength(0);
//   });

//   it('replace exercise', () => {
//     const {result: storeResult} = renderHook(
//       () => ({
//         constructorStore: useTrainingConstructorStore(),
//         elements: useRecoilValue(trainingElementsStore),
//       }),
//       {
//         wrapper: RecoilRoot,
//       },
//     );

//     expect(storeResult.current.elements).toHaveLength(0);

//     act(() => {
//       storeResult.current.constructorStore.addElement(firstElement);
//     });

//     expect(storeResult.current.elements).toHaveLength(1);
//     expect((storeResult.current.elements[0] as ConstructorExercise).id).toBe(
//       firstElement.id,
//     );

//     act(() => {
//       storeResult.current.constructorStore.replaceExercise(
//         storeResult.current.elements[0].elementId,
//         secondElement,
//       );
//     });

//     expect(storeResult.current.elements).toHaveLength(1);
//     expect((storeResult.current.elements[0] as ConstructorExercise).id).toBe(
//       secondElement.id,
//     );
//   });

//   it('change/reset set title', () => {
//     const {result: storeResult} = renderHook(
//       () => ({
//         constructorStore: useTrainingConstructorStore(),
//         elements: useRecoilValue(trainingElementsStore),
//       }),
//       {
//         wrapper: RecoilRoot,
//       },
//     );

//     act(() => {
//       storeResult.current.constructorStore.addElement({
//         type: ElementType.SET,
//         elements: [],
//         restAfterComplete: 10,
//       });

//       storeResult.current.constructorStore.addElement({
//         type: ElementType.SET,
//         elements: [],
//         restAfterComplete: 10,
//       });
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect(storeResult.current.elements[0].title).toBe('СЕТ 1');
//     expect(storeResult.current.elements[1].title).toBe('СЕТ 2');

//     act(() => {
//       const set1Id = storeResult.current.elements[0].elementId;
//       const set2Id = storeResult.current.elements[1].elementId;
//       storeResult.current.constructorStore.changeSetTitle(set1Id, 'New title!');
//       storeResult.current.constructorStore.changeSetTitle(
//         set2Id,
//         'New title 2!',
//       );
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect(storeResult.current.elements[0].title).toBe('New title!');
//     expect(storeResult.current.elements[1].title).toBe('New title 2!');

//     act(() => {
//       const setId = storeResult.current.elements[0].elementId;
//       storeResult.current.constructorStore.resetIfEmptySetTitle(setId);
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect(storeResult.current.elements[0].title).toBe('New title!');
//     expect(storeResult.current.elements[1].title).toBe('New title 2!');

//     act(() => {
//       const set1Id = storeResult.current.elements[0].elementId;
//       storeResult.current.constructorStore.changeSetTitle(set1Id, '');
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect(storeResult.current.elements[0].title).toBe('');
//     expect(storeResult.current.elements[1].title).toBe('New title 2!');

//     act(() => {
//       const setId = storeResult.current.elements[0].elementId;
//       storeResult.current.constructorStore.resetIfEmptySetTitle(setId);
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect(storeResult.current.elements[0].title).toBe('СЕТ 1');
//     expect(storeResult.current.elements[1].title).toBe('New title 2!');
//   });

//   it('change exercise/set rest', () => {
//     const {result: storeResult} = renderHook(
//       () => ({
//         constructorStore: useTrainingConstructorStore(),
//         elements: useRecoilValue(trainingElementsStore),
//       }),
//       {
//         wrapper: RecoilRoot,
//       },
//     );

//     act(() => {
//       storeResult.current.constructorStore.addElement({
//         type: ElementType.SET,
//         elements: [],
//         restAfterComplete: 10,
//       });

//       storeResult.current.constructorStore.addElement({
//         type: ElementType.EXERCISE,
//         id: '1',
//         title: 'Hello, world!',
//         completionType: ExerciseCompletionType.GYM,
//         reps: 10,
//         kg: 100,
//         restAfterComplete: 15,
//       });
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect(storeResult.current.elements[0].restAfterComplete).toBe(10);
//     expect(storeResult.current.elements[1].restAfterComplete).toBe(15);

//     act(() => {
//       const setId = storeResult.current.elements[0].elementId;
//       storeResult.current.constructorStore.changeSetRest(setId, 20);

//       const exerciseId = storeResult.current.elements[1].elementId;
//       storeResult.current.constructorStore.changeExerciseRest(exerciseId, 100);
//     });

//     expect(storeResult.current.elements).toHaveLength(2);
//     expect(storeResult.current.elements[0].restAfterComplete).toBe(20);
//     expect(storeResult.current.elements[1].restAfterComplete).toBe(100);
//   });

//   it('replace exercises', () => {
//     const {result: storeResult} = renderHook(
//       () => ({
//         constructorStore: useTrainingConstructorStore(),
//         elements: useRecoilValue(trainingElementsStore),
//       }),
//       {
//         wrapper: RecoilRoot,
//       },
//     );

//     act(() => {
//       storeResult.current.constructorStore.addElement(firstElement);
//       storeResult.current.constructorStore.addElement(secondElement);
//       storeResult.current.constructorStore.addElement(firstElement);
//     });

//     expect(storeResult.current.elements).toHaveLength(3);

//     // const firstElementId: string = storeResult.current.elements[0].elementId;
//     const secondElementId: string = storeResult.current.elements[1].elementId;
//     const thirdElementId: string = storeResult.current.elements[2].elementId;

//     act(() => {
//       storeResult.current.constructorStore.replaceExercises([
//         {id: secondElementId, order: 0},
//         {id: thirdElementId, order: 1},
//         {id: 'some random id', order: 3},
//       ] as any);
//     });

//     expect(storeResult.current.elements).toHaveLength(2);

//     expect(storeResult.current.elements[0].elementId).toBe(secondElementId);
//     expect(storeResult.current.elements[1].elementId).toBe(thirdElementId);
//   });
// });
