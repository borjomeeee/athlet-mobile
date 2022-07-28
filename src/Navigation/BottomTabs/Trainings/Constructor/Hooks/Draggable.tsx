import React from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {runOnJS, withTiming} from 'react-native-reanimated';
import {AnimationsContext} from '../Store/Animations';
import {DraggableListState} from '../Types';

export const useDraggableGesture = (index: number) => {
  const {
    state,
    activeIndex,
    activeCellTranslateY,
    guessActiveIndex,
    data: list,
    measurmentsStore,
    reorder,
  } = React.useContext(AnimationsContext);

  return Gesture.Pan()
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
      activeCellTranslateY.value = event.translationY;
    })
    .onEnd(() => {
      if (state.value !== DraggableListState.DRAGGING) {
        return;
      }
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

      state.value = DraggableListState.FREE;
    });
};
