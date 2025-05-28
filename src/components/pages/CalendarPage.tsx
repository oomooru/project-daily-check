import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import SvgIcon from '../atoms/SvgIcon';
import { CalendarTemplate } from '../templates/CalendarTemplate';
import { colors } from '../../constants/Colors';
import TodoManager from '../../manager/TodoManager';
import { MarkedDates } from 'react-native-calendars/src/types';

export const CalendarPage = () => {

  const [selectedDay, setSelectedDay] = useState('');
  const [today, setToday] = useState('');
  const [recordedDays, setRecoredDays] = useState<string[]>([]);
  const [markedSelectedDates, setMarkedSelectedDates] = useState<MarkedDates>({});

  let markedDateList: string[] = [];
  let markedDates: MarkedDates = {};

  useEffect(() => {
    setToday(TodoManager.getToday());
    setRecoredDays(TodoManager.getAllSavedDate());
  }, []);

  useEffect(() => {
    recordedDays.forEach((date) => {markedDateList.push(date)});
    markedDateList.forEach((date) => {markedDates[date] = {marked: true, dotColor: colors.primary}});
    setMarkedSelectedDates({
      ...markedDates,
      [today]: {
        selected: true,
        marked: markedDates[today]?.marked,
        selectedColor: colors.primary,
        dotColor: colors.background
      },
      [selectedDay]: {
        selected: true,
        marked: markedDates[selectedDay]?.marked,
        disableTouchEvent: true,
        selectedColor: colors.secondary,
        dotColor: colors.background
      }
    });
  }, [selectedDay, today, recordedDays]);

  return (
    <CalendarTemplate
      header={
        <SvgIcon name="Logo" width={184} height={33} />
      }
      content={
        <>
          <Calendar
            onDayPress={
              day => {
                if (today === day.dateString) {
                  setSelectedDay('');
                } else{
                  setSelectedDay(day.dateString);
                }
              }
            }
            markedDates={markedSelectedDates}
            theme={{
              'stylesheet.calendar.header': {
                dayTextAtIndex0: {
                  color: colors.sunday,
                },
                dayTextAtIndex6: {
                  color: colors.saturday,
                }
              },
              backgroundColor: colors.background,
              calendarBackground: colors.background,
              textSectionTitleColor: colors.textWhite,
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: colors.textBlack,
              todayTextColor: colors.textWhite,
              dayTextColor: colors.primary,
              textDisabledColor: colors.secondary,
              arrowColor: colors.secondary,
              monthTextColor: colors.primary,
            } as any}
            hideExtraDays={true}
          />
        </>
      }
    />
  );
};
