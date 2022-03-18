import React from 'react';

import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {useSignInController} from '../Hooks';

export const Header = () => {
  const {handlePressGoToSignUp} = useSignInController();
  return (
    <UI.View style={s(`asfe`)}>
      <UI.AuthStepButton label="Регистрация" onPress={handlePressGoToSignUp} />
    </UI.View>
  );
};
