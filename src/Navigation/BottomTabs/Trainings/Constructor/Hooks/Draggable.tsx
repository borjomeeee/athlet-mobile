import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Gesture} from 'react-native-gesture-handler';
import {
  cancelAnimation,
  Easing,
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AnimationsContext} from '../Store/Animations';
import {DraggableListState} from '../Types';

export const useDraggableGesture = (index: number) => {
  const {
    flatListRef,
    scrollY,
    scrollViewHeight,
    containerHeight,
    state,
    activeIndex,
    activeCellTranslateY,
    guessActiveIndex,
    data: list,
    measurmentsStore,
    reorder,
  } = React.useContext(AnimationsContext);

  const {height: windowHeight} = useWindowDimensions();

  const isOverScreen = useSharedValue(false);
  const overScreenDirection = useSharedValue(1);

  const scrollOffset = useSharedValue(scrollY.value);

  useAnimatedReaction(
    () => [isOverScreen.value, scrollY.value],
    () => {
      if (!isOverScreen.value) {
        scrollOffset.value = scrollY.value;
      }
    },
  );

  useAnimatedReaction(
    () => [isOverScreen.value, overScreenDirection.value],
    () => {
      cancelAnimation(scrollOffset);

      function scroll() {
        'worklet';
        const newScroll =
          overScreenDirection.value < 0
            ? Math.max(0, scrollY.value + overScreenDirection.value * 100)
            : Math.min(
                scrollViewHeight.value - containerHeight.value,
                scrollY.value + overScreenDirection.value * 100,
              );

        if (
          (overScreenDirection.value < 0 && scrollOffset.value > 0) ||
          (overScreenDirection.value > 0 &&
            scrollOffset.value < scrollViewHeight.value - containerHeight.value)
        ) {
          scrollOffset.value = withTiming(
            newScroll,
            {duration: 400, easing: Easing.linear},
            finished => finished && scroll(),
          );
        }
      }

      if (isOverScreen.value) {
        scroll();
      }
    },
  );

  function flatListScroll(offset: number) {
    if (flatListRef && 'current' in flatListRef) {
      flatListRef.current?.scrollToOffset({
        offset: offset > 0 ? offset : 0,
        animated: false,
      });
    }
  }

  useDerivedValue(() => {
    if (isOverScreen.value) {
      runOnJS(flatListScroll)(scrollOffset.value);
    }
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      if (state.value !== DraggableListState.FREE) {
        return;
      }

      state.value = DraggableListState.DRAGGING;
      activeIndex.value = index;

      activeCellTranslateY.value = 0;
    })
    .onUpdate(event => {
      if (state.value !== DraggableListState.DRAGGING) {
        return;
      }

      if (event.absoluteY < 120) {
        isOverScreen.value = true;
        overScreenDirection.value = -1;
      } else if (event.absoluteY - windowHeight > -120) {
        isOverScreen.value = true;
        overScreenDirection.value = 1;
      } else {
        isOverScreen.value = false;
      }

      activeCellTranslateY.value = event.translationY;
    })
    .onEnd(() => {
      if (
        activeIndex.value === undefined ||
        guessActiveIndex.value === undefined
      ) {
        return;
      }

      const translateHeight =
        activeIndex.value > guessActiveIndex.value
          ? list
              .slice(guessActiveIndex.value || 0, activeIndex.value)
              .reduce(
                (acc, _item) => acc + measurmentsStore.value[_item.id] || 0,
                0,
              )
          : -list
              .slice(activeIndex.value + 1, guessActiveIndex.value + 1)
              .reduce(
                (acc, _item) => acc + measurmentsStore.value[_item.id] || 0,
                0,
              );

      activeCellTranslateY.value = withTiming(
        -translateHeight,
        {},
        isFinished => {
          if (isFinished) {
            if (
              activeIndex.value !== undefined &&
              guessActiveIndex.value !== undefined &&
              activeIndex.value !== guessActiveIndex.value
            ) {
              runOnJS(reorder)(activeIndex.value, guessActiveIndex.value);
            }
          }
        },
      );
    })
    .onTouchesUp(() => {
      state.value = DraggableListState.FREE;
    });

  return gesture;
};
