import React, { useState } from 'react';
import { MainTemplate } from '../templates/MainTemplate';
import { TodoList } from '../organisms/TodoList';
import { TodoComposer } from '../organisms/TodoComposer';
import SvgIcon from '../atoms/SvgIcon';

export const MainPage = () => {
  const [todos, setTodos] = useState<Array<{ id: string; text: string; tags: string[]; completed: boolean }>>([]);

  const addTodo = (text: string, tags: string[]) => {
    setTodos([...todos, { id: Date.now().toString(), text, tags, completed: false }]);
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
      header={
        <SvgIcon name="Logo" width={184} height={33} />
      }
      content={
        <>
          <TodoList
            todoItems={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          <TodoComposer onPost={addTodo} />
        </>
      }
    />
  );
};
