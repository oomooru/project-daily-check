import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { useFocusEffect } from '@react-navigation/native';
import SvgIcon from '../atoms/SvgIcon';
import { CalendarTemplate } from '../templates/CalendarTemplate';
import { colors } from '../../constants/Colors';
import TodoManager from '../../manager/TodoManager';
import { Text } from '../atoms/Text';
import { formatDistance } from 'date-fns';
import { GaugeBar } from '../atoms/GaugeBar';

export const CalendarPage = () => {

  const [selectedDay, setSelectedDay] = useState('');
  const [today, setToday] = useState('');
  const [recordedDays, setRecoredDays] = useState<string[]>([]);
  const [markedSelectedDates, setMarkedSelectedDates] = useState<MarkedDates>({});
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressText, setProgressText] = useState('');

  let markedDateList: string[] = [];
  let markedDates: MarkedDates = {};

  useEffect(() => {
    setToday(TodoManager.getToday());
    setRecoredDays(TodoManager.getAllSavedDate());
    setProgressPercentage(TodoManager.getDailyProgressPercentage(selectedDay ? selectedDay : today));
    setProgressText(TodoManager.getDailyProgressText(selectedDay ? selectedDay : today));
  }, []);

  useFocusEffect(useCallback(() => {
    setToday(TodoManager.getToday());
    setRecoredDays(TodoManager.getAllSavedDate());
    setProgressPercentage(TodoManager.getDailyProgressPercentage(selectedDay ? selectedDay : today));
    setProgressText(TodoManager.getDailyProgressText(selectedDay ? selectedDay : today));
  }, []));

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

    setProgressPercentage(TodoManager.getDailyProgressPercentage(selectedDay ? selectedDay : today));
    setProgressText(TodoManager.getDailyProgressText(selectedDay ? selectedDay : today));
  }, [selectedDay, today, recordedDays]);

  function getRelativeTime(
    targetDateStr: string
  ): string {
    return targetDateStr === today ? 
      "Today" : formatDistance(targetDateStr, today, {addSuffix: true, includeSeconds: false});
  }

  return (
    <CalendarTemplate
      header={
        <SvgIcon name="Logo" width={184} height={33} />
      }
      content={
        <>
          <View style={styles.container}>
            <Calendar
              style={styles.calandar}
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

            <View style={styles.descriptionBox}>

              <View style={styles.progressTextBox}>
                <Text style={styles.progressText}>{progressText !== '' ? progressText : '기록이 없습니다'}</Text>
              </View>

              <GaugeBar progress={progressPercentage} />

              <View style={styles.descriptionTitle}>
                <Text variant='title' style={styles.selectedDateText}>{selectedDay ? selectedDay : today}</Text>
                <Text variant='body' style={styles.relativeDateText}>{getRelativeTime(selectedDay ? selectedDay : today)}</Text>
              </View>

            </View>
          </View>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calandar: {
    marginTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary
  },
  descriptionBox: {
    flex: 1,
    alignItems: 'center',
    padding: 16
  },
  descriptionTitle: {
    alignItems: 'center'
  },
  selectedDateText: {
    flexWrap: 'wrap',
    color: colors.primary
  },
  relativeDateText: {
    flexWrap: 'wrap',
    color: colors.secondary
  },
  progressTextBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8
  },
  progressText: {
    fontSize: 36,
    color: colors.primary
  }
});
