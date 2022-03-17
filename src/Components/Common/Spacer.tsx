import React from 'react';
import * as RN from 'react-native';

import s from '@borjomeeee/rn-styles';

interface SpacerProps {
  size: number;
  direction: 'horizontal' | 'vertical';
}
export const Spacer: React.FC<SpacerProps> = ({size, direction}) => {
  return (
    <RN.View
      style={s(
        direction === 'horizontal' && `h:${size} w:0`,
        direction === 'vertical' && `w:${size} h:0`,
      )}
    />
  );
};

export const HSpacer: React.FC<Omit<SpacerProps, 'direction'>> = props => (
  <Spacer direction="horizontal" {...props} />
);

export const VSpacer: React.FC<Omit<SpacerProps, 'direction'>> = props => (
  <Spacer direction="vertical" {...props} />
);
