import React from 'react';

import s from '@borjomeeee/rn-styles';
import {
  View,
  InputWithVariant,
  VSpacer,
  Input,
  InputWithVariantProps,
  Text,
  HSpacer,
} from 'src/Components';
import {Colors} from 'src/Utils/Styles';

export interface DefaultInputProps extends InputWithVariantProps {
  rightChild?: React.ReactNode;
  leftChild?: React.ReactNode;
}
export const DefaultInput: React.FC<DefaultInputProps> = ({
  rightChild: RightChild,
  leftChild: LeftChild,

  style,
  ...props
}) => {
  const inputStyle = React.useMemo(() => [s(`fill p:0`), style], [style]);
  return (
    <View style={s(`h:46 br:4 bw:1 bc:lightGray ph:12 mb:7`, `row aic`)}>
      {LeftChild && (
        <>
          {LeftChild}
          <VSpacer size={10} />
        </>
      )}
      <InputWithVariant
        Variant={Input}
        style={inputStyle}
        placeholderTextColor={Colors.lightGray}
        {...props}
      />
      {RightChild && (
        <>
          <VSpacer size={10} />
          {RightChild}
        </>
      )}
    </View>
  );
};

export interface DefaultInputWithLabelProps extends DefaultInputProps {
  label: string;
}
export const DefaultInputWithLabel: React.FC<DefaultInputWithLabelProps> = ({
  label,
  ...props
}) => {
  return (
    <View>
      <Text style={s(`c:darkGray`)}>{label}</Text>
      <HSpacer size={7} />
      <DefaultInput Variant={Input} {...props} />
    </View>
  );
};
