import s from '@borjomeeee/rn-styles';
import {useFocusEffect} from '@react-navigation/core';
import React from 'react';

import * as UI from 'src/Components';
import {useTrainingsService} from 'src/Services/Trainings';

export const List = () => {
  const {getMyTrainings} = useTrainingsService();

  useFocusEffect(
    React.useCallback(() => {
      getMyTrainings();
    }, [getMyTrainings]),
  );

  return (
    <UI.View style={s(`fill aic jcc`)}>
      <UI.Text style={s(`P5 bold`)}>List</UI.Text>
    </UI.View>
  );
};
