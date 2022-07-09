import s from '@borjomeeee/rn-styles';
import React from 'react';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {isPauseStore, pauseTimeStore} from 'src/Navigation/Playground/Store';

interface ExpirationTimeProps {
  duration: number;
  onExpire?: () => void;

  onChange?: (duration: number) => void;
}
export const ExpirationTime: React.FC<ExpirationTimeProps> = ({
  duration: providedDuration,
  onChange,
  onExpire,
}) => {
  const [startTime] = React.useState(Date.now());
  const isPause = useRecoilValue(isPauseStore);
  const pauseTime = useRecoilValue(pauseTimeStore);

  const [initialPauseTime] = React.useState(pauseTime);
  const [clockTime, setClockTime] = React.useState(startTime);

  const [expirationTime, setExpirationTime] = React.useState(
    clockTime + initialPauseTime + providedDuration,
  );

  const duration = React.useMemo(
    () => Math.max(clockTime - startTime - (pauseTime - initialPauseTime), 0),
    [clockTime, startTime, pauseTime, initialPauseTime],
  );

  React.useEffect(() => {
    onChange?.(Math.floor(duration / 1000) * 1000);

    setTimeout(() => {
      if (expirationTime <= clockTime) {
        onChange?.(providedDuration);
        onExpire?.();
      }
    }, 0);
  }, [
    providedDuration,
    expirationTime,
    clockTime,
    duration,
    onExpire,
    onChange,
  ]);

  React.useEffect(() => {
    if (!isPause) {
      setClockTime(Date.now());

      const intervalId = setInterval(() => {
        const nowTime = Date.now();
        setClockTime(nowTime);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isPause, startTime, pauseTime, initialPauseTime]);

  React.useEffect(() => {
    setExpirationTime(
      startTime + providedDuration + (pauseTime - initialPauseTime),
    );
  }, [startTime, providedDuration, pauseTime, initialPauseTime]);

  const formattedDiffTime = React.useMemo(() => {
    const restInSecs = Math.ceil((expirationTime - clockTime) / 1000);

    const mins = Math.floor(restInSecs / 60);
    const secs = Math.floor(restInSecs % 60);

    const minsStr = mins >= 10 ? mins.toString() : `0${mins}`;
    const secsStr = secs >= 10 ? secs.toString() : `0${secs}`;

    return `${minsStr}:${secsStr}`;
  }, [expirationTime, clockTime]);

  const handlePressAdd30s = React.useCallback(() => {
    setExpirationTime(i => i + 30 * 1000);
  }, []);

  const animatedDuration = useDerivedValue(() => duration);
  const animatedProgress = useDerivedValue(() =>
    interpolate(
      animatedDuration.value,
      [0, expirationTime - startTime],
      [0, 160],
    ),
  );

  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: withTiming(animatedProgress.value, {
        duration: 1000,
        easing: Easing.linear,
      }),
    };
  }, []);
  const style = React.useMemo(
    () => [s(`abs t:0 l:0 b:0 r:0 bgc:green`), animatedWidth],
    [animatedWidth],
  );

  if (expirationTime - startTime - duration <= 0) {
    return null;
  }

  return (
    <UI.View style={s(`aic jcc`)}>
      <UI.Text style={s(`P7 medium c:#ffffff50`)}>Осталось</UI.Text>
      <UI.HSpacer size={4} />
      <UI.Text style={s(`P1 medium c:white`)}>{formattedDiffTime}</UI.Text>
      <UI.HSpacer size={4} />
      <UI.View style={s(`w:160 h:10 bgc:#ffffff10 ofh`)}>
        <Animated.View style={style} />
      </UI.View>
      <UI.HSpacer size={20} />
      <UI.Pressable
        onPress={handlePressAdd30s}
        style={s(`bgc:#ffffff10 br:6 pv:8 ph:12`)}>
        <UI.Text style={s(`P5 medium c:#ffffff80`)}>+30c</UI.Text>
      </UI.Pressable>
    </UI.View>
  );
};
