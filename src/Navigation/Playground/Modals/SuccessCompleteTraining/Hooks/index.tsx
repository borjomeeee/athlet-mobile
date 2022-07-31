import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useModal, useModalProps} from 'src/Lib/ModalRouter';
import {BottomTabAccountPaths, BottomTabPaths} from 'src/Navigation/Paths';

export const useSuccessCompleteTrainingController = (id: string) => {
  const navigation = useNavigation();

  const {hide} = useModal(id);
  const {props} = useModalProps<{trainingEventId: string}>(id);

  const handlePressShowStatistic = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate(BottomTabPaths.Account, {
      initial: false,
      screen: BottomTabAccountPaths.TrainingEvent,
      params: {id: props.trainingEventId},
    });

    hide();
  }, [hide, props, navigation]);

  return {handlePressShowStatistic};
};
