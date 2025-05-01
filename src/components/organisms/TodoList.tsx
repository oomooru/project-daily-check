import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
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
        tags={['태그A', '태그B', '태그C']}
        onToggle={() => onToggle(item.id)}
        onDelete={() => onDelete(item.id)}
      />
    )}
  />
);
