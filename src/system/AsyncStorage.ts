import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationTime, TodoDateData, TodoResetTime } from "../interface/TodoInterface";

const STORAGE_KEY = {
  TODO_DATE_DATA: '@todoDateData',
  LANGUAGE: '@language',
  RESET_TIME: '@resetTime',
  NOTIFICATION_TIME: '@notificationTime'
}

export const saveTodoDateData = async (todoDateData: TodoDateData[]) : Promise<void> => {
  try {
    const json = JSON.stringify(todoDateData);
    await AsyncStorage.setItem(STORAGE_KEY.TODO_DATE_DATA, json);
  } catch (e) {
    console.error('Failed to save todo date data', e);
  }
};

export const loadTodoDateData = async (): Promise<TodoDateData[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY.TODO_DATE_DATA);
    const parsed: TodoDateData[] = json ? JSON.parse(json) : [];
    return parsed;
  } catch (e) {
    console.error('Failed to load todo date data', e);
    return [];
  }
}

export const saveLanguage = async (locale: string): Promise<void> => {
  try {
    const json = JSON.stringify(locale);
    await AsyncStorage.setItem(STORAGE_KEY.LANGUAGE, json);
  } catch (e) {
    console.error('Failed to save language', e);
  }
}

export const loadLanguage = async (): Promise<string> => {
  try {
  const json = await AsyncStorage.getItem(STORAGE_KEY.LANGUAGE);
  const parsed: string = json ? JSON.parse(json) : [];
  return parsed;
  } catch (e) {
    console.error('Failed to load language', e);
    return '';
  }
}

export const saveResetTime = async (resetTime: TodoResetTime): Promise<void> => {
  try {
    const json = JSON.stringify(resetTime);
    await AsyncStorage.setItem(STORAGE_KEY.RESET_TIME, json);
  } catch (e) {
    console.error('Failed to save reset time', e);
  }
}

export const loadResetTime = async (): Promise<TodoResetTime> => {
  try {
  const json = await AsyncStorage.getItem(STORAGE_KEY.RESET_TIME);
  const parsed: TodoResetTime = json ? JSON.parse(json) : [];
  return parsed;
  } catch (e) {
    console.error('Failed to load reset time', e);
    return {hour: 0, minute: 0};
  }
}

export const saveNotificationTime = async (notificationTime: NotificationTime): Promise<void> => {
  try {
    const json = JSON.stringify(notificationTime);
    await AsyncStorage.setItem(STORAGE_KEY.NOTIFICATION_TIME, json);
  } catch (e) {
    console.error('Failed to save notification time', e);
  }
}

export const loadNotificationTime = async (): Promise<NotificationTime> => {
  try {
  const json = await AsyncStorage.getItem(STORAGE_KEY.NOTIFICATION_TIME);
  const parsed: NotificationTime = json ? JSON.parse(json) : [];
  return parsed;
  } catch (e) {
    console.error('Failed to load notification time', e);
    return {hour: 23, minute: 0};
  }
}
