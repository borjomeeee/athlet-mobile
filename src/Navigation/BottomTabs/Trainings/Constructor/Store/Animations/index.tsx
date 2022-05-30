import React from 'react';
import Animated from 'react-native-reanimated';
import {ExerciseValuesStore} from '../../Types';

export const AnimationsContext = React.createContext<{
  scrollViewRef: React.RefObject<Animated.ScrollView>;
  scrollY: Animated.SharedValue<number>;

  positions: Animated.SharedValue<ExerciseValuesStore>;
}>(undefined as any);
