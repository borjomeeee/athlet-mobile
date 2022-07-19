import React from 'react';
import * as UI from 'src/Components';
import {StackNavigationOptions} from '@react-navigation/stack';
import s from '@borjomeeee/rn-styles';
import {StyleSheet} from 'react-native';
import {Colors} from 'src/Utils/Styles';

export const trainingsEventsStackOptions: StackNavigationOptions = {
  headerShown: false,
};

export const trainingEventOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitle: '',

  header: props => <UI.Header {...props} />,
};

export const settingsOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitle: '',

  header: props => (
    <UI.Header {...props} containerStyle={style.containerStyle} />
  ),
};

const style = StyleSheet.create({
  containerStyle: {backgroundColor: Colors.layout},
});
