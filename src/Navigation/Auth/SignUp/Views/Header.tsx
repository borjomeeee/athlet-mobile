import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';
import {useSignUpController} from '../Hooks';

export const Header = () => {
  const {handlePressGoToSignIn} = useSignUpController();
  return (
    <UI.View style={s(`asfe`)}>
      <UI.AuthStepButton label="Вход" onPress={handlePressGoToSignIn} />
    </UI.View>
  );
};
