import React from 'react';
import {Linking} from 'react-native';
import {Config} from 'src/Config';

export const useSettingsController = () => {
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

  return {
    handlePressGmail,
    handlePressPrivacyPolicy,
    handlePressTg,
    handlePressUserAgreement,
  };
};
