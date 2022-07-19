import React from 'react';
import * as RN from 'react-native';

import s from '@borjomeeee/rn-styles';

export type InputProps = React.ComponentProps<typeof RN.TextInput>;
export const Input = React.forwardRef<RN.TextInput, InputProps>(
  ({style, ...props}, ref) => {
    const inputStyle = React.useMemo(() => [s(`text P7`), style], [style]);
    return <RN.TextInput ref={ref} style={inputStyle} {...props} />;
  },
);

export interface InputWithVariantProps
  extends React.ComponentProps<typeof Input> {
  inputRef?: React.RefObject<RN.TextInput>;
  Variant?: React.FC<React.ComponentProps<typeof Input>>;
}

export const InputWithVariant: React.FC<InputWithVariantProps> = ({
  Variant = Input,
  inputRef,
  ...props
}) => {
  return <Variant ref={inputRef} {...props} />;
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
