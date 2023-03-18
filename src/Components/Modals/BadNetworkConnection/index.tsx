import React from 'react';

import s from '@borjomeeee/rn-styles';
import {HSpacer, MultilineText, Text, View} from '../../Common';

import NetworkIcon from 'src/Assets/Svg/NetworkBig';

import {Button} from '../../Pressable';
import {useShowable} from 'src/Lib/ShowablePortal/Hooks/useShowable';
import {bottomSheet} from 'src/Lib/ShowablePortal/Variants/BottomSheet';

export const BadNetworkConnection = bottomSheet(
  ({id}) => {
    const {close} = useShowable(id);

    return (
      <View style={s(`container`)}>
        <View style={s(`aic jcc`)}>
          <NetworkIcon />
          <HSpacer size={20} />
          <MultilineText style={s(`P5 medium`)}>
            {['Плохое интернет', 'соединение']}
          </MultilineText>
          <HSpacer size={30} />
          <Text style={s(`P7 tac maxW:294`)}>
            Пожалуйста, проверьте свое подключение к интернету и попробуйте
            снова
          </Text>
          <HSpacer size={20} />
        </View>
        <Button label="Хорошо" onPress={close} />
      </View>
    );
  },
  {snapPoints: ['CONTENT_HEIGHT'], dynamic: true},
);
