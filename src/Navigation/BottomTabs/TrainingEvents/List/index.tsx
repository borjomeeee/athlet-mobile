import s from '@borjomeeee/rn-styles';
import dayjs from 'dayjs';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';
import * as UI from 'src/Components';
import {TrainingEvent} from 'src/Store/Models/Training';
import {trainingsEventsListSelector} from 'src/Store/TrainingsEvents';

import RightArrowIcon from 'src/Assets/Svg/RightArrow';

export const TrainingsEventsList = () => {
  const trainingsEventsList = useRecoilValue(trainingsEventsListSelector);

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
      .sort((s1, s2) => +s1[0] - +s2[0])
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
  return (
    <UI.View style={s(`container`)}>
      <UI.Scalable>
        <UI.ShadowView dx={0} dy={0} color={'#E1E4E875'} blur={10}>
          <UI.View style={s(`row bgc:white br:20 ph:16 pv:10 aic`)}>
            <UI.View style={s(`fill`)}>
              <UI.Text style={s(`P7 medium`)}>
                {item.initialTraining.title}
              </UI.Text>
            </UI.View>
            <RightArrowIcon />
          </UI.View>
        </UI.ShadowView>
      </UI.Scalable>
    </UI.View>
  );
}

function SectionSeparator() {
  return <UI.HSpacer size={15} />;
}

function ItemSeparator() {
  return <UI.HSpacer size={10} />;
}

export const Header = () => {
  const {top} = useSafeAreaInsets();
  return (
    <UI.View style={s(`container`)}>
      <UI.HSpacer size={top} />
      <UI.Text style={s(`P3 semibold pt:40 pb:30`)}>Статистика</UI.Text>
    </UI.View>
  );
};
