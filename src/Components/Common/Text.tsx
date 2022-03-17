import React from 'react';
import * as RN from 'react-native';

import s from '@borjomeeee/rn-styles';

export const Text: React.FC<React.ComponentProps<typeof RN.Text>> = ({
  style,
  ...props
}) => {
  return <RN.Text style={[s(`text P7`), style]} {...props} />;
};
