import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { MainTemplate } from '../templates/MainTemplate';
import { TodoList } from '../organisms/TodoList';
import { TodoComposer } from '../organisms/TodoComposer';
import SvgIcon from '../atoms/SvgIcon';
import { TodoData } from '../../interface/TodoInterface';
import TodoManager from '../../manager/TodoManager';
import { registerForPushNotificationsAsync, scheduleNotification } from '../../services/NotificationService';
import AddButton from '../atoms/AddButton';
import { Text } from '../atoms/Text';
import { useLanguage } from '../../context/LanguageContext';
import { View } from 'react-native';
import { colors } from '../../constants/Colors';

export const MainPage = () => {
  const { t } = useLanguage();

  const [todos, setTodos] = useState<Array<TodoData>>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>();
  const [composerState, setComposerState] = useState<{
    isVisible: boolean;
    mode: 'Add' | 'Edit';
    editingItem: TodoData | null;
  }>({
    isVisible: false,
    mode: 'Add',
    editingItem: null
  });

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

  const updateTodo = (updatedItem: TodoData) => {
    setTodos(todos.map(todo => 
      todo.id === updatedItem.id ? updatedItem : todo
    ));
  };

  const openAddMode = () => {
    setComposerState({
      isVisible: true,
      mode: 'Add',
      editingItem: null
    });
  }

  const openEditMode = (item: TodoData) => {
    setComposerState({
      isVisible: true,
      mode: 'Edit',
      editingItem: item
    });
  }

  const closeComposer = () => {
    setComposerState(prev => ({
      ...prev,
      isVisible: false
    }));
  }

  const handlePost = (text: string, tags: string[]) => {
    if (composerState.mode === 'Add') {
      addTodo(text, tags);
    } else if (composerState.mode === 'Edit' && composerState.editingItem) {
      updateTodo({
        ...composerState.editingItem,
        text,
        tags,
      });
    }
    closeComposer();
  };

  useEffect(() => {
    if (isInitialized) {
      TodoManager.saveTodoData(TodoManager.getToday(), todos);
    }
  }, [todos]);

  useEffect(() => {
    const fetchTodoData = async () => {
      await TodoManager.initialize();
      setTodos(TodoManager.getTodosByDate(TodoManager.getToday()));
      setIsInitialized(true);
    }
  
    fetchTodoData();

    registerForPushNotificationsAsync();

    const notificationTime = TodoManager.getNotificationTime();
    scheduleNotification(notificationTime);
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      setTodos(TodoManager.getTodosByDate(TodoManager.getToday()));
    }, [])
  );

  return (
    <MainTemplate
      header={
        <SvgIcon name="Logo" width={184} height={33} />
      }
      content={
        <>
          {todos.length === 0 && (
            <>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ alignSelf: 'center', marginBottom: 32 }}><SvgIcon name="Dog" width={160} height ={245} /></View>
              <Text style={{ color: colors.primary, textAlign: 'center' }}>{t("mainWelcomeText")}</Text>
            </View>
            </>
          )}

          {todos.length > 0 && (
            <TodoList
            todoItems={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={openEditMode}
          />
          )}

          <AddButton 
            style={{margin: 16, padding: 8}}
            onPress={openAddMode} 
          />

          <TodoComposer 
            onPost={handlePost}
            isVisible={composerState.isVisible}
            onClose={closeComposer}
            mode={composerState.mode}
            initialData={composerState.editingItem}
          />
        </>
      }
    />
  );
};
