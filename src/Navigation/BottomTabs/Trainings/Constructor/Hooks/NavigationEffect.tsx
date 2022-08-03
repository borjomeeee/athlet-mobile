import React from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';

import {useTrainingConstructorController} from '../Controller';
import {useTrainingConstructorChangesController} from './Changes';
import {ConstructorScreenNavigationProps} from '../../Types';

export const useTrainingConstructorNavigationEffect = () => {
  const navigation =
    useNavigation<ConstructorScreenNavigationProps['navigation']>();
  const route = useRoute<ConstructorScreenNavigationProps['route']>();

  const {initWithTrainingId} = useTrainingConstructorController();
  const {requestResetChanges, hasTrainingChanged} =
    useTrainingConstructorChangesController();

  React.useEffect(() => {
    if (route.params?.trainingId) {
      initWithTrainingId(route.params?.trainingId);
    }
  }, [route, initWithTrainingId]);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', async e => {
        const isChanged = hasTrainingChanged();
        if (!isChanged) {
          return;
        }

        e.preventDefault();

        const isConfirmed = await requestResetChanges();
        if (isConfirmed) {
          navigation.dispatch(e.data.action);
        }
      }),
    [navigation, hasTrainingChanged, requestResetChanges],
  );
};
