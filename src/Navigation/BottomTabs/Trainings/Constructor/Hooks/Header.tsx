import React from 'react';

import {useNavigation} from '@react-navigation/core';
import {BackButton} from '../Views/BackButton';
import {HeaderOptions} from '../Views/HeaderOptions';

export const useTrainingConstructorHeader = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',

      headerLeft: () => <BackButton />,
      headerRight: () => <HeaderOptions />,
    });
  }, [navigation]);
};
