import s from '@borjomeeee/rn-styles';
import React from 'react';
import Animated, {Layout, useSharedValue} from 'react-native-reanimated';
import {HSpacer, ShadowView} from 'src/Components/Common';

import {Colors} from 'src/Utils/Styles';
import {CalendarAnimatedContext} from './Controller';
import {DayNames} from './Views/DayNames';
import {DaysGridContainer} from './Views/DaysGrid';
import {HeaderContainer} from './Views/Header';

interface CalendarProps {
  id: string;
}
export const Calendar: React.FC<CalendarProps> = ({id}) => {
  const isAnimating = useSharedValue(false);
  const translateX = useSharedValue(0);

  const contextValue = React.useMemo(
    () => ({translateX, isAnimating}),
    [translateX, isAnimating],
  );

  return (
    <CalendarAnimatedContext.Provider value={contextValue}>
      <ShadowView dx={0} dy={0} blur={10} color={Colors.lightGray}>
        <Animated.View style={s(`br:20 bgc:white pt:15 pb:20 ofh`)}>
          <HeaderContainer id={id} />
          <HSpacer size={10} />
          <DayNames />
          <HSpacer size={5} />
          <DaysGridContainer id={id} />
        </Animated.View>
      </ShadowView>
    </CalendarAnimatedContext.Provider>
  );
};
