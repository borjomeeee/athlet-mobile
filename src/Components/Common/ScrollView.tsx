import React from 'react';
import * as RN from 'react-native';

export const ScrollView: React.FC<
  React.ComponentProps<typeof RN.ScrollView>
> = ({...props}) => {
  return <RN.ScrollView showsVerticalScrollIndicator={false} {...props} />;
};
