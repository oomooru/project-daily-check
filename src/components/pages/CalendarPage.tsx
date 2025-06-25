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
import { useLanguage } from '../../context/LanguageContext';

export const CalendarPage = () => {

  const { t } = useLanguage();

  const [selectedDay, setSelectedDay] = useState('');
  const [recordedDays, setRecoredDays] = useState<string[]>([]);
  const [markedSelectedDates, setMarkedSelectedDates] = useState<MarkedDates>({});
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [consecutiveCount, setConsecutiveCount] = useState(0);

  let markedDateList: string[] = [];
  let markedDates: MarkedDates = {};

  useEffect(() => {
    setRecoredDays(TodoManager.getAllSavedDate());
  }, []);

  useFocusEffect(useCallback(() => {
    setProgressPercentage(TodoManager.getDailyProgressPercentage(selectedDay ? selectedDay : TodoManager.getToday()));
    setProgressText(TodoManager.getDailyProgressText(selectedDay ? selectedDay : TodoManager.getToday()));
    setConsecutiveCount(TodoManager.getConsecutiveDays());
  }, []));

  useEffect(() => {
    recordedDays.forEach((date) => {markedDateList.push(date)});
    markedDateList.forEach((date) => {
      markedDates[date] = {
        marked: true, 
        dotColor: TodoManager.isCompleteDate(date) ? colors.primary : colors.secondary
      }
    });

    setMarkedSelectedDates({
      ...markedDates,
      [TodoManager.getToday()]: {
        selected: true,
        marked: markedDates[TodoManager.getToday()]?.marked,
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

    setProgressPercentage(TodoManager.getDailyProgressPercentage(selectedDay ? selectedDay : TodoManager.getToday()));
    setProgressText(TodoManager.getDailyProgressText(selectedDay ? selectedDay : TodoManager.getToday()));
  }, [recordedDays, selectedDay, TodoManager.getToday()]);

  function getRelativeTime(
    targetDateStr: string
  ): string {
    return targetDateStr === TodoManager.getToday() ? 
      "Today" : formatDistance(targetDateStr, TodoManager.getToday(), {addSuffix: true, includeSeconds: false});
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
                  if (TodoManager.getToday() === day.dateString) {
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
                {consecutiveCount > 1 && !selectedDay && (
                  <Text style={styles.consecutiveText}>{t("calendarConsectutiveText", {count: consecutiveCount})}</Text>
                )}
                <Text style={styles.progressText}>{progressText !== '' ? progressText : t("calendarProgressTextEmpty")}</Text>
              </View>

              {progressText && (
                <View style={{width: '100%', height: 24, marginBottom: 16}}>
                  <GaugeBar progress={progressPercentage} isBackgroundVisible={true} />
                </View>
              )}

              <View style={styles.descriptionTitle}>
                <Text variant='title' style={styles.selectedDateText}>{selectedDay ? selectedDay : TodoManager.getToday()}</Text>
                <Text variant='body' style={styles.relativeDateText}>{getRelativeTime(selectedDay ? selectedDay : TodoManager.getToday())}</Text>
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
  },
  consecutiveTextBox: {
    flex: 1,
  },
  consecutiveText: {
    fontSize: 20,
    color: colors.primary
  }
});
