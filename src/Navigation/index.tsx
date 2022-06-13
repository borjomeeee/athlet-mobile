import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BottomTabsNavigator} from './BottomTabs';
import {Init} from './Init';

import {AppPaths, ModalsPaths} from './Paths';
import {appNavigationOptions, modalsGroupOptions} from './navigationOptions';
import {Playground} from './Playground';

const AppStack = createNativeStackNavigator();
export const Navigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={appNavigationOptions}
      initialRouteName={AppPaths.Init}>
      <AppStack.Screen name={AppPaths.Init} component={Init} />
      {/* <AppStack.Screen name={AppPaths.Auth} component={Auth} /> */}
      <AppStack.Screen
        name={AppPaths.BottomTab}
        component={BottomTabsNavigator}
      />

      {/** Modals */}
      <AppStack.Group screenOptions={modalsGroupOptions}>
        <AppStack.Screen name={ModalsPaths.Playground} component={Playground} />
      </AppStack.Group>
    </AppStack.Navigator>
  );
};

export type ModalsGroupParamList = {
  [ModalsPaths.Playground]: {
    trainingId?: string;
  };
};
