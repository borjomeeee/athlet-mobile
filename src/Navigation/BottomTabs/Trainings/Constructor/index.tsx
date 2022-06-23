import s from '@borjomeeee/rn-styles';
import React from 'react';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import GymIcon from 'src/Assets/Svg/Gym';
import * as UI from 'src/Components';
import {withHooks} from 'src/Utils/HOCs';
import {useTrainingConstructorController} from './Controller';
import {useTrainingConstructorHeader} from './Hooks/Header';
import {useTrainingConstructorInitialTraining} from './Hooks/InitialTraining';
import {useTrainingConstructorNavigationEffect} from './Hooks/NavigationEffect';
import {AddElementButton} from './Views/AddElementButton';
import {ElementsList} from './Views/ElementsList';
import {Header} from './Views/Header';
import {Submit} from './Views/Submit';

export const Constructor = withHooks(
  [
    useTrainingConstructorInitialTraining,
    useTrainingConstructorNavigationEffect,
    useTrainingConstructorHeader,
  ],
  () => {
    const ref = useAnimatedRef<Animated.ScrollView>();
    const scrollY = useSharedValue(0);

    const handleScroll = useAnimatedScrollHandler(
      e => (scrollY.value = e.contentOffset.y),
    );

    const {reset} = useTrainingConstructorController();
    React.useEffect(() => () => reset(), [reset]);

    return (
      <>
        <UI.View style={s(`fill bgc:layout`)}>
          <Animated.ScrollView
            ref={ref}
            style={s(`fill`)}
            contentContainerStyle={s(`pb:100`)}
            scrollEventThrottle={16}
            onScroll={handleScroll}
            bounces={false}>
            <Animated.View style={s(`fill`)}>
              <Header />

              <UI.HSpacer size={8} />
              <ElementsList scrollViewRef={ref} scrollY={scrollY} />
              <UI.HSpacer size={20} />

              <Animated.View style={s(`zi:-1`)}>
                <AddElementButton />
                <UI.HSpacer size={20} />
              </Animated.View>
            </Animated.View>
          </Animated.ScrollView>

          <UI.View style={s(`abs r:0 l:0 b:20`)}>
            <Submit />
          </UI.View>
        </UI.View>
      </>
    );
  },
);
