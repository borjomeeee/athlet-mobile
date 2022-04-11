import React from 'react';
import * as RN from 'react-native';
import {Pressable} from './Pressable';

import s from '@borjomeeee/rn-styles';
import {Text} from '../Common';

interface ButtonProps
  extends Omit<React.ComponentProps<typeof Pressable>, 'children'> {
  label: string;
  labelStyle?: RN.StyleProp<RN.TextStyle>;
}
export const Button: React.FC<ButtonProps> = ({
  label,
  style,
  labelStyle,
  ...props
}) => {
  const containerStyle = React.useMemo(
    () => [s(`pv:14 aic jcc bgc:blue br:6 container`), style],
    [style],
  );
  const memoLabelStyle = React.useMemo(
    () => [s(`medium c:white`), labelStyle],
    [labelStyle],
  );

  return (
    <Pressable style={containerStyle} {...props}>
      <Text style={memoLabelStyle}>{label}</Text>
    </Pressable>
  );
};

interface GithubButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary';
  mini?: boolean;
}
export const GithubButton: React.FC<GithubButtonProps> = ({
  variant = 'primary',

  style,
  labelStyle,

  mini,

  ...props
}) => {
  const containerStyle = React.useMemo(
    () => [
      s(
        `bgc:green bw:1 bc:darkGreen`,
        mini && `pv:5 ph:12 br:6`,
        variant === 'secondary' && `bgc:#F3F4F6 bc:lightGray`,
      ),
      style,
    ],
    [style, mini, variant],
  );
  const memoLabelStyle = React.useMemo(
    () => [
      s(`c:white`, mini && `P8`, variant === 'secondary' && `c:dark`),
      labelStyle,
    ],
    [labelStyle, mini, variant],
  );

  return (
    <Button style={containerStyle} labelStyle={memoLabelStyle} {...props} />
  );
};
