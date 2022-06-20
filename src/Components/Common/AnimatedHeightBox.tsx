import React from 'react';
import * as RN from 'react-native';

import Animated, {
  useAnimatedStyle,
  useAnimatedRef,
  useSharedValue,
} from 'react-native-reanimated';

import s from '@borjomeeee/rn-styles';

export const AnimatedHeightBox: React.FC<{
  style?: RN.ViewStyle;
}> = ({style: providedStyle, children}) => {
  const animatedRef = useAnimatedRef<Animated.View>();
  const height = useSharedValue(0);

  const heightStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const handleLayout = React.useCallback(() => {
    if (animatedRef && animatedRef.current) {
      animatedRef.current.measure((x, y, w, h, pageX, pageY) => {
        height.value = h;
      });
    }
  }, [animatedRef, height]);

  React.useEffect(() => {
    RN.LayoutAnimation.configureNext(RN.LayoutAnimation.Presets.spring);
    () => RN.LayoutAnimation.configureNext(RN.LayoutAnimation.Presets.spring);
  });

  const style = React.useMemo(
    () => [s(`rel ofh`), heightStyle, providedStyle],
    [heightStyle, providedStyle],
  );

  return (
    <Animated.View style={style}>
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
