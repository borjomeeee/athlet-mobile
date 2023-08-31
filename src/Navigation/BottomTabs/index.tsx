import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {TrainingsStack} from './Trainings';
import {AccountStack} from './Account';

import {BottomTabPaths} from '../Paths';

import {tabNavigationOptions} from './navigationOptions';
import {BottomTabs} from 'src/Components';
import {BottomTabsParamList} from './Types';
import {CalendarStack} from './Calendar';

const Tab = createBottomTabNavigator<BottomTabsParamList>();
export const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={tabNavigationOptions}
      initialRouteName={BottomTabPaths.Calendar}
      tabBar={tabBar}>
      <Tab.Screen name={BottomTabPaths.Calendar} component={CalendarStack} />
      <Tab.Screen name={BottomTabPaths.Trainings} component={TrainingsStack} />
      <Tab.Screen name={BottomTabPaths.Account} component={AccountStack} />
    </Tab.Navigator>
  );
};

function tabBar(props: BottomTabBarProps) {
  return <BottomTabs {...props} />;
}
