import React from 'react';
import Animated from 'react-native-reanimated';
import {DraggableListState, ConstructorElementViewList} from '../../Types';

export const AnimationsContext = React.createContext<{
  activeIndex: Animated.SharedValue<number | undefined>;
  guessActiveIndex: Animated.SharedValue<number | undefined>;
  measurmentsStore: Animated.SharedValue<Record<string, number>>;
  state: Animated.SharedValue<DraggableListState>;
  activeCellTranslateY: Animated.SharedValue<number>;
  reorder: (prevIndex: number, newIndex: number) => void;
  data: ConstructorElementViewList;
}>(undefined as any);
