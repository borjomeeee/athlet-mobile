import s from '@borjomeeee/rn-styles';
import React from 'react';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {playgroundClock} from 'src/Navigation/Playground/Clock';
import {
  isPauseStore,
  pauseTimeStore,
  startTimeStore,
} from 'src/Navigation/Playground/Store';

export const Time = () => {
  const [clockTime, setClockTime] = React.useState(Date.now());

  const startTime = useRecoilValue(startTimeStore);
  const isPause = useRecoilValue(isPauseStore);
  const pauseTime = useRecoilValue(pauseTimeStore);

  React.useEffect(() => {
    if (!isPause) {
      const unwatch = playgroundClock.watch(setClockTime);
      return () => unwatch();
    }
  }, [isPause]);

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
