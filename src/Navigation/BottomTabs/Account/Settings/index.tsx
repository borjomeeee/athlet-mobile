import s from '@borjomeeee/rn-styles';
import React from 'react';
import * as UI from 'src/Components';

import TelegramIcon from 'src/Assets/Svg/Telegram';
import GmailIcon from 'src/Assets/Svg/Gmail';
import {Linking} from 'react-native';
import {Config} from 'src/Config';

export const Settings = () => {
  const handlePressTg = React.useCallback(() => {
    Linking.canOpenURL(Config.developer.tg) &&
      Linking.openURL(Config.developer.tg);
  }, []);

  const handlePressGmail = React.useCallback(() => {
    const gmailUrl = `mailto:${Config.developer.gmail}`;
    Linking.canOpenURL(gmailUrl) && Linking.openURL(gmailUrl);
  }, []);

  const handlePressPrivacyPolicy = React.useCallback(() => {
    Linking.canOpenURL(Config.developer.privacyPolicy) &&
      Linking.openURL(Config.developer.privacyPolicy);
  }, []);

  const handlePressUserAgreement = React.useCallback(() => {
    Linking.canOpenURL(Config.developer.userAgreement) &&
      Linking.openURL(Config.developer.userAgreement);
  }, []);

  return (
    <UI.View style={s(`fill bgc:layout`)}>
      <UI.View style={s(`container`)}>
        <UI.Text style={s(`P3 semibold pt:20 pb:30`)}>Настройки</UI.Text>
      </UI.View>

      <UI.PressableLabelRow
        label="Пользовательское соглашение"
        onPress={handlePressUserAgreement}
        first
      />
      <UI.PressableLabelRow
        label="Политика конфиденциалности"
        onPress={handlePressPrivacyPolicy}
      />

      <UI.HSpacer size={20} />

      <UI.LabeledRow label="Версия приложения" first>
        <UI.Text style={s(`c:#B3B3B3`)}>1.0.1</UI.Text>
      </UI.LabeledRow>
      <UI.LabeledRow label="Разработчик">
        <UI.View style={s(`row aic`)}>
          <UI.Pressable onPress={handlePressTg}>
            <TelegramIcon onPress={handlePressTg} />
          </UI.Pressable>
          <UI.VSpacer size={10} />
          <UI.Pressable onPress={handlePressGmail}>
            <GmailIcon width={24} height={24} />
          </UI.Pressable>
        </UI.View>
      </UI.LabeledRow>
    </UI.View>
  );
};
