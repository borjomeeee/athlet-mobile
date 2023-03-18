import React from 'react';

import s from '@borjomeeee/rn-styles';
import * as UI from 'src/Components';

import OkIcon from 'src/Assets/Svg/Ok';

import {useSuccessCompleteTrainingController} from './Hooks';
import {useShowable} from 'src/Lib/ShowablePortal/Hooks/useShowable';
import {bottomSheet} from 'src/Lib/ShowablePortal/Variants/BottomSheet';
import {SuccessCompleteTrainingProps} from './Types';

export const SuccessCompleteTraining =
  bottomSheet<SuccessCompleteTrainingProps>(
    ({id}) => {
      const {close} = useShowable(id);
      const {handlePressShowStatistic} = useSuccessCompleteTrainingController();

      return (
        <UI.View style={s(`container`)}>
          <UI.View style={s(`aic jcc`)}>
            <OkIcon />
            <UI.HSpacer size={20} />
            <UI.MultilineText style={s(`P5 medium`)}>
              {['Тренировка', 'успешно завершена']}
            </UI.MultilineText>
            <UI.HSpacer size={30} />
          </UI.View>
          <UI.GithubButton
            label="Посмотреть статистику"
            onPress={handlePressShowStatistic}
          />
          <UI.HSpacer size={10} />
          <UI.View style={s(`aic`)}>
            <UI.Pressable onPress={close}>
              <UI.Text style={s(`P7 medium c:gray`)}>Закрыть</UI.Text>
            </UI.Pressable>
          </UI.View>
        </UI.View>
      );
    },
    {snapPoints: ['CONTENT_HEIGHT'], dynamic: true},
  );
