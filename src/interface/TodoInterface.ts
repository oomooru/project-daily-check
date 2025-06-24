export interface TodoData {
  id: string,
  type: TodoType,
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

export interface NotificationTime {
  hour: number,
  minute: number
}

export type TodoType = 'daily' | 'flash';