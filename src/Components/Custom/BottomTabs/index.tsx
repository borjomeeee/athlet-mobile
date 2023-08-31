import s from '@borjomeeee/rn-styles';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HSpacer, ShadowView, Text, View} from 'src/Components/Common';
import {Pressable} from 'src/Components/Pressable';
import {Colors} from 'src/Utils/Styles';

import TabBarCalendar from 'src/Assets/Svg/Calendar';
import TabBarAccount from 'src/Assets/Svg/TabBarAccount';
import TabBarFitness from 'src/Assets/Svg/TabBarFitness';
import {BottomTabPaths} from 'src/Navigation/Paths';

export const BottomTabs = (props: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();
  const navigation = props.navigation;

  const handlePressAccount = React.useCallback(() => {
    navigation.navigate(BottomTabPaths.Account);
  }, [navigation]);

  const handlePressFitness = React.useCallback(() => {
    navigation.navigate(BottomTabPaths.Trainings);
  }, [navigation]);

  const handlePressCalendar = React.useCallback(() => {
    navigation.navigate(BottomTabPaths.Calendar);
  }, [navigation]);

  return (
    <ShadowView dx={0} dy={4} blur={12} color={Colors.black + '05'}>
      <View style={s(`btrr:15 btlr:15 bgc:${Colors.white}`)}>
        <View style={s(`container pv:15 row jcsa`)}>
          <Pressable onPress={handlePressCalendar}>
            <TabBarCalendar
              fill={
                props.state.index === 0
                  ? Colors.tabBarActive
                  : Colors.tabBarInactive
              }
            />
          </Pressable>

          <Pressable onPress={handlePressFitness}>
            <TabBarFitness
              fill={
                props.state.index === 1
                  ? Colors.tabBarActive
                  : Colors.tabBarInactive
              }
            />
          </Pressable>

          <Pressable onPress={handlePressAccount}>
            <TabBarAccount
              fill={
                props.state.index === 2
                  ? Colors.tabBarActive
                  : Colors.tabBarInactive
              }
            />
          </Pressable>
        </View>
        <HSpacer size={bottom} />
      </View>
    </ShadowView>
  );
};
