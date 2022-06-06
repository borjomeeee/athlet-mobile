import React from 'react';
import * as UI from 'src/Components';
import s from '@borjomeeee/rn-styles';
import {usePlaygroundPreviewController} from './Controller';
import {PlaygroundClock} from '../../Clock';
import {usePlayground} from '../../Hooks';

const previewClock = new PlaygroundClock();
const DURATION = 5000;

export const Preview = () => {
  const [renderTime] = React.useState(Date.now());
  const [clockTime, setClockTime] = React.useState(renderTime);

  const {start} = usePlayground();
  const {handlePressCancel} = usePlaygroundPreviewController();

  React.useEffect(() => {
    previewClock.start();
    return () => previewClock.stop();
  }, []);

  React.useEffect(() => {
    const unwatch = previewClock.watch(setClockTime);
    return () => unwatch();
  }, []);

  React.useEffect(() => {
    if (clockTime - DURATION >= renderTime) {
      start();
    }
  }, [clockTime, renderTime, start]);

  const countdown = React.useMemo(() => {
    const secs = Math.ceil((DURATION - (clockTime - renderTime)) / 1000);
    return secs;
  }, [clockTime, renderTime]);

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
