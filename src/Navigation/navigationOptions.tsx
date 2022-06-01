import s from '@borjomeeee/rn-styles';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const appNavigationOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: s(`bgc:layout`),
};

export const modalsGroupOptions: NativeStackNavigationOptions = {
  presentation: 'fullScreenModal',
};
