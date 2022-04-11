import React from 'react';
import * as UI from 'src/Components';
import {useBackButtonController} from './Controller';

export const BackButton = () => {
  const {handlePress} = useBackButtonController();
  return <UI.BackButton onPress={handlePress} />;
};
