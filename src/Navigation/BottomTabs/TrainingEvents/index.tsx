import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {trainingsEventsStackOptions} from './navigationOptions';
import {BottomTabTrainingsEventsPaths} from 'src/Navigation/Paths';
import {TrainingsEventsList} from './List';

const Stack = createStackNavigator();
export const TrainingsEventsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={trainingsEventsStackOptions}
      initialRouteName={BottomTabTrainingsEventsPaths.List}>
      <Stack.Screen
        name={BottomTabTrainingsEventsPaths.List}
        component={TrainingsEventsList}
      />
    </Stack.Navigator>
  );
};
