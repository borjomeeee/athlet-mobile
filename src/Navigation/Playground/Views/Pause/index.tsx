import s from '@borjomeeee/rn-styles';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as UI from 'src/Components';

import PauseIcon from 'src/Assets/Svg/Pause';
import {Colors} from 'src/Utils/Styles';
import {usePauseController} from './Controller';

export const Pause = () => {
  const {bottom} = useSafeAreaInsets();
  const {handlePressFinish, completePause} = usePauseController();

  const [startPauseTime] = React.useState(Date.now());
  const [isCompleting, setIsCompleting] = React.useState(false);

  const [countdown, setCountdown] = React.useState(3);

  React.useEffect(() => {
    if (isCompleting) {
      const intervalId = setInterval(() => {
        setCountdown(i => --i);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setCountdown(3);
    }
  }, [isCompleting]);

  React.useEffect(() => {
    if (countdown === 0) {
      completePause(Date.now() - startPauseTime);
    }
  }, [completePause, countdown, startPauseTime]);

  const handlePressScreen = React.useCallback(() => {
    setIsCompleting(true);
  }, []);

  return (
    <UI.View style={s(`abs t:0 b:0 r:0 l:0 bgc:#00000075`)}>
      {isCompleting ? (
        <UI.View style={s(`fill aic jcc`)}>
          <UI.Text style={s(`P1 medium c:white`)}>{countdown}</UI.Text>
        </UI.View>
      ) : (
        <UI.Pressable style={s(`fill`)} onPress={handlePressScreen}>
          <UI.View style={s(`fill aic jcc`)}>
            <UI.Text style={s(`P3 medium c:white`)}>PAUSE</UI.Text>
            <UI.HSpacer size={15} />
            <PauseIcon width={100} height={100} fill={Colors.white} />
          </UI.View>
          <UI.View style={s(`container`)}>
            <UI.GithubButton
              onPress={handlePressFinish}
              label="Завершить тренировку"
              style={s(`bgc:red bw:0`)}
            />
          </UI.View>
          <UI.HSpacer size={bottom + 20} />
        </UI.Pressable>
      )}
    </UI.View>
  );
};
