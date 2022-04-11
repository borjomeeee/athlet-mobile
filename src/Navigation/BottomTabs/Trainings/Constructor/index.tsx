import s from '@borjomeeee/rn-styles';
import React from 'react';
import Animated, {
  Layout,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';

import * as UI from 'src/Components';
import {
  useTrainingConstructorController,
  useTrainingConstructorHeader,
  useTrainingConstructorNavigationEffect,
} from './Hooks';
import {currentTrainingSelector, isEditingSelector} from './Store';
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

  const isEditing = useRecoilValue(isEditingSelector);
  const currentTraining = useRecoilValue(currentTrainingSelector);
  const {reset, handleChangeTitle} = useTrainingConstructorController();

  useTrainingConstructorNavigationEffect();
  useTrainingConstructorHeader();

  React.useEffect(() => () => reset(), [reset]);
  React.useEffect(() => {
    if (!isEditing && currentTraining) {
      handleChangeTitle(currentTraining.title);
    }
  }, [isEditing, currentTraining, handleChangeTitle]);

  return (
    <>
      <UI.View style={s(`fill bgc:#ff0000`)}>
        <UI.View style={s(`abs t:0 b:0 r:0 l:0`)}>
          <UI.View style={s(`fill bgc:white`)} />
          <UI.View style={s(`fill bgc:layout`)} />
        </UI.View>

        <Animated.ScrollView
          ref={ref}
          style={s(`fill`)}
          contentContainerStyle={s(`pb:100 bgc:layout`)}
          scrollEventThrottle={16}
          scrollEnabled={true}
          onScroll={handleScroll}>
          <Animated.View style={s(`fill`)} layout={Layout}>
            <Header />

            <UI.HSpacer size={8} />
            <ElementsList scrollViewRef={ref} scrollY={scrollY} />
            <UI.HSpacer size={20} />

            <Animated.View style={s(`zi:-1`)} layout={Layout}>
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
};
