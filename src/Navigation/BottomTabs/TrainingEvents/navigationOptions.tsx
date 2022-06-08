import React from 'react';
import * as UI from 'src/Components';
import {StackNavigationOptions} from '@react-navigation/stack';

export const trainingsEventsStackOptions: StackNavigationOptions = {
  headerShown: false,
};

export const trainingEventOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitle: '',

  header: props => <UI.Header {...props} />,
};
