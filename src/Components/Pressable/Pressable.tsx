import React from 'react';
import * as RN from 'react-native';

export const Pressable: React.FC<
  React.ComponentProps<typeof RN.TouchableOpacity>
> = props => <RN.TouchableOpacity activeOpacity={0.7} {...props} />;

export const PressableItem: React.FC<
  React.ComponentProps<typeof RN.TouchableHighlight>
> = props => <RN.TouchableHighlight underlayColor="#D0D7DE32" {...props} />;
