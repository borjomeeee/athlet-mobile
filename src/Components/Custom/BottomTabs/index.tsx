import s from '@borjomeeee/rn-styles';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HSpacer, ShadowView, Text, View} from 'src/Components/Common';
import {Pressable} from 'src/Components/Pressable';
import {Colors} from 'src/Utils/Styles';

import TabBarHome from 'src/Assets/Svg/TabBarHome';
import TabBarAccount from 'src/Assets/Svg/TabBarAccount';
import TabBarFitness from 'src/Assets/Svg/TabBarFitness';

export const BottomTabs = (props: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <ShadowView dx={0} dy={4} blur={12} color={Colors.black + '05'}>
      <View style={s(`btrr:15 btlr:15 bgc:${Colors.white}`)}>
        <View style={s(`container pv:15 row jcsa`)}>
          <Pressable>
            <TabBarHome
              fill={
                props.state.index === 0
                  ? Colors.tabBarActive
                  : Colors.tabBarInactive
              }
            />
          </Pressable>

          <Pressable>
            <TabBarFitness
              fill={
                props.state.index === 1
                  ? Colors.tabBarActive
                  : Colors.tabBarInactive
              }
            />
          </Pressable>

          <Pressable>
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
