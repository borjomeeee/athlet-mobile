import s from '@borjomeeee/rn-styles';
import React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {
  Gesture,
  GestureDetector,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  WithSpringConfig,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Defs,
  LinearGradient,
  Rect,
  Stop,
  SvgProps,
} from 'react-native-svg';
import {HSpacer} from './Spacer';
import {Text} from './Text';
import {View} from './View';

export interface SelectWheelValueChild {
  value: number;
  Component: React.FC;

  style?: ViewStyle;
}

export interface SelectWheelProps {
  start: number;
  end: number;

  step?: number;
  defaultValue?: number;

  width?: number;
  onChangeValue?: (value: number) => void;

  textStyle?: TextStyle;
  gradientColor?: string;

  valueChild?: SelectWheelValueChild;
  disableOverflow?: boolean;
}

const DIGIT_HEIGHT = 33;
const HEIGHT = DIGIT_HEIGHT * 5;

const springConfig: WithSpringConfig = {damping: 20};
export const SelectWheelHelper: React.FC<SelectWheelProps> = ({
  start,
  end,
  step = 1,
  width = 60,
  defaultValue = 0,
  onChangeValue,
  textStyle,
  gradientColor,

  valueChild,
  disableOverflow,
}) => {
  const numberItems = React.useMemo(
    () => Math.floor(end - start + 1) / step,
    [end, start, step],
  );

  const [_defaultValue] = React.useState(defaultValue);

  const defaultValueIndex = React.useMemo(
    () => Math.floor((_defaultValue - start) / step),
    [_defaultValue, start, step],
  );

  const [startIndexToShow, setStartIndexToShow] =
    React.useState(defaultValueIndex);

  const topHeight = React.useMemo(() => {
    return Math.max(startIndexToShow - 3, 0) * DIGIT_HEIGHT;
  }, [startIndexToShow]);

  const startTranslateY = useSharedValue(defaultValueIndex * -DIGIT_HEIGHT);
  const translateY = useSharedValue(0);

  const y = useDerivedValue(() => startTranslateY.value + translateY.value);

  const gesture = Gesture.Pan()
    .onStart(() => {
      startTranslateY.value += translateY.value;
      translateY.value = 0;
    })
    .onUpdate(e => {
      translateY.value = e.translationY;
    })
    .onEnd(e => {
      const newTranslateY = e.translationY + e.velocityY / 5;

      const MAXIMUM_TRANSLATE_Y = 0;
      const MINIMUM_TRANSLATE_Y = -DIGIT_HEIGHT * numberItems + DIGIT_HEIGHT;

      if (newTranslateY + startTranslateY.value > MAXIMUM_TRANSLATE_Y) {
        translateY.value = withSpring(
          MAXIMUM_TRANSLATE_Y - startTranslateY.value,
          springConfig,
        );
      } else if (newTranslateY + startTranslateY.value < MINIMUM_TRANSLATE_Y) {
        translateY.value = withSpring(
          MINIMUM_TRANSLATE_Y - startTranslateY.value,
          springConfig,
        );
      } else {
        let closestTranslateXToNumber =
          Math.round(newTranslateY / DIGIT_HEIGHT) * DIGIT_HEIGHT;

        const k = (closestTranslateXToNumber - newTranslateY) / DIGIT_HEIGHT;

        if (Math.abs(k) >= 0.7) {
          closestTranslateXToNumber += Math.round(k) * DIGIT_HEIGHT;
        }

        translateY.value = withTiming(closestTranslateXToNumber, {
          easing: Easing.bezier(0.01, 0.38, 0.16, 0.96).factory(),
          duration: 300,
        });
      }
    });

  useAnimatedReaction(
    () => y.value,
    _ => runOnJS(setStartIndexToShow)(-Math.round(y.value / DIGIT_HEIGHT)),
  );

  React.useEffect(() => {
    onChangeValue?.(Math.min(Math.max(startIndexToShow, start), end));
  }, [startIndexToShow, onChangeValue, start, end]);

  const data = React.useMemo(() => {
    const startIndex = Math.max(startIndexToShow - 3, 0);
    const endIndex = Math.min(startIndex + 7, numberItems - 1);

    if (endIndex - startIndex < 0) {
      return [];
    }

    return new Array(endIndex - startIndex + 1)
      .fill(undefined)
      .map((_, indx) => start + (startIndex + indx) * step);
  }, [numberItems, startIndexToShow, start, step]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: y.value}],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={s(`h:${HEIGHT} w:${width} ofh`, disableOverflow && `ofv`)}>
        <View style={s(`abs t:0 r:0 l:0 zi:100`)} pointerEvents="none">
          <Start width={width} fill={gradientColor} height={66} />
        </View>

        <Animated.View style={animatedStyle}>
          <HSpacer size={DIGIT_HEIGHT * 2} />
          <HSpacer size={topHeight} />

          {data.map(value => {
            const ValueChildComponent = valueChild
              ? valueChild.Component
              : React.Fragment;

            return (
              <View style={s(`rel`)} key={value.toString()}>
                {valueChild && valueChild.value === value && (
                  <View style={[s(`abs`), valueChild.style]}>
                    <ValueChildComponent />
                  </View>
                )}
                <Number value={value} textStyle={textStyle} />
              </View>
            );
          })}
          <HSpacer size={DIGIT_HEIGHT * 2} />
        </Animated.View>

        <View style={s(`abs b:0 r:0 l:0 zi:100 aic jcc`)} pointerEvents="none">
          <End width={width} fill={gradientColor} height={66} />
        </View>
      </View>
    </GestureDetector>
  );
};

interface NumberProps {
  value: number;
  textStyle?: TextStyle;
}
function Number({value, textStyle}: NumberProps) {
  const style = React.useMemo(
    () => [s(`fsz:28 lh:33 medium`), textStyle],
    [textStyle],
  );
  return (
    <Animated.View style={s(`aic`)}>
      <Text style={style}>{value < 10 ? `0${value}` : value}</Text>
    </Animated.View>
  );
}

function Start({width, height, fill = '#ffffff'}: SvgProps) {
  return (
    <Svg {...{width, height}}>
      <Defs>
        <LinearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={fill} stopOpacity="0.8" />
          <Stop offset="1" stopColor={fill} stopOpacity="0.5" />
        </LinearGradient>

        <LinearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={fill} stopOpacity="0.5" />
          <Stop offset="1" stopColor={fill} stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width={width} height="56" fill="url(#grad1)" />
      <Rect x="0" y="56" width={width} height="10" fill="url(#grad2)" />
    </Svg>
  );
}

function End({width, height, fill = '#ffffff'}: SvgProps) {
  return (
    <Svg {...{width, height}}>
      <Defs>
        <LinearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={fill} stopOpacity="0" />
          <Stop offset="1" stopColor={fill} stopOpacity="0.5" />
        </LinearGradient>

        <LinearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={fill} stopOpacity="0.5" />
          <Stop offset="1" stopColor={fill} stopOpacity="0.8" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width={width} height="10" fill="url(#grad1)" />
      <Rect x="0" y="10" width={width} height="56" fill="url(#grad2)" />
    </Svg>
  );
}

export const SelectWheel = gestureHandlerRootHOC(SelectWheelHelper, {flex: 0});
