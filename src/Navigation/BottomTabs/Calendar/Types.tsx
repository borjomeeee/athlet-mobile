import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabCalendarPaths} from 'src/Navigation/Paths';
import {BottomTabsCalendarNavigationProps} from '../Types';

export type CalenadarStackParamList = {
  [BottomTabCalendarPaths.Default]: undefined;
};

export type CalendarScreenNavigationProps = CompositeScreenProps<
  StackScreenProps<CalenadarStackParamList, BottomTabCalendarPaths.Default>,
  BottomTabsCalendarNavigationProps
>;
