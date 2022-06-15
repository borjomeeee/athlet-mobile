import React from 'react';
import {StackHeaderProps} from '@react-navigation/stack';
import {getHeaderTitle} from '@react-navigation/elements';

import s from '@borjomeeee/rn-styles';
import {Text, View, VSpacer} from 'src/Components/Common';

import BackArrowIcon from 'src/Assets/Svg/BackArrow';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Pressable} from 'src/Components/Pressable';
import {useNavigation} from '@react-navigation/core';
import {ViewStyle} from 'react-native';

export const BackButton: React.FC<
  React.ComponentProps<typeof Pressable>
> = props => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={navigation.goBack} {...props}>
      <BackArrowIcon />
    </Pressable>
  );
};

interface HeaderProps extends StackHeaderProps {
  containerStyle?: ViewStyle;
}
export const Header = ({
  options,
  route,
  navigation,
  containerStyle,
}: HeaderProps) => {
  const {top} = useSafeAreaInsets();
  const title = getHeaderTitle(options, route.name);
  const canGoBack = React.useMemo(() => navigation.canGoBack(), [navigation]);

  const Right = options.headerRight as React.FC | undefined;
  const Left = options.headerLeft as React.FC | undefined;

  const style = React.useMemo(
    () => [
      s(`row container pt:${top} h:${top + 50} aic bgc:white`),
      containerStyle,
    ],
    [top, containerStyle],
  );

  return (
    <View style={style}>
      {Left ? <Left /> : <BackButton />}
      <VSpacer size={20} />
      <View style={s(`fill`)}>
        <Text style={s(`P8 medium tac`)}>{title}</Text>
      </View>
      {(Left || canGoBack) && Right ? <Right /> : <VSpacer size={24} />}
    </View>
  );
};
