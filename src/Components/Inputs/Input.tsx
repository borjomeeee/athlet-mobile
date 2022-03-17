import React from 'react';
import * as RN from 'react-native';

import s from '@borjomeeee/rn-styles';
import {Colors} from 'src/Utils/Styles';
import {Pressable} from '../Pressable';
import {HSpacer, Text, View, VSpacer} from '../Common';

export const Input: React.FC<React.ComponentProps<typeof RN.TextInput>> = ({
  style,
  ...props
}) => {
  const inputStyle = React.useMemo(() => [s(`text P7`), style], [style]);
  return <RN.TextInput style={inputStyle} {...props} />;
};

interface InputWithVariantProps extends React.ComponentProps<typeof Input> {
  Variant?: React.FC<React.ComponentProps<typeof Input>>;
}

export const InputWithVariant: React.FC<InputWithVariantProps> = ({
  Variant = Input,
  ...props
}) => {
  return <Variant {...props} />;
};

export const EmailVariant: React.FC<InputWithVariantProps> = props => (
  <InputWithVariant
    keyboardType="email-address"
    textContentType="emailAddress"
    autoCapitalize="none"
    {...props}
  />
);

export const PasswordVariant: React.FC<InputWithVariantProps> = props => {
  return <InputWithVariant textContentType="password" {...props} />;
};

interface DefaultInputProps extends InputWithVariantProps {
  rightChild?: React.FC;
  leftChild?: React.FC;
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
          <LeftChild />
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
          <RightChild />
        </>
      )}
    </View>
  );
};

interface DefaultInputWithLabelProps extends DefaultInputProps {
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

export const EmailInput: React.FC<DefaultInputWithLabelProps> = props => {
  return <DefaultInputWithLabel Variant={EmailVariant} {...props} />;
};

export const PasswordInput: React.FC<
  Omit<DefaultInputWithLabelProps, 'rightChild'>
> = props => {
  const [secure, setSecure] = React.useState(true);

  const toggleIsShowed = React.useCallback(
    () => setSecure(state => !state),
    [],
  );

  return (
    <DefaultInputWithLabel
      Variant={PasswordVariant}
      rightChild={() => (
        <Pressable onPress={toggleIsShowed}>
          <Text>Hello</Text>
        </Pressable>
      )}
      secureTextEntry={secure}
      {...props}
    />
  );
};
