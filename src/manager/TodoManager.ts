import { TodoData, TodoDateData } from '../interface/TodoInterface';
import { loadTodoDateData, saveTodoDateData } from '../system/AsyncStorage';

class TodoManager {
  private static instance: TodoManager;
  private todoDateData: TodoDateData[] = [];

  private constructor() {}

  public static getInstance(): TodoManager {
    if (!TodoManager.instance) {
      TodoManager.instance = new TodoManager();
    }
    return TodoManager.instance;
  }

  public async initialize(): Promise<void> {
    this.todoDateData = await loadTodoDateData();
  }

  public getTodoDateData(): TodoDateData[] {
    return [...this.todoDateData];
  }

  public getTodosByDate(date: string): TodoData[] {
    let todoDateData = this.todoDateData.find(todo => todo.date === date);
    return todoDateData ? todoDateData.todos : [];
  }

  public async saveTodoDateData(todoDateData: TodoDateData): Promise<void> {
    const existingIndex = this.todoDateData.findIndex(t => t.date === todoDateData.date);
    
    if (existingIndex >= 0) {
      this.todoDateData[existingIndex] = todoDateData;
    } else {
      this.todoDateData.push(todoDateData);
    }

    await this.persistData();
  }

  public async deleteTodo(date: string, id: string): Promise<void> {
    let todoDateData = this.todoDateData.find(todo => todo.date === date);

    if (!todoDateData) {
      return;
    }

    todoDateData.todos = todoDateData.todos.filter(todo => todo.id !== id);
    await this.saveTodoDateData(todoDateData);
  }

  private async persistData(): Promise<void> {
    await saveTodoDateData(this.todoDateData);
  }
}

export default TodoManager.getInstance();