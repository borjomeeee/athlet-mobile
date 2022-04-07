import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TrainingsStack} from './Trainings';
import {BottomTabPaths} from '../Paths';

import {tabNavigationOptions} from './navigationOptions';

const Tab = createBottomTabNavigator();
export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={tabNavigationOptions}
      initialRouteName={BottomTabPaths.Trainings}>
      <Tab.Screen name={BottomTabPaths.Trainings} component={TrainingsStack} />
    </Tab.Navigator>
  );
};
