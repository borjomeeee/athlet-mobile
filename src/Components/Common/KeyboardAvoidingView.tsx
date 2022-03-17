import React from 'react';
import * as RN from 'react-native';

export const KeyboardAvoidingView: React.FC<
  React.ComponentProps<typeof RN.KeyboardAvoidingView>
> = props => {
  return (
    <RN.KeyboardAvoidingView
      behavior={RN.Platform.OS === 'ios' ? 'padding' : 'height'}
      {...props}
    />
  );
};
