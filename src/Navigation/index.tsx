import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Auth} from './Auth';
import {BottomTabs} from './BottomTabs';
import {Init} from './Init';

import {NavPaths} from './Paths';
import {appNavigationOptions} from './navigationOptions';

const AppStack = createNativeStackNavigator();
export const Navigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={appNavigationOptions}
      initialRouteName={NavPaths.Init}>
      <AppStack.Screen name={NavPaths.Init} component={Init} />
      <AppStack.Screen name={NavPaths.Auth.Self} component={Auth} />
      <AppStack.Screen name={NavPaths.BottomTab.Self} component={BottomTabs} />
    </AppStack.Navigator>
  );
};
