import React from 'react';
import {FlatList} from 'react-native';
import Animated, {
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
} from 'react-native-reanimated';
import {DraggableListState, ConstructorElementViewList} from '../../Types';

export type AnimationsContextType = {
  flatListRef: React.RefObject<FlatList>;
  scrollY: Animated.SharedValue<number>;
  containerHeight: Animated.SharedValue<number>;
  scrollViewHeight: Animated.SharedValue<number>;
  activeIndex: Animated.SharedValue<number | undefined>;
  guessActiveIndex: Animated.SharedValue<number | undefined>;
  measurmentsStore: Animated.SharedValue<Record<string, number>>;
  state: Animated.SharedValue<DraggableListState>;
  activeCellTranslateY: Animated.SharedValue<number>;
  reorder: (prevIndex: number, newIndex: number) => void;
  data: ConstructorElementViewList;
};
export const AnimationsContext = React.createContext<AnimationsContextType>(
  undefined as any,
);

export const useAnimationsValues = (
  viewElements: ConstructorElementViewList,
) => {
  const scrollY = useSharedValue(0);

  const containerHeight = useSharedValue(0);
  const scrollViewHeight = useSharedValue(0);

  const activeIndex = useSharedValue<number | undefined>(undefined);
  const guessActiveIndex = useSharedValue<number | undefined>(undefined);

  const activeCellTranslateY = useSharedValue(0);

  const state = useSharedValue(DraggableListState.CALCULATING_LAYOUT);

  const measurmentsStore = useSharedValue<Record<string, number>>({});

  useAnimatedReaction(
    () => activeIndex.value,
    indx => {
      guessActiveIndex.value = indx;
    },
  );

  useAnimatedReaction(
    () => measurmentsStore.value,
    measurments => {
      if (
        state.value === DraggableListState.CALCULATING_LAYOUT ||
        state.value === DraggableListState.FREE
      ) {
        const measuredItems = Object.keys(measurments);
        state.value = viewElements.every(item =>
          measuredItems.includes(item.id),
        )
          ? DraggableListState.FREE
          : DraggableListState.CALCULATING_LAYOUT;
      }
    },
  );

  useAnimatedReaction(
    () => [
      activeCellTranslateY.value,
      guessActiveIndex.value,
      activeIndex.value,
    ],
    () => {
      if (
        guessActiveIndex.value === undefined ||
        activeIndex.value === undefined
      ) {
        return;
      }

      const prevItemIndex = guessActiveIndex.value - 1;
      const prevItem =
        guessActiveIndex.value > 0 ? viewElements[prevItemIndex] : undefined;

      const nextItemIndex = guessActiveIndex.value + 1;
      const nextItem =
        guessActiveIndex.value < viewElements.length - 1
          ? viewElements[nextItemIndex]
          : undefined;

      if (prevItem) {
        const heightBeforeItem =
          activeIndex.value > prevItemIndex
            ? viewElements
                .slice(prevItemIndex, activeIndex.value)
                .reduce(
                  (acc, _item) => acc + measurmentsStore.value[_item.id] || 0,
                  0,
                )
            : -viewElements
                .slice(activeIndex.value, prevItemIndex)
                .reduce(
                  (acc, _item) => acc + measurmentsStore.value[_item.id] || 0,
                  0,
                );

        if (-activeCellTranslateY.value > heightBeforeItem) {
          guessActiveIndex.value = guessActiveIndex.value - 1;
          return;
        }
      }

      if (nextItem) {
        const heightAfterItem =
          activeIndex.value >= nextItemIndex
            ? viewElements
                .slice(nextItemIndex, activeIndex.value)
                .reduce(
                  (acc, _item) => acc + measurmentsStore.value[_item.id] || 0,
                  0,
                )
            : -viewElements
                .slice(activeIndex.value, nextItemIndex)
                .reduce(
                  (acc, _item) => acc + measurmentsStore.value[_item.id] || 0,
                  0,
                );

        if (-activeCellTranslateY.value < heightAfterItem) {
          guessActiveIndex.value = guessActiveIndex.value + 1;
          return;
        }
      }
    },
    [viewElements],
  );

  return {
    scrollY,
    containerHeight,
    scrollViewHeight,
    activeIndex,
    guessActiveIndex,
    activeCellTranslateY,
    state,
    measurmentsStore,
  };
};
