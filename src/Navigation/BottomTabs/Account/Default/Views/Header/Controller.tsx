import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {SettingsScreenNavigationProps} from '../../../Types';
import {BottomTabAccountPaths} from 'src/Navigation/Paths';

export const useSettingsHeaderController = () => {
  const navigation =
    useNavigation<SettingsScreenNavigationProps['navigation']>();

  const handlePressSettings = React.useCallback(() => {
    navigation.navigate(BottomTabAccountPaths.Settings);
  }, [navigation]);

  return {handlePressSettings};
};
