export interface TodoData {
  id: string,
  text: string,
  tags: string[],
  completed: boolean
}

export interface TodoDateData {
  date: string,
  todos: TodoData[]
}