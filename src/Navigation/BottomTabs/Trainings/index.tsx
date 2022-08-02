import React from 'react';

import {List} from './List';
import {Constructor} from './Constructor';

import {BottomTabTrainingsPaths} from 'src/Navigation/Paths';
import {
  constructorScreenOptions,
  trainingsStackOptions,
} from './navigationOptions';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

const Stack = createStackNavigator<TrainingsStackParamList>();
export const TrainingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={trainingsStackOptions}
      initialRouteName={BottomTabTrainingsPaths.List}>
      <Stack.Screen name={BottomTabTrainingsPaths.List} component={List} />
      <Stack.Screen
        name={BottomTabTrainingsPaths.Constructor}
        component={Constructor}
        options={constructorScreenOptions}
      />
    </Stack.Navigator>
  );
};

export type TrainingsStackParamList = {
  [BottomTabTrainingsPaths.List]: undefined;
  [BottomTabTrainingsPaths.Constructor]:
    | {
        trainingId?: string;
      }
    | undefined;
};

export type TrainingsListScreenNavigation = StackNavigationProp<
  TrainingsStackParamList,
  BottomTabTrainingsPaths.List
>;

export type ConstructorScreenNavigation = StackNavigationProp<
  TrainingsStackParamList,
  BottomTabTrainingsPaths.Constructor
>;
