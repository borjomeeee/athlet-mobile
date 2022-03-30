import React from 'react';
import * as RN from 'react-native';

import {useLayout} from '@react-native-community/hooks';
import Animated, {
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

import s from '@borjomeeee/rn-styles';

export const AnimatedHeightBox: React.FC<{style?: RN.ViewStyle}> = ({
  style,
  children,
}) => {
  const [wasMeasured, setWasMeasured] = React.useState(false);
  const {onLayout, ...layout} = useLayout();

  const heightStyle = useAnimatedStyle(() => ({
    height: !wasMeasured
      ? layout.height
      : withTiming(layout.height, {easing: Easing.inOut(Easing.ease)}),
    overflow: 'hidden',
    position: 'relative',

    ...style,
  }));

  React.useEffect(() => {
    if (layout.height) {
      setWasMeasured(true);
    }
  }, [layout]);

  return (
    <Animated.View style={heightStyle}>
      <RN.View style={s(`abs r:0 l:0`)} onLayout={onLayout} {...{children}} />
    </Animated.View>
  );
};
