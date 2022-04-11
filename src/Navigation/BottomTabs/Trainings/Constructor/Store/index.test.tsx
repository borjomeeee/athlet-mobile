import {renderHook, act} from '@testing-library/react-hooks/native'; // will use react-test-renderer
import {RecoilRoot, useRecoilValue} from 'recoil';
import {
  ElementType,
  ExerciseCompletionType,
  ExerciseElement,
} from 'src/Store/Models/Training';
import {SetWithId, ExerciseWithId} from './Types';

import {constructorElementsSelector} from './Selectors';
import {screenTrainingTitleAtom} from './Atoms';
import {
  useTrainingConstructorHistoryStore,
  useTrainingConstructorStore,
} from './index';

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

describe('trainings constructor store', () => {
  it('change title', () => {
    const {result: storeResult} = renderHook(
      () => ({
        constructorStore: useTrainingConstructorStore(),
        title: useRecoilValue(screenTrainingTitleAtom),
      }),
      {
        wrapper: RecoilRoot,
      },
    );

    expect(storeResult.current.title).toBe('Новая тренировка');

    act(() => {
      storeResult.current.constructorStore.setTitle('Hello, world!');
    });

    expect(storeResult.current.title).toBe('Hello, world!');
  });

  it('add/remove element', () => {
    const {result: storeResult} = renderHook(
      () => ({
        constructorStore: useTrainingConstructorHistoryStore(),
        elements: useRecoilValue(constructorElementsSelector),
      }),
      {
        wrapper: RecoilRoot,
      },
    );

    expect(storeResult.current.elements).toHaveLength(0);

    act(() => {
      storeResult.current.constructorStore.addExercise(firstElement);
    });

    expect(storeResult.current.elements).toHaveLength(1);

    act(() => {
      storeResult.current.constructorStore.removeExercise('random id');
    });

    expect(storeResult.current.elements).toHaveLength(1);

    act(() => {
      storeResult.current.constructorStore.removeExercise(
        storeResult.current.elements[0]?.elementId,
      );
    });

    expect(storeResult.current.elements).toHaveLength(0);
  });

  it('swap with next/prev', () => {
    const {result: storeResult} = renderHook(
      () => ({
        constructorStore: useTrainingConstructorHistoryStore(),
        elements: useRecoilValue(constructorElementsSelector),
      }),
      {
        wrapper: RecoilRoot,
      },
    );

    expect(storeResult.current.elements).toHaveLength(0);

    act(() => {
      storeResult.current.constructorStore.addExercise(firstElement);
      storeResult.current.constructorStore.addExercise(secondElement);
    });

    expect(storeResult.current.elements).toHaveLength(2);
    expect((storeResult.current.elements[0] as ExerciseWithId)?.id).toBe(
      firstElement.id,
    );
    expect((storeResult.current.elements[1] as ExerciseWithId)?.id).toBe(
      secondElement.id,
    );

    // swap first element with prev (Must nothing happines)
    act(() => {
      storeResult.current.constructorStore.swapWithPrev(
        storeResult.current.elements[0].elementId,
      );
    });

    expect(storeResult.current.elements).toHaveLength(2);
    expect((storeResult.current.elements[0] as ExerciseWithId)?.id).toBe(
      firstElement.id,
    );
    expect((storeResult.current.elements[1] as ExerciseWithId)?.id).toBe(
      secondElement.id,
    );

    // swap second element with prev (Must swap happines)
    act(() => {
      storeResult.current.constructorStore.swapWithPrev(
        storeResult.current.elements[1].elementId,
      );
    });

    expect(storeResult.current.elements).toHaveLength(2);
    expect((storeResult.current.elements[0] as ExerciseWithId)?.id).toBe(
      secondElement.id,
    );
    expect((storeResult.current.elements[1] as ExerciseWithId)?.id).toBe(
      firstElement.id,
    );

    // swap second element with next (Must nothing happines)
    act(() => {
      storeResult.current.constructorStore.swapWithNext(
        storeResult.current.elements[1].elementId,
      );
    });

    expect(storeResult.current.elements).toHaveLength(2);
    expect((storeResult.current.elements[0] as ExerciseWithId)?.id).toBe(
      secondElement.id,
    );
    expect((storeResult.current.elements[1] as ExerciseWithId)?.id).toBe(
      firstElement.id,
    );

    // swap first element with next (Must swap happines)
    act(() => {
      storeResult.current.constructorStore.swapWithNext(
        storeResult.current.elements[0].elementId,
      );
    });

    expect(storeResult.current.elements).toHaveLength(2);
    expect((storeResult.current.elements[0] as ExerciseWithId)?.id).toBe(
      firstElement.id,
    );
    expect((storeResult.current.elements[1] as ExerciseWithId)?.id).toBe(
      secondElement.id,
    );
  });

  it('add exercise to set', () => {
    const {result: storeResult} = renderHook(
      () => ({
        constructorStore: useTrainingConstructorHistoryStore(),
        elements: useRecoilValue(constructorElementsSelector),
      }),
      {
        wrapper: RecoilRoot,
      },
    );

    expect(storeResult.current.elements).toHaveLength(0);

    act(() => {
      storeResult.current.constructorStore.addSet();
      storeResult.current.constructorStore.addSet();
    });

    expect(storeResult.current.elements).toHaveLength(2);

    act(() => {
      const setId = storeResult.current.elements[0].elementId;
      storeResult.current.constructorStore.addExerciseToSet(
        setId,
        firstElement,
      );
    });

    expect(storeResult.current.elements).toHaveLength(2);
    expect(
      (storeResult.current.elements[0] as SetWithId).elements,
    ).toHaveLength(1);
    expect(
      (storeResult.current.elements[1] as SetWithId).elements,
    ).toHaveLength(0);
  });

  it('replace exercise/set', () => {
    const {result: storeResult} = renderHook(
      () => ({
        constructorStore: useTrainingConstructorHistoryStore(),
        elements: useRecoilValue(constructorElementsSelector),
      }),
      {
        wrapper: RecoilRoot,
      },
    );

    expect(storeResult.current.elements).toHaveLength(0);

    act(() => {
      storeResult.current.constructorStore.addExercise(firstElement);
    });

    expect(storeResult.current.elements).toHaveLength(1);
    expect((storeResult.current.elements[0] as ExerciseWithId).id).toBe(
      firstElement.id,
    );

    act(() => {
      storeResult.current.constructorStore.replaceExercise(
        storeResult.current.elements[0].elementId,
        secondElement,
      );
    });

    expect(storeResult.current.elements).toHaveLength(1);
    expect((storeResult.current.elements[0] as ExerciseWithId).id).toBe(
      secondElement.id,
    );

    act(() => {
      storeResult.current.constructorStore.addSet();
    });

    expect(storeResult.current.elements).toHaveLength(2);
    expect(
      (storeResult.current.elements[1] as ExerciseWithId).restAfterComplete,
    ).toBe(10);

    act(() => {
      const set = storeResult.current.elements[1] as SetWithId;
      storeResult.current.constructorStore.replaceSet(set.elementId, {
        ...set,
        restAfterComplete: 15,
      });
    });

    expect(storeResult.current.elements).toHaveLength(2);
    expect(
      (storeResult.current.elements[1] as ExerciseWithId).restAfterComplete,
    ).toBe(15);
  });

  // it('change/reset set title', () => {
  //   const {result: storeResult} = renderHook(
  //     () => ({
  //       constructorStore: useTrainingConstructorHistoryStore(),
  //       elements: useRecoilValue(constructorElementsSelector),
  //     }),
  //     {
  //       wrapper: RecoilRoot,
  //     },
  //   );

  //   act(() => {
  //     storeResult.current.constructorStore.addSet();
  //     storeResult.current.constructorStore.addSet();
  //   });

  //   expect(storeResult.current.elements).toHaveLength(2);
  //   expect(storeResult.current.elements[0].title).toBe('СЕТ 1');
  //   expect(storeResult.current.elements[1].title).toBe('СЕТ 2');

  //   act(() => {
  //     const set1 = storeResult.current.elements[0];
  //     const set2Id = storeResult.current.elements[1].elementId;
  //     storeResult.current.constructorStore.replaceSet(set1Id, 'New title!');
  //     storeResult.current.constructorStore.changeSetTitle(
  //       set2Id,
  //       'New title 2!',
  //     );
  //   });

  //   expect(storeResult.current.elements).toHaveLength(2);
  //   expect(storeResult.current.elements[0].title).toBe('New title!');
  //   expect(storeResult.current.elements[1].title).toBe('New title 2!');

  //   act(() => {
  //     const setId = storeResult.current.elements[0].elementId;
  //     storeResult.current.constructorStore.resetIfEmptySetTitle(setId);
  //   });

  //   expect(storeResult.current.elements).toHaveLength(2);
  //   expect(storeResult.current.elements[0].title).toBe('New title!');
  //   expect(storeResult.current.elements[1].title).toBe('New title 2!');

  //   act(() => {
  //     const set1Id = storeResult.current.elements[0].elementId;
  //     storeResult.current.constructorStore.changeSetTitle(set1Id, '');
  //   });

  //   expect(storeResult.current.elements).toHaveLength(2);
  //   expect(storeResult.current.elements[0].title).toBe('');
  //   expect(storeResult.current.elements[1].title).toBe('New title 2!');

  //   act(() => {
  //     const setId = storeResult.current.elements[0].elementId;
  //     storeResult.current.constructorStore.resetIfEmptySetTitle(setId);
  //   });

  //   expect(storeResult.current.elements).toHaveLength(2);
  //   expect(storeResult.current.elements[0].title).toBe('СЕТ 1');
  //   expect(storeResult.current.elements[1].title).toBe('New title 2!');
  // });

  // it('change exercise/set rest', () => {
  //   const {result: storeResult} = renderHook(
  //     () => ({
  //       constructorStore: useTrainingConstructorHistoryStore(),
  //       elements: useRecoilValue(constructorElementsSelector),
  //     }),
  //     {
  //       wrapper: RecoilRoot,
  //     },
  //   );

  //   act(() => {
  //     storeResult.current.constructorStore.addElement({
  //       type: ElementType.SET,
  //       elements: [],
  //       restAfterComplete: 10,
  //     });

  //     storeResult.current.constructorStore.addElement({
  //       type: ElementType.EXERCISE,
  //       id: '1',
  //       title: 'Hello, world!',
  //       completionType: ExerciseCompletionType.GYM,
  //       reps: 10,
  //       kg: 100,
  //       restAfterComplete: 15,
  //     });
  //   });

  //   expect(storeResult.current.elements).toHaveLength(2);
  //   expect(storeResult.current.elements[0].restAfterComplete).toBe(10);
  //   expect(storeResult.current.elements[1].restAfterComplete).toBe(15);

  //   act(() => {
  //     const setId = storeResult.current.elements[0].elementId;
  //     storeResult.current.constructorStore.changeSetRest(setId, 20);

  //     const exerciseId = storeResult.current.elements[1].elementId;
  //     storeResult.current.constructorStore.changeExerciseRest(exerciseId, 100);
  //   });

  //   expect(storeResult.current.elements).toHaveLength(2);
  //   expect(storeResult.current.elements[0].restAfterComplete).toBe(20);
  //   expect(storeResult.current.elements[1].restAfterComplete).toBe(100);
  // });

  it('replace exercises', () => {
    const {result: storeResult} = renderHook(
      () => ({
        constructorStore: useTrainingConstructorHistoryStore(),
        elements: useRecoilValue(constructorElementsSelector),
      }),
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      storeResult.current.constructorStore.addExercise(firstElement);
      storeResult.current.constructorStore.addExercise(secondElement);
      storeResult.current.constructorStore.addExercise(firstElement);
    });

    expect(storeResult.current.elements).toHaveLength(3);

    // const firstElementId: string = storeResult.current.elements[0].elementId;
    const secondElementId: string = storeResult.current.elements[1].elementId;
    const thirdElementId: string = storeResult.current.elements[2].elementId;

    act(() => {
      storeResult.current.constructorStore.reorder([
        secondElementId,
        thirdElementId,
        'some random id',
      ]);
    });

    expect(storeResult.current.elements).toHaveLength(2);

    expect(storeResult.current.elements[0].elementId).toBe(secondElementId);
    expect(storeResult.current.elements[1].elementId).toBe(thirdElementId);
  });
});
