import s from '@borjomeeee/rn-styles';
import React from 'react';
import * as UI from 'src/Components';
import {CompletionLine} from './CompletionLine';
import {NextElementInfo} from './NextElementInfo';
import {Time} from './Time';

import ArrowNextIcon from 'src/Assets/Svg/ArrowNext';

export const Header = () => {
  return (
    <UI.View>
      <CompletionLine />
      <UI.HSpacer size={15} />
      <UI.View style={s(`container row`)}>
        <UI.View style={s(`w:80`)}>
          <Time />
        </UI.View>
        <UI.View style={s(`w:1 bgc:#ffffff20`)} />
        <UI.VSpacer size={20} />
        <UI.View style={s(`fill aife`)}>
          <UI.View style={s(`row aic`)}>
            <UI.Text style={s(`P7 medium c:#ffffff60`)}>cледущее</UI.Text>
            <ArrowNextIcon fill="#ffffff60" />
          </UI.View>
          <NextElementInfo />
        </UI.View>
      </UI.View>
    </UI.View>
  );
};
