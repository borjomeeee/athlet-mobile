import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabCalendarPaths} from 'src/Navigation/Paths';
import {Calendar} from './Default';
import {navigationOptions} from './navigationOptions';

const Stack = createStackNavigator();
export const CalendarStack = () => {
  return (
    <Stack.Navigator
      screenOptions={navigationOptions}
      initialRouteName={BottomTabCalendarPaths.Default}>
      <Stack.Screen
        name={BottomTabCalendarPaths.Default}
        component={Calendar}
      />
    </Stack.Navigator>
  );
};
