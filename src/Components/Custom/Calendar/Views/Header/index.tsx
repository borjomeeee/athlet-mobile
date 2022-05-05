import s from '@borjomeeee/rn-styles';
import {useLayout} from '@react-native-community/hooks';
import dayjs from 'dayjs';
import React from 'react';
import Animated, {
  Extrapolate,
  useAnimatedStyle,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import {useRecoilValue} from 'recoil';
import {Text, View} from 'src/Components/Common';
import {Pressable} from 'src/Components/Pressable';
import {useCalendarAnimated} from '../../Controller';
import {showedDateStore} from '../../Store';
import {useHeaderController} from './Controller';

interface HeaderProps {
  id: string;
  date: Date;
}

interface HeaderLabelProps {
  date: Date;
}
export const HeaderLabel: React.FC<HeaderLabelProps> = ({date}) => {
  const currentMonth = dayjs(date).month();
  const currentYear = date.getFullYear();

  return (
    <Text style={s(`medium`)}>
      {monthNames[currentMonth]}, {currentYear}
    </Text>
  );
};

export const Header: React.FC<HeaderProps> = ({id, date}) => {
  const {handlePressNext, handlePressPrev} = useHeaderController(id);

  const {translateX} = useCalendarAnimated();

  const {onLayout: onCurrentLayout, ...currentLayout} = useLayout();
  const {onLayout: onPrevLayout, ...prevLayout} = useLayout();
  const {onLayout: onNextLayout, ...nextLayout} = useLayout();

  const isOnlyMounted = useSharedValue(true);

  const prevDate = dayjs(date).add(-1, 'month').toDate();
  const currDate = date;
  const nextDate = dayjs(date).add(1, 'month').toDate();

  const prevOpacity = useAnimatedStyle(() => ({
    opacity: isOnlyMounted.value
      ? 0
      : interpolate(translateX.value, [1, 0], [1, 0], Extrapolate.CLAMP),
  }));

  const nextOpacity = useAnimatedStyle(() => ({
    opacity: isOnlyMounted.value
      ? 0
      : interpolate(translateX.value, [-1, 0], [1, 0], Extrapolate.CLAMP),
  }));

  const currentOpacity = useAnimatedStyle(() => ({
    opacity: isOnlyMounted.value
      ? 1
      : interpolate(translateX.value, [-1, 0, 1], [0, 1, 0], Extrapolate.CLAMP),
  }));

  const prevStyles = React.useMemo(
    () => [
      prevOpacity,
      s(`abs t:0 l:0`),
      {transform: [{translateX: -prevLayout.width - 15}]},
    ],
    [prevOpacity, prevLayout],
  );

  const nextStyles = React.useMemo(
    () => [
      nextOpacity,
      s(`abs t:0 l:0`),
      {transform: [{translateX: nextLayout.width + 15}]},
    ],
    [nextLayout, nextOpacity],
  );

  const containerStyles = useAnimatedStyle(() => {
    const prevDiff = -(prevLayout.width - currentLayout.width) / 2;
    const nextDiff = (nextLayout.width - currentLayout.width) / 2;

    return {
      zIndex: -1000,
      transform: [
        {
          translateX: isOnlyMounted.value
            ? 0
            : interpolate(
                translateX.value,
                [-1, 0, 1],
                [
                  -(nextLayout.width + nextDiff + 15),
                  0,
                  prevLayout.width + prevDiff + 15,
                ],
                Extrapolate.CLAMP,
              ),
        },
      ],
    };
  });

  React.useEffect(() => {
    isOnlyMounted.value = false;
  }, [isOnlyMounted]);

  return (
    <View style={s(`jcsb row container`)}>
      <Pressable onPress={handlePressPrev}>
        <View style={s(`w:22 h:22 br:4 bw:1 bc:#E1E4E8`)} />
      </Pressable>
      <Animated.View style={containerStyles}>
        <View style={s(`rel row`)}>
          <Animated.View style={prevStyles} onLayout={onPrevLayout}>
            <HeaderLabel date={prevDate} />
          </Animated.View>
          <Animated.View onLayout={onCurrentLayout} style={currentOpacity}>
            <HeaderLabel date={currDate} />
          </Animated.View>
          <Animated.View style={nextStyles} onLayout={onNextLayout}>
            <HeaderLabel date={nextDate} />
          </Animated.View>
        </View>
      </Animated.View>
      <Pressable onPress={handlePressNext}>
        <View style={s(`w:22 h:22 br:4 bw:1 bc:#E1E4E8`)} />
      </Pressable>
    </View>
  );
};

interface HeaderContainerProps {
  id: string;
}
export const HeaderContainer: React.FC<HeaderContainerProps> = ({id}) => {
  const showedDate = useRecoilValue(showedDateStore(id));
  return <Header key={showedDate.toISOString()} date={showedDate} id={id} />;
};

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
