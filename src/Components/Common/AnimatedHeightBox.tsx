import React from 'react';
import * as RN from 'react-native';

import Animated, {
  withTiming,
  useAnimatedStyle,
  Easing,
  useAnimatedRef,
  useSharedValue,
} from 'react-native-reanimated';

import s from '@borjomeeee/rn-styles';

export const AnimatedHeightBox: React.FC<{
  style?: RN.ViewStyle;
  animatedMount?: boolean;
}> = ({style, animatedMount = false, children}) => {
  const animatedRef = useAnimatedRef<Animated.View>();
  const [mounted, setMounted] = React.useState(false);

  const height = useSharedValue(0);

  const heightStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: 'hidden',
    position: 'relative',

    ...style,
  }));

  const handleLayout = React.useCallback(() => {
    if (animatedRef && animatedRef.current) {
      animatedRef.current.measure((x, y, w, h, pageX, pageY) => {
        if (!animatedMount && !mounted) {
          height.value = h;
        }

        if (!mounted) {
          setMounted(true);
          return;
        }

        height.value = withTiming(h, {
          easing: Easing.inOut(Easing.ease),
        });
      });
    }
  }, [animatedRef, height, animatedMount, mounted]);

  return (
    <Animated.View style={heightStyle}>
      <RN.View style={s(`abs r:0 l:0`)}>
        <Animated.View
          ref={animatedRef}
          style={RN.StyleSheet.absoluteFillObject}
          onLayout={handleLayout}
        />
        {children}
      </RN.View>
    </Animated.View>
  );
};
