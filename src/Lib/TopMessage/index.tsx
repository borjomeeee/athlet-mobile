import {useLayout} from '@react-native-community/hooks';
import React from 'react';
import * as UI from 'src/Components';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import s from '@borjomeeee/rn-styles';
import {noop} from 'src/Utils/Common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ErrorIcon from 'src/Assets/Svg/TopMessageError';

interface IShowTopMessage {
  type: TopMessageType;
  text: string;
  time: number;
  timeout?: number;
}

const TopMessageContext = React.createContext<{
  topMessage?: IShowTopMessage;
  setTopMessage: (topMessage: IShowTopMessage | undefined) => void;
}>({
  topMessage: undefined,
  setTopMessage: noop,
});

export const useTopMessage = () => {
  const {setTopMessage} = React.useContext(TopMessageContext);

  const show = React.useCallback(
    (topMessage: Omit<IShowTopMessage, 'time'>) => {
      setTopMessage({...topMessage, time: Date.now()});
    },
    [setTopMessage],
  );

  return {show};
};
export const TopMessageProvider: React.FC<unknown> = ({children}) => {
  const [topMessage, setTopMessage] = React.useState<
    IShowTopMessage | undefined
  >(undefined);

  const value = React.useMemo(
    () => ({topMessage, setTopMessage}),
    [topMessage, setTopMessage],
  );

  return (
    <TopMessageContext.Provider value={value}>
      {children}
      {topMessage && (
        <UI.View style={s(`abs t:0 r:0 l:0 ofv`)}>
          <TopMessage
            key={topMessage.time}
            {...{timeout: 5000, ...topMessage}}
          />
        </UI.View>
      )}
    </TopMessageContext.Provider>
  );
};

interface TopMessageProps {
  type: TopMessageType;
  text: string;
  timeout: number;
}
const TopMessage: React.FC<TopMessageProps> = ({text, type, timeout}) => {
  const {onLayout, ...layout} = useLayout();

  const animationValue = useSharedValue(0);

  const {top} = useSafeAreaInsets();
  const {setTopMessage} = React.useContext(TopMessageContext);

  const opacity = useDerivedValue(() => animationValue.value);
  const positionY = useDerivedValue(() =>
    interpolate(animationValue.value, [0, 1], [0, top + 20]),
  );

  React.useEffect(() => {
    if (layout.height) {
      animationValue.value = withTiming(1);
    }
  }, [animationValue, layout.height]);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      animationValue.value = withTiming(0, {}, isFinished => {
        if (isFinished) {
          runOnJS(setTopMessage)(undefined);
        }
      });
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [animationValue, setTopMessage, timeout]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: positionY.value}],
  }));

  const typeStyle = React.useMemo(() => {
    if (type === 'error') {
      return s(`bgc:#FFEBE9 bc:#FF8182`);
    }

    return {};
  }, [type]);

  const icon = React.useMemo(() => {
    if (type === 'error') {
      return <ErrorIcon />;
    }
    return null;
  }, [type]);

  const style = React.useMemo(
    () => [s(`p:16 br:6 bw:1 row aic`), typeStyle, animatedStyle],
    [animatedStyle, typeStyle],
  );

  return (
    <UI.View style={s(`container`)}>
      <Animated.View onLayout={onLayout} style={style}>
        {icon}
        <UI.VSpacer size={10} />
        <UI.View style={s(`fill`)}>
          <UI.Text>{text}</UI.Text>
        </UI.View>
      </Animated.View>
    </UI.View>
  );
};

export type TopMessageType = 'error' | 'info' | 'warning' | 'success';
