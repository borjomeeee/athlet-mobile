import React from 'react';
import * as RN from 'react-native';

import s from '@borjomeeee/rn-styles';

export const Text: React.FC<React.ComponentProps<typeof RN.Text>> = ({
  style,
  ...props
}) => {
  const textStyle = React.useMemo(() => [s(`text P7`), style], [style]);
  return <RN.Text style={textStyle} {...props} />;
};
