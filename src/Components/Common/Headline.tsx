import s from '@borjomeeee/rn-styles';
import React from 'react';
import {VSpacer} from './Spacer';
import {Text} from './Text';
import {View} from './View';

interface HeadlineProps {
  label: string;
}
export const Headline: React.FC<HeadlineProps> = ({label}) => {
  return (
    <View
      style={s(
        `btw:1 bbw:1 bc:ultraLightGray bgc:#F6F8FA`,
        `h:28 row aic ph:16`,
      )}>
      <View style={s(`fill`)}>
        <Text style={s(`P9 semibold c:#57606A uppercase`)}>{label}</Text>
      </View>

      <VSpacer size={20} />
    </View>
  );
};
