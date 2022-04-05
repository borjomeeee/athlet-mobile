import React from 'react';
import * as RN from 'react-native';

interface ScrollViewProps extends React.ComponentProps<typeof RN.ScrollView> {
  scrollViewRef?: React.RefObject<RN.ScrollView>;
}
export const ScrollView: React.FC<ScrollViewProps> = ({
  scrollViewRef,
  ...props
}) => {
  return (
    <RN.ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
};
