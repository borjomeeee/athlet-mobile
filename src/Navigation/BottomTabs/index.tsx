import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TrainingsStack} from './Trainings';
import {BottomTabPaths} from '../Paths';

import {tabNavigationOptions} from './navigationOptions';
import {Calendar} from './Calendar';

const Tab = createBottomTabNavigator();
export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={tabNavigationOptions}
      initialRouteName={BottomTabPaths.Calendar}>
      <Tab.Screen name={BottomTabPaths.Trainings} component={TrainingsStack} />
      <Tab.Screen name={BottomTabPaths.Calendar} component={Calendar} />
    </Tab.Navigator>
  );
};
