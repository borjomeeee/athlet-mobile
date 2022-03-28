import React from 'react';

import {List} from './List';
import {Constructor} from './Constructor';

import {NavPaths} from 'src/Navigation/Paths';
import {
  constructorScreenOptions,
  trainingsStackOptions,
} from './navigationOptions';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
export const TrainingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={trainingsStackOptions}
      initialRouteName={NavPaths.BottomTab.Trainings.List}>
      <Stack.Screen name={NavPaths.BottomTab.Trainings.List} component={List} />
      <Stack.Screen
        name={NavPaths.BottomTab.Trainings.Constructor}
        component={Constructor}
        options={constructorScreenOptions}
      />
    </Stack.Navigator>
  );
};
