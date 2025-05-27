import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import SvgIcon from '../atoms/SvgIcon';
import { CalendarTemplate } from '../templates/CalendarTemplate';
import { colors } from '../../constants/Colors';
import { format } from 'date-fns';


export const CalendarPage = () => {

  const today = new Date();
  const todayString = format(today, 'yyyy-MM-dd');
  const [selectedDay, setSelectedDay] = useState('');

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
                if (todayString === day.dateString) {
                  setSelectedDay('');
                } else{
                  setSelectedDay(day.dateString);
                }
              }
            }
            markedDates={{
              [todayString]: {selected: true, selectedColor: colors.primary},
              [selectedDay]: {selected: true, disableTouchEvent: true, selectedColor: colors.secondary}
            }}
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
