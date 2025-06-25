import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SummaryTemplate } from "../templates/SummaryTemplate";
import SvgIcon from "../atoms/SvgIcon";
import { colors } from "../../constants/Colors";
import { Card } from "../molecules/Card";
import { LanguageSelector } from "../organisms/LanguageSelector";
import { useLanguage } from "../../context/LanguageContext";
import { TodoDeleteButton } from "../organisms/TodoDeleteButton";
import { TimePicker } from "../organisms/TimePicker";
import { NotificationTime, TodoResetTime } from "../../interface/TodoInterface";
import TodoManager from "../../manager/TodoManager";
import { scheduleNotification } from "../../services/NotificationService";

export const ConfigPage = () => {
  const { t } = useLanguage();
  const [resetTime, setResetTime] = useState<TodoResetTime>(TodoManager.getResetTime());
  const [notificationTime, setNotificationTime] = useState<NotificationTime>(TodoManager.getNotificationTime());

  useFocusEffect(
    useCallback(() => {
      setResetTime(TodoManager.getResetTime());
      setNotificationTime(TodoManager.getNotificationTime());
    }, [])
  );

  useEffect(() => {
    
  }, []);

  const onResetTimeChange = (resetTime: TodoResetTime) => {
    setResetTime(resetTime);
    TodoManager.setResetTime(resetTime);
  }

  const onNotificationTimeChange = (notificationTime: NotificationTime) => {
    setNotificationTime(notificationTime);
    TodoManager.setNotificationTime(notificationTime);

    scheduleNotification(notificationTime);
  }

  return (
    <SummaryTemplate
      header={<SvgIcon name="Logo" width={184} height={33} />}
      content={
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>
            <Card
              title={t('displayLanguage')}
              content={
                <LanguageSelector />
              }
            />
            <Card 
              title={t('resetTime')}
              content={
                <TimePicker 
                  currentResetTime={resetTime}
                  onTimeChange={onResetTimeChange}
                />
              }
            />
            <Card 
              title={t('configNotificationTime')}
              content={
                <TimePicker 
                  currentResetTime={notificationTime}
                  onTimeChange={onNotificationTimeChange}
                />
              }
            />
            <Card
              title={t('todoDelete')}
              content={
                <TodoDeleteButton />
              }
            />
          </ScrollView>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    height: "100%",
    paddingVertical: 8
  },
  summaryCardContentText: {
    width: "100%",
    textAlign: "center",
    color: colors.textWhite,
    marginBottom: 16,
    fontSize: 20,
  }
});
