import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabPaths} from '../Paths';
import {AppStackParamList} from '../Types';
import {AccountStackParamList} from './Account';
import {TrainingsStackParamList} from './Trainings/Types';

export type BottomTabsParamList = {
  [BottomTabPaths.Trainings]: NavigatorScreenParams<TrainingsStackParamList>;
  [BottomTabPaths.Account]: NavigatorScreenParams<AccountStackParamList>;
};

export type BottomTabsTrainingsNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, BottomTabPaths.Trainings>,
  StackScreenProps<AppStackParamList>
>;

export type BottomTabsAccountNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, BottomTabPaths.Account>,
  StackScreenProps<AppStackParamList>
>;
