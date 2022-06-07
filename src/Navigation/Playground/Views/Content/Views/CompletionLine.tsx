import s from '@borjomeeee/rn-styles';
import {useDimensions} from '@react-native-community/hooks';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  withTiming,
  Extrapolate,
} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import {
  currentIndexStore,
  trainingElementsStore,
} from 'src/Navigation/Playground/Store';

export const CompletionLine = () => {
  const {
    screen: {width: screenWidth},
  } = useDimensions();

  const currentIndex = useRecoilValue(currentIndexStore);
  const traininingElements = useRecoilValue(trainingElementsStore);

  const trainingElementsLength = traininingElements.length;
  const translateX = useDerivedValue(() =>
    interpolate(
      currentIndex,
      [0, trainingElementsLength],
      [-screenWidth + 50, 0],
      Extrapolate.CLAMP,
    ),
  );

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(translateX.value),
      },
    ],
  }));

  const style = React.useMemo(
    () => [s(`h:10 bgc:green`), animStyle],
    [animStyle],
  );

  return <Animated.View style={style} />;
};
