import s from '@borjomeeee/rn-styles';
import dayjs from 'dayjs';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {ShadowView, Text, View} from 'src/Components/Common';
import {Pressable} from 'src/Components/Pressable';
import {Colors} from 'src/Utils/Styles';
import {CALENDAR_DATE_HEIGHT, CALENDAR_DATE_WIDTH} from '../../Const';
import {selectedDateStore, todayDateStore} from '../../Store';
import {useDayController} from './Controller';

interface DayPresenterProps {
  date: number;
  calendarId: string;

  isSelected?: boolean;
  isToday?: boolean;
}
const DayPresenter: React.FC<DayPresenterProps> = React.memo(
  ({date, isSelected, isToday, calendarId}) => {
    const {handlePress} = useDayController(calendarId, new Date(date));
    return (
      <Pressable onPress={handlePress}>
        <View
          style={s(
            `w:${CALENDAR_DATE_WIDTH} h:${CALENDAR_DATE_HEIGHT} aic jcc`,
          )}>
          {isToday && (
            <View style={s(`zi:-2 abs w:28 h:28 br:6 bgc:${Colors.blue}20`)} />
          )}
          {isSelected && (
            <View style={s(`zi:-1 abs w:28 h:28 br:6 bgc:${Colors.blue}`)}>
              <ShadowView
                containerStyle={s(`fill`)}
                dx={0}
                dy={0}
                blur={10}
                color={Colors.blue + '25'}
              />
            </View>
          )}
          <Text
            style={s(`c:${Colors.black}`, isSelected && `c:${Colors.white}`)}>
            {dayjs(date).date()}
          </Text>
        </View>
      </Pressable>
    );
  },
);

interface DayProps {
  calendarId: string;
  date: Date | undefined;
}
export const Day: React.FC<DayProps> = React.memo(({calendarId, date}) => {
  const todayDate = useRecoilValue(todayDateStore);
  const selectedDate = useRecoilValue(selectedDateStore(calendarId));

  if (!date) {
    return (
      <View style={s(`w:${CALENDAR_DATE_WIDTH} h:${CALENDAR_DATE_HEIGHT}`)} />
    );
  }

  const isSelected = dayjs(date).isSame(selectedDate, 'day');
  const isToday = dayjs(date).isSame(todayDate, 'day');

  return (
    <DayPresenter
      calendarId={calendarId}
      date={date.getTime()}
      isSelected={isSelected}
      isToday={isToday}
    />
  );
});
