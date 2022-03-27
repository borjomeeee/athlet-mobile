import React from 'react';
import * as RN from 'react-native';

import s from '@borjomeeee/rn-styles';
import {View} from './View';

export const Text: React.FC<React.ComponentProps<typeof RN.Text>> = ({
  style,
  ...props
}) => {
  const textStyle = React.useMemo(() => [s(`text P7`), style], [style]);
  return <RN.Text style={textStyle} {...props} />;
};

export const MultilineText: React.FC<React.ComponentProps<typeof Text>> = ({
  children,
  ...props
}) => {
  if (Array.isArray(children)) {
    return (
      <>
        {children.map(child => (
          <View key={child}>
            <Text {...props}>{child}</Text>
          </View>
        ))}
      </>
    );
  }

  return <Text {...{children, ...props}} />;
};
