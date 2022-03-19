import React from 'react';
import * as RN from 'react-native';

import s from '@borjomeeee/rn-styles';
import {
  View,
  InputWithVariant,
  VSpacer,
  Input,
  InputWithVariantProps,
  Text,
  HSpacer,
  Pressable,
} from 'src/Components';
import {Colors} from 'src/Utils/Styles';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface DefaultInputProps extends InputWithVariantProps {
  rightChild?: React.ReactNode;
  leftChild?: React.ReactNode;

  error?: string;
}
export const DefaultInput: React.FC<DefaultInputProps> = ({
  inputRef = React.createRef() as React.MutableRefObject<RN.TextInput>,

  rightChild: RightChild,
  leftChild: LeftChild,

  error,
  style,

  value,

  onChangeText,
  ...props
}) => {
  const animatedShakeValue = useSharedValue(0);
  const inputStyle = React.useMemo(() => [s(`fill p:0`), style], [style]);

  const translateXError = useDerivedValue(() =>
    interpolate(
      animatedShakeValue.value,
      [0, 0.25, 0.5, 0.75, 1],
      [0, -5, 5, -5, 0],
    ),
  );

  const errorAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateXError.value}],
  }));

  React.useEffect(() => {
    if (error) {
      animatedShakeValue.value = withTiming(1, {
        easing: Easing.ease,
        duration: 400,
      });
    } else {
      animatedShakeValue.value = 0;
    }
  }, [error, animatedShakeValue]);

  const handlePressError = React.useCallback(() => {
    inputRef.current.focus();
    onChangeText?.(value || '');
  }, [inputRef, value, onChangeText]);

  const containerStyle = React.useMemo(
    () => [
      errorAnimatedStyle,
      s(
        `rel h:46 br:4 bw:1 bc:lightGray ph:12 mb:7`,
        `row aic bgc:white ofv`,
        error && `bc:red`,
      ),
    ],
    [error, errorAnimatedStyle],
  );

  return (
    <View>
      <Animated.View style={containerStyle}>
        {LeftChild && (
          <>
            {LeftChild}
            <VSpacer size={10} />
          </>
        )}
        <InputWithVariant
          inputRef={inputRef}
          Variant={Input}
          style={inputStyle}
          placeholderTextColor={Colors.lightGray}
          onChangeText={onChangeText}
          value={value}
          {...props}
        />
        {RightChild && (
          <>
            <VSpacer size={10} />
            {RightChild}
          </>
        )}

        {!!error && (
          <View style={s(`abs t:0 r:0 b:0 l:0 bgc:white br:4`)}>
            <Pressable style={s(`fill aic jcc`)} onPress={handlePressError}>
              <Text style={s(`c:red P9 tac`)}>{error}</Text>
            </Pressable>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export interface DefaultInputWithLabelProps extends DefaultInputProps {
  label: string;
}
export const DefaultInputWithLabel: React.FC<DefaultInputWithLabelProps> = ({
  inputRef = React.createRef() as React.MutableRefObject<RN.TextInput>,
  label,
  error,
  ...props
}) => {
  const handlePressLabel = React.useCallback(
    () => inputRef.current.focus(),
    [inputRef],
  );
  return (
    <View>
      <Pressable onPress={handlePressLabel} activeOpacity={1}>
        <Text style={s(`c:darkGray`, error && `c:red`)}>{label}</Text>
        <HSpacer size={7} />
      </Pressable>
      <DefaultInput
        inputRef={inputRef}
        Variant={Input}
        error={error}
        {...props}
      />
    </View>
  );
};
