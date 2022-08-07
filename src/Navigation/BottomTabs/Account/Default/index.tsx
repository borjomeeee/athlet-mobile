import s from '@borjomeeee/rn-styles';
import dayjs from 'dayjs';
import React from 'react';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {TrainingEvent} from 'src/Store/Models/Training';
import {sortedTrainingsEventsListSelector} from 'src/Store/TrainingsEvents';

import {TrainingEventCard} from './Views/TrainingEventCard';

import GymIcon from 'src/Assets/Svg/Gym';
import {Header} from './Views/Header';

export const Account = () => {
  const trainingsEventsList = useRecoilValue(sortedTrainingsEventsListSelector);

  const trainingEventsSections = React.useMemo(() => {
    const byId: Record<string, {title: string; data: TrainingEvent[]}> = {};
    trainingsEventsList.forEach(event => {
      const date = dayjs(event.completedAt).startOf('day');
      const time = date.toDate().getTime();

      if (byId[time]) {
        byId[time].data.push(event);
      } else {
        byId[time] = {
          title: dayjs(time).format('DD MMMM YYYY'),
          data: [event],
        };
      }
    });

    return Object.entries(byId)
      .sort((s1, s2) => +s2[0] - +s1[0])
      .map(ss => ss[1]);
  }, [trainingsEventsList]);

  return (
    <UI.SectionList
      sections={trainingEventsSections}
      ListHeaderComponent={Header}
      style={s(`fill bgc:layout`)}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      SectionSeparatorComponent={SectionSeparator}
      ListEmptyComponent={EmptyComponent}
      bounces={false}
    />
  );
};

function renderSectionHeader({
  section,
}: {
  section: {title: string; data: TrainingEvent[]};
}) {
  return (
    <UI.View style={s(`container`)}>
      <UI.Text style={s(`P7 medium`)}>{section.title}</UI.Text>
      <UI.VSpacer size={15} />
    </UI.View>
  );
}

function renderItem({item}: {item: TrainingEvent}) {
  return <TrainingEventCard trainingEvent={item} />;
}

function SectionSeparator() {
  return <UI.HSpacer size={15} />;
}

function ItemSeparator() {
  return <UI.HSpacer size={10} />;
}

function EmptyComponent() {
  return (
    <UI.View style={s(`aic container`)}>
      <UI.HSpacer size={20} />
      <GymIcon width={100} height={100} fill={'#CCCCCC'} />
      <UI.HSpacer size={20} />
      <UI.MultilineText style={s(`P5 semibold c:#CCCCCC`)}>
        {['Выполненных', 'тренировок пока нет']}
      </UI.MultilineText>
    </UI.View>
  );
}
