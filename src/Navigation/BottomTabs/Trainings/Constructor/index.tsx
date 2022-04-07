import s from '@borjomeeee/rn-styles';
import React from 'react';
import Animated, {
  Layout,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import * as UI from 'src/Components';
import {
  useTrainingConstructorController,
  useTrainingConstructorHeader,
  useTrainingConstructorNavigationEffect,
} from './Hooks';
import {AddElementButton} from './Views/AddElementButton';
import {ElementsList} from './Views/ElementsList';
import {Header} from './Views/Header';
import {Submit} from './Views/Submit';

export const Constructor = () => {
  const ref = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler(
    e => (scrollY.value = e.contentOffset.y),
  );

  const {reset} = useTrainingConstructorController();

  useTrainingConstructorNavigationEffect();
  useTrainingConstructorHeader();

  React.useEffect(() => () => reset(), [reset]);

  return (
    <Animated.ScrollView
      ref={ref}
      style={s(`fill bgc:layout`)}
      contentContainerStyle={s(`pb:100`)}
      scrollEventThrottle={16}
      scrollEnabled={true}
      onScroll={handleScroll}>
      <Animated.View style={s(`fill`)} layout={Layout}>
        <Header />

        <UI.HSpacer size={8} />
        <ElementsList scrollViewRef={ref} scrollY={scrollY} />
        <UI.HSpacer size={20} />

        <Animated.View style={s(`zi:1`)} layout={Layout}>
          <AddElementButton />
          <UI.HSpacer size={20} />
          <Submit />
        </Animated.View>
      </Animated.View>
    </Animated.ScrollView>
  );
};
