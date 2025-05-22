import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoData } from "../interface/TodoInterface";

const STORAGE_KEY = {
  TODO_DATA: 'todoData'
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
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load todo data', e);
    return [];
  }
}
