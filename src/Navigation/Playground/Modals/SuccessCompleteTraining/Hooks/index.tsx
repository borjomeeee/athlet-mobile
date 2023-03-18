import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useShowableInstance} from 'src/Lib/ShowablePortal/Hooks/useShowableInstance';
import {BottomTabAccountPaths, BottomTabPaths} from 'src/Navigation/Paths';
import {SuccessCompleteTrainingProps} from '../Types';

export const useSuccessCompleteTrainingController = () => {
  const navigation = useNavigation();
  const {close, props} = useShowableInstance<SuccessCompleteTrainingProps>();

  const handlePressShowStatistic = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate(BottomTabPaths.Account, {
      initial: false,
      screen: BottomTabAccountPaths.TrainingEvent,
      params: {id: props.trainingEventId},
    });

    close();
  }, [close, props, navigation]);

  return {handlePressShowStatistic};
};
