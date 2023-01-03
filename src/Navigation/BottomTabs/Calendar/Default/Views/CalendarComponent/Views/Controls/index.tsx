import React from 'react';
import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {useControlsController} from './Controller';

import ArrowIcon from 'src/Assets/Svg/RightArrow';

export const Controls = () => {
  const {handlePressNext, handlePressPrev} = useControlsController();
  return (
    <UI.View style={s(`row aic`)}>
      <UI.Pressable style={s(`rotate`)} onPress={handlePressPrev}>
        <ArrowIcon width={32} height={32} fill={'#00000024'} />
      </UI.Pressable>
      <UI.Pressable onPress={handlePressNext}>
        <ArrowIcon width={32} height={32} fill={'#00000024'} />
      </UI.Pressable>
    </UI.View>
  );
};
