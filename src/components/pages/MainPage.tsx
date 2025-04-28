import React, { useState } from 'react';
import { MainTemplate } from '../templates/MainTemplate';
import { InputWithButton } from '../molecules/InputWithButton';
import { TodoList } from '../organisms/TodoList';
import { Text } from '../atoms/Text';

export const MainPage = () => {
  const [todos, setTodos] = useState<Array<{ id: string; text: string; completed: boolean }>>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now().toString(), text, completed: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <MainTemplate
      header={<Text variant="title">Todo</Text>}
      content={
        <>
          <InputWithButton
            placeholder="Add a new task"
            buttonText="Add"
            onSubmit={addTodo}
          />
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </>
      }
    />
  );
};