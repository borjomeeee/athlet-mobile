import s from '@borjomeeee/rn-styles';
import {useFocusEffect} from '@react-navigation/core';
import React from 'react';
import * as RN from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import * as UI from 'src/Components';
import {
  useTrainingConstructorController,
  useTrainingConstructorHeader,
} from './Hooks';
import {AddElementButton} from './Views/AddElementButton';
import {ElementsList} from './Views/ElementsList';
import {Header} from './Views/Header';

export const Constructor = () => {
  const ref = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler(
    e => (scrollY.value = e.contentOffset.y),
  );

  const {reset} = useTrainingConstructorController();
  useTrainingConstructorHeader();

  useFocusEffect(React.useCallback(() => () => reset(), [reset]));

  return (
    <Animated.ScrollView
      ref={ref}
      style={s(`fill bgc:layout`)}
      contentContainerStyle={s(`pb:100`)}
      scrollEventThrottle={16}
      scrollEnabled={true}
      onScroll={handleScroll}>
      <Header />
      <UI.HSpacer size={8} />
      <ElementsList scrollViewRef={ref} scrollY={scrollY} />
      <UI.HSpacer size={20} />
      <AddElementButton />
    </Animated.ScrollView>
  );
};
