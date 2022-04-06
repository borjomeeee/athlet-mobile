import React from 'react';
import * as RN from 'react-native';

import s from '@borjomeeee/rn-styles';
import {Pressable} from './Pressable';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {View} from '../Common';
import {useOverlay} from 'src/Lib/Overlay';

export const OverlayAction: React.FC<
  React.ComponentProps<typeof Pressable>
> = ({onPressIn, onPressOut, style, children, ...props}) => {
  const {close} = useOverlay();

  const isPressed = useSharedValue(false);
  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,

    borderRadius: 6,
    backgroundColor: '#D0D7DE32',

    opacity: withTiming(+isPressed.value, {duration: 100}),
    zIndex: -1,
  }));

  const handlePressIn = React.useCallback(
    (e: RN.GestureResponderEvent) => {
      isPressed.value = true;
      onPressIn?.(e);
    },
    [onPressIn, isPressed],
  );

  const handlePressOut = React.useCallback(
    (e: RN.GestureResponderEvent) => {
      isPressed.value = false;
      onPressOut?.(e);
      close();
    },
    [onPressOut, close, isPressed],
  );

  const buttonStyle = React.useMemo(() => [s(`ph:8 pv:6`), style], [style]);

  return (
    <Pressable
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={buttonStyle}
      {...props}>
      <View>{children}</View>
      <Animated.View style={animatedStyle} />
    </Pressable>
  );
};
