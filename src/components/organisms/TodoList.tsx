import React from 'react';
import { FlatList } from 'react-native';
import { TodoItem } from '../molecules/TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggle, 
  onDelete 
}) => (
  <FlatList
    data={todos}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <TodoItem
        text={item.text}
        completed={item.completed}
        onToggle={() => onToggle(item.id)}
        onDelete={() => onDelete(item.id)}
      />
    )}
  />
);