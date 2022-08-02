import {CompositeScreenProps} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabAccountPaths} from 'src/Navigation/Paths';
import {BottomTabsTrainingsNavigationProps} from '../Types';

export type AccountStackParamList = {
  [BottomTabAccountPaths.TrainingEvent]:
    | {
        id?: string;
      }
    | undefined;
  [BottomTabAccountPaths.Default]: undefined;
  [BottomTabAccountPaths.Settings]: undefined;
};

export type TrainingEventScreenNavigationProps = CompositeScreenProps<
  StackScreenProps<AccountStackParamList, BottomTabAccountPaths.TrainingEvent>,
  BottomTabsTrainingsNavigationProps
>;

export type AccountScreenNavigationProps = CompositeScreenProps<
  StackScreenProps<AccountStackParamList, BottomTabAccountPaths.Default>,
  BottomTabsTrainingsNavigationProps
>;

export type SettingsScreenNavigationProps = CompositeScreenProps<
  StackScreenProps<AccountStackParamList, BottomTabAccountPaths.Settings>,
  BottomTabsTrainingsNavigationProps
>;
