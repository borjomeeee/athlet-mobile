import React from 'react';
import {Pressable} from './Pressable';

import s from '@borjomeeee/rn-styles';
import {Text} from '../Common';

interface ButtonProps
  extends Omit<React.ComponentProps<typeof Pressable>, 'children'> {
  label: string;
}
export const Button: React.FC<ButtonProps> = ({label, style, ...props}) => {
  return (
    <Pressable style={[s(`h:46 aic jcc bgc:blue br:4`), style]} {...props}>
      <Text style={s(`medium c:white`)}>{label}</Text>
    </Pressable>
  );
};
