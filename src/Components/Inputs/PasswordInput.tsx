import React from 'react';

import {
  DefaultInputWithLabel,
  DefaultInputWithLabelProps,
  PasswordVariant,
  Pressable,
} from 'src/Components';

import PasswordShowIcon from 'src/Assets/Svg/PasswordShowIcon';

export const PasswordInput: React.FC<
  Omit<DefaultInputWithLabelProps, 'rightChild'>
> = props => {
  const [secure, setSecure] = React.useState(true);

  const toggleIsShowed = React.useCallback(
    () => setSecure(state => !state),
    [],
  );

  const RightChild = React.useMemo(
    () => (
      <Pressable onPress={toggleIsShowed}>
        <PasswordShowIcon showed={!secure} />
      </Pressable>
    ),
    [toggleIsShowed, secure],
  );

  return (
    <DefaultInputWithLabel
      Variant={PasswordVariant}
      rightChild={RightChild}
      secureTextEntry={secure}
      {...props}
    />
  );
};
