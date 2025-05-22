export interface TodoData {
  id: string,
  text: string,
  tags: string[],
  completed: boolean,
  completeData?: number // Unix Timestamp
}