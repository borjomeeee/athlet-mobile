import s from '@borjomeeee/rn-styles';
import React from 'react';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {startTimeStore} from 'src/Navigation/Playground/Store';

export const Time = () => {
  const [nowTime, setNowTime] = React.useState(Date.now());
  const startTime = useRecoilValue(startTimeStore);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setNowTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedDuration = React.useMemo(() => {
    if (!startTime) {
      return 'Undefined';
    }

    const diffSeconds = Math.floor((nowTime - startTime) / 1000);
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
  }, [nowTime, startTime]);

  return (
    <UI.View>
      <UI.Text style={s(`P5 medium c:white`)}>{formattedDuration}</UI.Text>
    </UI.View>
  );
};
