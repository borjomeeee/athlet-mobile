import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {TrainingsStack} from './Trainings';
import {BottomTabPaths} from '../Paths';

import {tabNavigationOptions} from './navigationOptions';
import {BottomTabs} from 'src/Components';

const Tab = createBottomTabNavigator();
export const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={tabNavigationOptions}
      initialRouteName={BottomTabPaths.Trainings}
      tabBar={tabBar}>
      <Tab.Screen name={BottomTabPaths.Trainings} component={TrainingsStack} />
    </Tab.Navigator>
  );
};

function tabBar(props: BottomTabBarProps) {
  return <BottomTabs {...props} />;
}
