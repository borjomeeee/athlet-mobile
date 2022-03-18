import React from 'react';

import s from '@borjomeeee/rn-styles';
import AuthHeaderIcon from 'src/Assets/Svg/AuthHeaderIcon';
import {Pressable, VSpacer, Text} from 'src/Components';
import {Colors} from 'src/Utils/Styles';

interface AuthStepButtonProps {
  label: string;
  onPress: () => void;
}
export const AuthStepButton: React.FC<AuthStepButtonProps> = ({
  onPress,
  label,
}) => {
  return (
    <Pressable style={s(`row aic`)} onPress={onPress}>
      <AuthHeaderIcon fill={Colors.lightGray} />
      <VSpacer size={30} />
      <Text style={s(`uppercase P4 bold c:lightGray`)}>{label}</Text>
    </Pressable>
  );
};
