import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {
  trainingEventOptions,
  trainingsEventsStackOptions,
} from './navigationOptions';
import {BottomTabTrainingsEventsPaths} from 'src/Navigation/Paths';
import {TrainingsEventsList} from './List';
import {TrainingEvent} from './TrainingEvent';

const Stack = createStackNavigator();
export type TrainingsEventsStackParamList = {
  [BottomTabTrainingsEventsPaths.TrainingEvent]: {
    id?: string;
  };
  [BottomTabTrainingsEventsPaths.List]: undefined;
};
export const TrainingsEventsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={trainingsEventsStackOptions}
      initialRouteName={BottomTabTrainingsEventsPaths.List}>
      <Stack.Screen
        name={BottomTabTrainingsEventsPaths.List}
        component={TrainingsEventsList}
      />

      <Stack.Screen
        name={BottomTabTrainingsEventsPaths.TrainingEvent}
        component={TrainingEvent}
        options={trainingEventOptions}
      />
    </Stack.Navigator>
  );
};
