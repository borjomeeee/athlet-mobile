import React from 'react';
import * as UI from 'src/Components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSettingsHeaderController} from './Controller';
import s from '@borjomeeee/rn-styles';

import UserIcon from 'src/Assets/Svg/TabBarAccount';
import SettingsIcon from 'src/Assets/Svg/Settings';

export const Header = () => {
  const {top} = useSafeAreaInsets();
  const {handlePressSettings} = useSettingsHeaderController();

  return (
    <>
      <UI.View style={s(`container bgc:white`)}>
        <UI.HSpacer size={top + 20} />

        <UI.View style={s(`aic rel`)}>
          <UserIcon width={80} height={80} fill={'#CCCCCC'} />
          <UI.Text style={s(`P5 medium`)}>Гость</UI.Text>
          <UI.HSpacer size={15} />

          <UI.View style={s(`abs t:0 r:0`)}>
            <UI.Pressable onPress={handlePressSettings}>
              <SettingsIcon />
            </UI.Pressable>
          </UI.View>
        </UI.View>
      </UI.View>
      <UI.Headline label="История выполнения тренировок" />
      <UI.HSpacer size={15} />
    </>
  );
};
