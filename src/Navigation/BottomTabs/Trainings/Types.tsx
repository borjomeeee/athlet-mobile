import {CompositeScreenProps} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabTrainingsPaths} from 'src/Navigation/Paths';
import {BottomTabsTrainingsNavigationProps} from '../Types';

export type TrainingsStackParamList = {
  [BottomTabTrainingsPaths.List]: undefined;
  [BottomTabTrainingsPaths.Constructor]:
    | {
        trainingId?: string;
      }
    | undefined;
};

export type TrainingsListScreenNavigationProps = CompositeScreenProps<
  StackScreenProps<TrainingsStackParamList, BottomTabTrainingsPaths.List>,
  BottomTabsTrainingsNavigationProps
>;

export type ConstructorScreenNavigationProps = CompositeScreenProps<
  StackScreenProps<
    TrainingsStackParamList,
    BottomTabTrainingsPaths.Constructor
  >,
  BottomTabsTrainingsNavigationProps
>;
