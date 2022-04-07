import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SignIn} from './SignIn';
import {SignUp} from './SignUp';

import {AuthPaths} from '../Paths';

import {authNavigationOptions} from './navigationOptions';

const AuthStack = createNativeStackNavigator();
export const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={authNavigationOptions}
      initialRouteName={AuthPaths.SignIn}>
      <AuthStack.Screen name={AuthPaths.SignIn} component={SignIn} />
      <AuthStack.Screen name={AuthPaths.SignUp} component={SignUp} />
    </AuthStack.Navigator>
  );
};
