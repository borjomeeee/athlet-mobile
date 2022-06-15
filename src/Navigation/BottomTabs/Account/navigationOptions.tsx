import React from 'react';
import * as UI from 'src/Components';
import {StackNavigationOptions} from '@react-navigation/stack';
import s from '@borjomeeee/rn-styles';

export const trainingsEventsStackOptions: StackNavigationOptions = {
  headerShown: false,
};

export const trainingEventOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitle: '',

  header: props => <UI.Header {...props} />,
};

export const settiongsOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitle: '',

  header: props => <UI.Header {...props} containerStyle={s(`bgc:layout`)} />,
};
