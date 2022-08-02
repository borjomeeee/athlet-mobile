import {NavigatorScreenParams} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabsParamList} from './BottomTabs/Types';
import {AppPaths, ModalsPaths} from './Paths';

export type AppStackParamList = {
  [AppPaths.Init]: undefined;
  [AppPaths.BottomTab]: NavigatorScreenParams<BottomTabsParamList>;

  [ModalsPaths.Playground]: {trainingId?: string} | undefined;
};

export type InitScreenNavigationProps = StackScreenProps<
  AppStackParamList,
  AppPaths.Init
>;

export type PlaygroundScreenNavigationProps = StackScreenProps<
  AppStackParamList,
  ModalsPaths.Playground
>;
