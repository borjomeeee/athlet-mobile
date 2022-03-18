import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SignIn} from './SignIn';
import {SignUp} from './SignUp';

import {NavPaths} from '../Paths';

import {authNavigationOptions} from './navigationOptions';

const AuthStack = createNativeStackNavigator();
export const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={authNavigationOptions}
      initialRouteName={NavPaths.Auth.SignIn}>
      <AuthStack.Screen name={NavPaths.Auth.SignIn} component={SignIn} />
      <AuthStack.Screen name={NavPaths.Auth.SignUp} component={SignUp} />
    </AuthStack.Navigator>
  );
};
