import React from 'react';
import {FlatList} from 'react-native';
import Animated from 'react-native-reanimated';
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
