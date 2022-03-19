import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TrainingsStack} from './Trainings';
import {NavPaths} from '../Paths';

import {tabNavigationOptions} from './navigationOptions';

const Tab = createBottomTabNavigator();
export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={tabNavigationOptions}
      initialRouteName={NavPaths.BottomTab.Trainings.Self}>
      <Tab.Screen
        name={NavPaths.BottomTab.Trainings.Self}
        component={TrainingsStack}
      />
    </Tab.Navigator>
  );
};
