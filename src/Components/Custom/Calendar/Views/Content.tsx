import s from '@borjomeeee/rn-styles';
import React from 'react';
import Animated from 'react-native-reanimated';
import {HSpacer, ShadowView} from 'src/Components/Common';
import {Colors} from 'src/Utils/Styles';
import {useCalendarStateAnimationsSync} from '../Hooks';
import {DayNames} from './DayNames';
import {DaysGridContainer} from './DaysGrid';
import {HeaderContainer} from './Header';

interface ContentProps {
  id: string;
}
export const Content: React.FC<ContentProps> = React.memo(({id}) => {
  useCalendarStateAnimationsSync(id);

  return (
    <ShadowView dx={0} dy={0} blur={10} color={Colors.lightGray}>
      <Animated.View style={s(`br:20 bgc:white pt:15 pb:20 ofh`)}>
        <HeaderContainer id={id} />
        <HSpacer size={10} />
        <DayNames />
        <HSpacer size={5} />
        <DaysGridContainer id={id} />
      </Animated.View>
    </ShadowView>
  );
});
