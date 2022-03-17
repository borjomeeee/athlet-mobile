import React from 'react';
import {Pressable} from './Pressable';

import s from '@borjomeeee/rn-styles';
import {Text} from '../Common';

interface ButtonProps
  extends Omit<React.ComponentProps<typeof Pressable>, 'children'> {
  label: string;
}
export const Button: React.FC<ButtonProps> = ({label, ...props}) => {
  return (
    <Pressable style={s(`h:46 aic jcc bgc:blue br:4`)} {...props}>
      <Text style={s(`fsz:16 bold c:white`)}>{label}</Text>
    </Pressable>
  );
};
