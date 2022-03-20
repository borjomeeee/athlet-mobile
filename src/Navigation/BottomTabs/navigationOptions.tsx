import s from '@borjomeeee/rn-styles';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

export const tabNavigationOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,

  tabBarStyle: s(`bgc:white btlr:15 btrr:15 btw:0 shadow`),
  tabBarInactiveTintColor: '#000',
  tabBarHideOnKeyboard: true,
};
