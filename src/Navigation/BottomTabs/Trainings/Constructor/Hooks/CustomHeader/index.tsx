import React from 'react';

import {useNavigation} from '@react-navigation/core';
import {ConstructorScreenNavigationProps} from '../../../Types';

import {BackButton} from './BackButton';
import {HeaderOptions} from './HeaderOptions';

export const useTrainingConstructorCustomHeader = () => {
  const navigation =
    useNavigation<ConstructorScreenNavigationProps['navigation']>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',

      headerLeft: () => <BackButton />,
      headerRight: () => <HeaderOptions />,
    });
  }, [navigation]);
};
