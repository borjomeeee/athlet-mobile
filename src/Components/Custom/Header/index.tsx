import React from 'react';
import {StackHeaderProps} from '@react-navigation/stack';
import {getHeaderTitle} from '@react-navigation/elements';

import s from '@borjomeeee/rn-styles';
import {Text, View, VSpacer} from 'src/Components/Common';

import BackArrowIcon from 'src/Assets/Svg/BackArrow';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Pressable} from 'src/Components/Pressable';

export const Header = ({options, route, navigation}: StackHeaderProps) => {
  const {top} = useSafeAreaInsets();
  const title = getHeaderTitle(options, route.name);
  const canGoBack = React.useMemo(() => navigation.canGoBack(), [navigation]);

  return (
    <View style={s(`row container pt:${top} h:${top + 50} aic bgc:white`)}>
      {canGoBack && (
        <Pressable onPress={navigation.goBack}>
          <BackArrowIcon />
        </Pressable>
      )}
      <VSpacer size={20} />
      <View style={s(`fill`)}>
        <Text style={s(`P8 medium tac`)}>{title}</Text>
      </View>
      {canGoBack && <VSpacer size={24} />}
    </View>
  );
};
