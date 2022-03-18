import * as React from 'react';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {SvgProps, Path, PathProps} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface PasswordShowIconProps extends SvgProps {
  showed: boolean;
}
const SvgComponent = ({showed, ...props}: PasswordShowIconProps) => {
  const ref = React.useRef(null);
  const ref2 = React.useRef(null);

  const [length, setLength] = React.useState(0);
  const [length2, setLength2] = React.useState(0);

  const animatedShowed = useSharedValue(0);
  const animatedProps = useAnimatedProps(
    () =>
      ({
        strokeDashoffset: animatedShowed.value,
      } as PathProps),
  );

  React.useEffect(() => {
    animatedShowed.value = withTiming(+showed * length);
  }, [showed, length, animatedShowed]);

  const handleLayout = React.useCallback(() => {
    setLength((ref.current as any).getTotalLength());
    setLength2((ref2.current as any).getTotalLength());
  }, []);

  return (
    <Svg width={24} height={24} onLayout={handleLayout} fill="none" {...props}>
      <Path
        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5ZM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3Z"
        fill="#DCDCDC"
      />
      <AnimatedPath
        ref={ref}
        animatedProps={animatedProps}
        stroke="#DCDCDC"
        strokeDasharray={length}
        d="M2.13 3.441 19.809 21.12"
        strokeWidth={1.5}
      />
      <AnimatedPath
        animatedProps={animatedProps}
        ref={ref2}
        strokeDasharray={length2}
        d="M3.191 2.38 20.87 20.059"
        stroke="#fff"
        strokeWidth={1.5}
      />
    </Svg>
  );
};

export default SvgComponent;
