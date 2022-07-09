import s from '@borjomeeee/rn-styles';
import React from 'react';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {usePlayground} from 'src/Navigation/Playground/Hooks';
import {
  isPauseStore,
  pauseTimeStore,
  startTimeStore,
} from 'src/Navigation/Playground/Store';

export const Time = () => {
  const {updateNotification} = usePlayground();
  const [clockTime, setClockTime] = React.useState(Date.now());

  const startTime = useRecoilValue(startTimeStore);
  const isPause = useRecoilValue(isPauseStore);
  const pauseTime = useRecoilValue(pauseTimeStore);

  React.useEffect(() => {
    if (!isPause) {
      setClockTime(Date.now());

      const intervalId = setInterval(() => {
        const nowTime = Date.now();
        setClockTime(nowTime);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isPause]);

  React.useEffect(() => {
    updateNotification();
  }, [clockTime, updateNotification]);

  const formattedDuration = React.useMemo(() => {
    if (!startTime) {
      return 'Undefined';
    }

    const diffSeconds = Math.floor((clockTime - startTime - pauseTime) / 1000);
    const diffSecondsPerMin = diffSeconds % 60;
    const strDiffSecondsPerMin =
      diffSecondsPerMin.toString().length === 1
        ? '0' + diffSecondsPerMin
        : diffSecondsPerMin.toString();

    const diffMinutes = Math.floor(diffSeconds / 60);
    const strDiffMinutes =
      diffMinutes.toString().length === 1
        ? '0' + diffMinutes
        : diffMinutes.toString();

    return `${strDiffMinutes}:${strDiffSecondsPerMin}`;
  }, [clockTime, startTime, pauseTime]);

  return (
    <UI.View>
      <UI.Text style={s(`P5 medium c:white`)}>{formattedDuration}</UI.Text>
    </UI.View>
  );
};
