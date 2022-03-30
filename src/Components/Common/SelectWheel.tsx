import s from '@borjomeeee/rn-styles';
import React from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
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

interface SelectWheelProps {
  start: number;
  end: number;

  step?: number;
  defaultValue?: number;

  width?: number;
}

const DIGIT_HEIGHT = 33;
const HEIGHT = DIGIT_HEIGHT * 5;

const springConfig: WithSpringConfig = {damping: 20};
export const SelectWheel: React.FC<SelectWheelProps> = ({
  start,
  end,
  step = 1,
  width = 60,
  defaultValue = 0,
}) => {
  const numberItems = React.useMemo(
    () => Math.floor(end - start + 1) / step,
    [end, start, step],
  );

  const defaultValueIndex = React.useMemo(
    () => Math.floor((defaultValue - start) / step),
    [defaultValue, start, step],
  );

  const [startIndexToShow, setStartIndexToShow] =
    React.useState(defaultValueIndex);

  const topHeight = React.useMemo(() => {
    return Math.max(startIndexToShow - 5, 0) * DIGIT_HEIGHT;
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

  const data = React.useMemo(
    () =>
      new Array(numberItems)
        .fill(undefined)
        .map((_, indx) => start + indx * step)
        .slice(Math.max(startIndexToShow - 5, 0), startIndexToShow + 5 + 1),
    [numberItems, startIndexToShow, start, step],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: y.value}],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={s(`h:${HEIGHT} w:${width} ofh`)}>
        <View style={s(`abs t:0 r:0 l:0 zi:100`)} pointerEvents="none">
          <Start width={width} height={66} />
        </View>

        <Animated.View style={animatedStyle}>
          <HSpacer size={DIGIT_HEIGHT * 2} />
          <HSpacer size={topHeight} />

          {data.map(value => (
            <React.Fragment key={value.toString()}>
              <Number value={value} />
            </React.Fragment>
          ))}
          <HSpacer size={DIGIT_HEIGHT * 2} />
        </Animated.View>

        <View style={s(`abs b:0 r:0 l:0 zi:100 aic jcc`)} pointerEvents="none">
          <End width={width} height={66} />
        </View>
      </View>
    </GestureDetector>
  );
};

interface NumberProps {
  value: number;
}
function Number({value}: NumberProps) {
  return (
    <Animated.View style={s(`aic`)}>
      <Text style={s(`fsz:28 lh:33 medium`)}>
        {value < 10 ? `0${value}` : value}
      </Text>
    </Animated.View>
  );
}

function Start({width, height}: SvgProps) {
  return (
    <Svg {...{width, height}}>
      <Defs>
        <LinearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#ffffff" stopOpacity="0.8" />
          <Stop offset="1" stopColor="#ffffff" stopOpacity="0.5" />
        </LinearGradient>

        <LinearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <Stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width={width} height="56" fill="url(#grad1)" />
      <Rect x="0" y="56" width={width} height="10" fill="url(#grad2)" />
    </Svg>
  );
}

function End({width, height}: SvgProps) {
  return (
    <Svg {...{width, height}}>
      <Defs>
        <LinearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <Stop offset="1" stopColor="#ffffff" stopOpacity="0.5" />
        </LinearGradient>

        <LinearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <Stop offset="1" stopColor="#ffffff" stopOpacity="0.8" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width={width} height="10" fill="url(#grad1)" />
      <Rect x="0" y="10" width={width} height="56" fill="url(#grad2)" />
    </Svg>
  );
}
