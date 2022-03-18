import React from 'react';
import * as RN from 'react-native';

import s from '@borjomeeee/rn-styles';

export interface InputProps extends React.ComponentProps<typeof RN.TextInput> {
  inputRef?: React.MutableRefObject<RN.TextInput>;
}
export const Input: React.FC<InputProps> = ({
  inputRef,

  style,
  ...props
}) => {
  const inputStyle = React.useMemo(() => [s(`text P7`), style], [style]);
  return <RN.TextInput ref={inputRef} style={inputStyle} {...props} />;
};

export interface InputWithVariantProps
  extends React.ComponentProps<typeof Input> {
  Variant?: React.FC<React.ComponentProps<typeof Input>>;
}

export const InputWithVariant: React.FC<InputWithVariantProps> = ({
  Variant = Input,
  ...props
}) => {
  return <Variant {...props} />;
};

export const EmailVariant: React.FC<InputWithVariantProps> = props => (
  <InputWithVariant
    keyboardType="email-address"
    textContentType="emailAddress"
    autoCapitalize="none"
    {...props}
  />
);

export const PasswordVariant: React.FC<InputWithVariantProps> = props => {
  return <InputWithVariant textContentType="password" {...props} />;
};
