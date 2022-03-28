import s from '@borjomeeee/rn-styles';
import {TouchableHighlight} from '@gorhom/bottom-sheet';
import React from 'react';

import * as UI from 'src/Components';

interface SelectableItemProps {
  label: string;
  LeftIcon: React.FC;
  onPress: () => void;
}
export const SelectableItem: React.FC<SelectableItemProps> = ({
  LeftIcon,
  label,
  onPress,
}) => {
  return (
    <TouchableHighlight
      style={s(`h:44 bgc:#fff`)}
      underlayColor="#D0D7DE32"
      onPress={onPress}>
      <UI.View style={s(`container row h:44 aic`)}>
        <LeftIcon />
        <UI.VSpacer size={15} />
        <UI.View style={s(`fill`)}>
          <UI.Text style={s(`P7`)}>{label}</UI.Text>
        </UI.View>
      </UI.View>
    </TouchableHighlight>
  );
};
