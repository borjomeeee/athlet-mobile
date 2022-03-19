import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {List} from './List';

import {NavPaths} from 'src/Navigation/Paths';
import {trainingsStackOptions} from './navigationOptions';

const Stack = createNativeStackNavigator();
export const TrainingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={trainingsStackOptions}
      initialRouteName={NavPaths.BottomTab.Trainings.List}>
      <Stack.Screen name={NavPaths.BottomTab.Trainings.List} component={List} />
    </Stack.Navigator>
  );
};
