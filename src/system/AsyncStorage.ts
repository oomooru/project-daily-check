import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoData, TodoDateData } from "../interface/TodoInterface";

const STORAGE_KEY = {
  TODO_DATA: '@todoData',
  TODO_DATE_DATA: '@todoDateData'
}

export const saveTodoData = async (todos: TodoData[]): Promise<void> => {
  try {
    const json = JSON.stringify(todos);
    await AsyncStorage.setItem(STORAGE_KEY.TODO_DATA, json);
  } catch (e) {
    console.error('Failed to save todo data', e);
  }
};

export const loadTodoData = async (): Promise<TodoData[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY.TODO_DATA);
    const parsed: TodoData[] = json ? JSON.parse(json) : [];
    return parsed;
  } catch (e) {
    console.error('Failed to load todo data', e);
    return [];
  }
};

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
