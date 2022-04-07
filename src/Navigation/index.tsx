import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Auth} from './Auth';
import {BottomTabs} from './BottomTabs';
import {Init} from './Init';

import {AppPaths} from './Paths';
import {appNavigationOptions} from './navigationOptions';

const AppStack = createNativeStackNavigator();
export const Navigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={appNavigationOptions}
      initialRouteName={AppPaths.Init}>
      <AppStack.Screen name={AppPaths.Init} component={Init} />
      <AppStack.Screen name={AppPaths.Auth} component={Auth} />
      <AppStack.Screen name={AppPaths.BottomTab} component={BottomTabs} />
    </AppStack.Navigator>
  );
};
