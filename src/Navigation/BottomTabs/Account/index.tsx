import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {
  trainingEventOptions,
  trainingsEventsStackOptions,
} from './navigationOptions';
import {BottomTabAccountPaths} from 'src/Navigation/Paths';
import {Account} from './Default';
import {TrainingEvent} from './TrainingEvent';

const Stack = createStackNavigator();
export type AccountStackParamList = {
  [BottomTabAccountPaths.TrainingEvent]: {
    id?: string;
  };
  [BottomTabAccountPaths.Default]: undefined;
};
export const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={trainingsEventsStackOptions}
      initialRouteName={BottomTabAccountPaths.Default}>
      <Stack.Screen name={BottomTabAccountPaths.Default} component={Account} />

      <Stack.Screen
        name={BottomTabAccountPaths.TrainingEvent}
        component={TrainingEvent}
        options={trainingEventOptions}
      />
    </Stack.Navigator>
  );
};
