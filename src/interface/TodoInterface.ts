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

export interface TodoResetTime {
  hour: number,
  minute: number
}