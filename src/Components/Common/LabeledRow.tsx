import s from '@borjomeeee/rn-styles';
import React from 'react';
import {Pressable} from '../Pressable';
import {Text} from './Text';
import {View} from './View';

import ArrowNext from 'src/Assets/Svg/ArrowNext';
import {Colors} from 'src/Utils/Styles';

interface LabeledRowProps {
  label: string;
  first?: boolean;
}
export const LabeledRow: React.FC<LabeledRowProps> = ({
  label,
  first,
  children,
}) => {
  return (
    <View
      style={s(
        `h:36 bw:1 btw:0 bc:#E1E4E8 bgc:white`,
        `row jcsb aic container`,
        first && `btw:1`,
      )}>
      <Text>{label}</Text>
      <View>{children}</View>
    </View>
  );
};

interface PressableLabelRow extends React.ComponentProps<typeof Pressable> {
  label: string;
  first?: boolean;
}
export const PressableLabelRow: React.FC<PressableLabelRow> = ({
  label,
  first,
  children: _,
  ...props
}) => {
  return (
    <Pressable {...props}>
      <LabeledRow label={label} first={first}>
        <ArrowNext fill={Colors.black} />
      </LabeledRow>
    </Pressable>
  );
};
