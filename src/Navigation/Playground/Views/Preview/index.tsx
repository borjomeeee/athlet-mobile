import React from 'react';
import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {usePlaygroundPreviewController} from './Controller';
import {usePlayground} from '../../Hooks';

export const Preview = () => {
  const [countdown, setCountdown] = React.useState(5);

  const {start} = usePlayground();
  const {handlePressCancel} = usePlaygroundPreviewController();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(i => --i);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    if (countdown === 0) {
      start();
    }
  }, [countdown, start]);

  return (
    <UI.View style={s(`fill aic jcc`)}>
      <UI.MultilineText style={s(`P5 medium c:#ffffff80 tac`)}>
        {['Тренировка', 'начнется через']}
      </UI.MultilineText>
      <UI.HSpacer size={70} />
      <UI.Text style={s(`P1 medium c:white`)}>{countdown}</UI.Text>
      <UI.HSpacer size={50} />
      <UI.Button
        style={s(`bw:1 bc:#FFFFFF50 br:6`, `pv:10 ph:47 bgc:#ffffff10`)}
        onPress={handlePressCancel}
        label="Отмена"
      />
    </UI.View>
  );
};
