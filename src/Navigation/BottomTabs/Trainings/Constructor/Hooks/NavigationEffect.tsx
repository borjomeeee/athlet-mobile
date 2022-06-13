import React from 'react';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {TrainingsStackParamList} from '../../index';
import {BottomTabTrainingsPaths} from 'src/Navigation/Paths';
import {useTrainingConstructorController} from './index';
import {useTrainingConstructorChangesController} from './Changes';

type ProfileScreenRouteProp = RouteProp<
  TrainingsStackParamList,
  BottomTabTrainingsPaths.Constructor
>;

export const useTrainingConstructorNavigationEffect = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenRouteProp>();

  const {initWithTrainingId} = useTrainingConstructorController();
  const {requestResetChanges, hasTrainingChanged} =
    useTrainingConstructorChangesController();

  React.useEffect(() => {
    const params = route.params;

    if (params?.trainingId) {
      initWithTrainingId(params?.trainingId);
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
