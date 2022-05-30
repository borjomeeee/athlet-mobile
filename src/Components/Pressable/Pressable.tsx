import React from 'react';
import * as RN from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const Pressable: React.FC<
  React.ComponentProps<typeof RN.TouchableOpacity>
> = props => <RN.TouchableOpacity activeOpacity={0.7} {...props} />;

export const PressableItem: React.FC<
  React.ComponentProps<typeof RN.TouchableHighlight>
> = props => <RN.TouchableHighlight underlayColor="#D0D7DE32" {...props} />;

export const Scalable: React.FC<React.ComponentProps<typeof RN.Pressable>> = ({
  onPressIn,
  onPressOut,
  children,
  ...props
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = React.useCallback(
    e => {
      onPressIn?.(e);
      scale.value = 0.95;
    },
    [onPressIn, scale],
  );

  const handlePressOut = React.useCallback(
    e => {
      onPressOut?.(e);
      scale.value = 1;
    },
    [onPressOut, scale],
  );

  const style = useAnimatedStyle(() => ({
    transform: [{scale: withTiming(scale.value)}],
  }));

  return (
    <Animated.View style={style}>
      <RN.Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...props}>
        {children}
      </RN.Pressable>
    </Animated.View>
  );
};
