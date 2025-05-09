import React, { useState } from 'react';
import { MainTemplate } from '../templates/MainTemplate';
import { InputWithButton } from '../molecules/InputWithButton';
import { TodoList } from '../organisms/TodoList';
import SvgIcon from '../atoms/SvgIcon';

export const MainPage = () => {
  const [todos, setTodos] = useState<Array<{ id: string; text: string; tags: string[]; completed: boolean }>>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now().toString(), text, tags: ['태그A', '태그B', '태그C'], completed: false }]);
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
          <InputWithButton
            placeholder="Add a new task"
            buttonText="Add"
            onSubmit={addTodo}
          />
          <TodoList
            todoItems={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </>
      }
    />
  );
};
