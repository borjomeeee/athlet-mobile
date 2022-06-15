import s from '@borjomeeee/rn-styles';
import React from 'react';
import * as UI from 'src/Components';

import TelegramIcon from 'src/Assets/Svg/Telegram';
import GmailIcon from 'src/Assets/Svg/Gmail';

export const Settings = () => {
  return (
    <UI.View style={s(`fill bgc:layout`)}>
      <UI.View style={s(`container`)}>
        <UI.Text style={s(`P3 semibold pt:20 pb:30`)}>Настройки</UI.Text>
      </UI.View>

      <UI.PressableLabelRow label="Пользовательское соглашение" first />
      <UI.PressableLabelRow label="Политика конфиденциалности" />

      <UI.HSpacer size={20} />

      <UI.LabeledRow label="Версия приложения" first>
        <UI.Text style={s(`c:#B3B3B3`)}>0.0.1</UI.Text>
      </UI.LabeledRow>
      <UI.LabeledRow label="Разработчик">
        <UI.View style={s(`row aic`)}>
          <TelegramIcon />
          <UI.VSpacer size={10} />
          <UI.View style={s(`pt:3`)}>
            <GmailIcon />
          </UI.View>
        </UI.View>
      </UI.LabeledRow>
    </UI.View>
  );
};
