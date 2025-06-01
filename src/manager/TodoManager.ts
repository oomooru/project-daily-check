import { addDays, format, parseISO } from 'date-fns';
import { TodoData, TodoDateData } from '../interface/TodoInterface';
import { loadTodoDateData, saveTodoDateData } from '../system/AsyncStorage';

class TodoManager {
  private static instance: TodoManager;
  private todoDateData: TodoDateData[] = [];
  private today = new Date().toISOString().split('T')[0];

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

  public getToday(): string {
    return this.today;
  }

  public getTodosByDate(date: string): TodoData[] {
    let todoDateData = this.todoDateData.find(todo => todo.date === date);

    if (!todoDateData && this.todoDateData.length > 0) {
      let lastTodoDateData = this.todoDateData[this.todoDateData.length - 1];
      todoDateData = {...lastTodoDateData, todos: lastTodoDateData.todos.map(todo => ({ ...todo }))};
      todoDateData.date = date;
      todoDateData.todos.map(todo => todo.completed = false);

      this.todoDateData.push(todoDateData);
    }

    return todoDateData ? todoDateData.todos : [];
  }

  public getAllSavedDate() {
    return this.todoDateData.map(todo => todo.date);
  }

  public isCompleteDate(date: string) {
    return this.todoDateData.find(todo => todo.date === date)?.todos.every(todo => todo.completed);
  }

  public getDailyProgressPercentage(date: string) {
    const dailyTodo = this.todoDateData.find(todo => todo.date === date);

    if (!dailyTodo) return 0;

    const completedCount = dailyTodo.todos.filter(todo => todo.completed).length;
    return (completedCount / dailyTodo.todos.length) * 100;
  }

  public getDailyProgressText(date: string) {
    const dailyTodo = this.todoDateData.find(todo => todo.date === date);

    if (!dailyTodo) {
      return '';
    }

    const completedCount = dailyTodo.todos.filter(todo => todo.completed).length;
    return completedCount === dailyTodo.todos.length
      ? 'PERFECT!'
      : `${completedCount}/${dailyTodo.todos.length}`;
  }

  public getConsecutiveDays() {
    const completedTodos = this.todoDateData.filter(todoData => todoData.todos.every(todo => todo.completed));

    if (!completedTodos || completedTodos.length <= 1) return 0;

    const completedTodoDates = completedTodos.map(todo => todo.date);
    let currDate = parseISO(this.today);
    let count = 1;

    while (true) {
      const prevDate = addDays(currDate, -1);
      const prevDateStr = format(prevDate, 'yyyy-MM-dd');

      if (completedTodoDates.includes(prevDateStr)) {
        count++;
        currDate = prevDate;
      } else {
        break;
      }
    }

    return count;
  }

  public getCompleteTagsChartData() {
    const tagCounts: Record<string, {value: number, color: string}> = {};

    this.todoDateData.forEach(todoDate => 
      todoDate.todos.forEach(todo => {
        if (todo.completed) {
          todo.tags.forEach(tag => {
            if (!tagCounts[tag]) {
              tagCounts[tag] = {
                value: 0,
                color: ''
              }
            }
            tagCounts[tag].value += 1;
          }) 
        }
      })
    );

    return Object.entries(tagCounts)
      .map(([label, data]) => ({
        label,
        value: data.value,
        color: data.color
      }))
      .sort((a, b) => b.value - a.value);
  }

  public async saveTodoData(date: string, todos: TodoData[]): Promise<void> {
    await this.saveTodoDateData({date: date, todos: todos});
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