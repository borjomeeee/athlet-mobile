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

export const MultilineText: React.FC<React.ComponentProps<typeof Text>> =
  React.memo(
    ({children, ...props}) => {
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
    },
    (prevProps, nextProps) => {
      const {children, ...otherPrevProps} = prevProps;
      const {children: nextChildren, ...otherNextProps} = nextProps;

      return (
        Object.keys(prevProps).length === Object.keys(nextProps).length &&
        typeof children === typeof nextChildren &&
        (Array.isArray(children)
          ? children.join('') === (nextChildren as []).join('')
          : false) &&
        Object.entries(otherPrevProps).every(
          ([key, value]) => (otherNextProps as any)[key] === value,
        )
      );
    },
  );
