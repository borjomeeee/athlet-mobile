import React from 'react';
import * as UI from 'src/Components';
import {StackNavigationOptions} from '@react-navigation/stack';

export const trainingsStackOptions: StackNavigationOptions = {
  headerShown: false,
};

export const constructorScreenOptions: StackNavigationOptions = {
  headerShown: true,
  header: props => <UI.Header {...props} />,
};
