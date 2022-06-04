import s from '@borjomeeee/rn-styles';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import * as UI from 'src/Components';

interface ExpirationTimeProps {
  expirationDate: number;
  onExpire?: () => void;
}
export const ExpirationTime: React.FC<ExpirationTimeProps> = ({
  expirationDate: providedExpirationDate,
  onExpire,
}) => {
  const [expirationDate, setExpirationDate] = React.useState(
    providedExpirationDate,
  );

  const intervalId = React.useRef<NodeJS.Timer | null>(null);

  const [startTime] = React.useState(Date.now());
  const [diffTime, setDiffTime] = React.useState(expirationDate - Date.now());

  React.useEffect(() => {
    setDiffTime(expirationDate - Date.now());
    intervalId.current = setInterval(() => {
      setDiffTime(expirationDate - Date.now());
    }, 1000);
    return () => {
      intervalId.current && clearInterval(intervalId.current);
    };
  }, [expirationDate]);

  React.useEffect(() => {
    if (diffTime <= 0) {
      intervalId.current && clearInterval(intervalId.current);
      onExpire?.();
    }
  }, [diffTime, onExpire]);

  const formattedDiffTime = React.useMemo(() => {
    const diffInSecs = Math.floor(diffTime / 1000);

    const mins = Math.floor(diffInSecs / 60);
    const secs = Math.floor(diffInSecs % 60);

    const minsStr = mins >= 10 ? mins.toString() : `0${mins}`;
    const secsStr = secs >= 10 ? secs.toString() : `0${secs}`;

    return `${minsStr}:${secsStr}`;
  }, [diffTime]);

  const handlePressAdd30s = React.useCallback(() => {
    setExpirationDate(i => i + 30 * 1000);
  }, []);

  const animatedDiffTime = useDerivedValue(() => diffTime);
  const animatedProgress = useDerivedValue(() =>
    interpolate(
      animatedDiffTime.value,
      [expirationDate - startTime, 0],
      [0, 160],
    ),
  );

  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: withTiming(animatedProgress.value, {duration: 1000}),
    };
  }, []);
  const style = React.useMemo(
    () => [s(`abs t:0 l:0 b:0 r:0 bgc:green`), animatedWidth],
    [animatedWidth],
  );

  if (diffTime <= 0) {
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
