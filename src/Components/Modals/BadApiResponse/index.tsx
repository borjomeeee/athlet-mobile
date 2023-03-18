import React from 'react';

import s from '@borjomeeee/rn-styles';
import {HSpacer, MultilineText, Text, View} from '../../Common';

import ErrorIcon from 'src/Assets/Svg/ErrorBig';

import {Button} from '../../Pressable';
import {bottomSheet} from 'src/Lib/ShowablePortal/Variants/BottomSheet';
import {useShowable} from 'src/Lib/ShowablePortal/Hooks/useShowable';

export const BadApiResponse = bottomSheet(
  ({id}) => {
    const {close} = useShowable(id);

    return (
      <View style={s(`container`)}>
        <View style={s(`aic jcc`)}>
          <ErrorIcon />
          <HSpacer size={20} />
          <MultilineText style={s(`P5 medium`)}>
            {['Ошибка выполнения', 'операции']}
          </MultilineText>
          <HSpacer size={30} />
          <Text style={s(`P7 tac maxW:294`)}>
            Пожалуйста, попробуйте повторить попытку позже
          </Text>
          <HSpacer size={20} />
        </View>
        <Button label="Хорошо" style={s(`bgc:red`)} onPress={close} />
      </View>
    );
  },
  {snapPoints: ['CONTENT_HEIGHT'], dynamic: true},
);
