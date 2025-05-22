import React, { useEffect, useState } from 'react';
import { MainTemplate } from '../templates/MainTemplate';
import { TodoList } from '../organisms/TodoList';
import { TodoComposer } from '../organisms/TodoComposer';
import SvgIcon from '../atoms/SvgIcon';
import { TodoData } from '../../interface/TodoInterface';
import { loadTodoData, saveTodoData } from '../../system/AsyncStorage';

export const MainPage = () => {
  const [todos, setTodos] = useState<Array<TodoData>>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>();

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
    setTodos(todos.filter(todo => todo.id !== id));4
  };

  useEffect(() => {
    if (isInitialized) {
      saveTodoData(todos);
    }
  }, [todos]);

  useEffect(() => {
    const fetchTodoData = async () => {
      const loadedTodoData = await loadTodoData();
      setTodos(loadedTodoData);
      setIsInitialized(true);
    }
  
    fetchTodoData();
  }, []);

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
