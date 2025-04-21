import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

export default function App() {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = () => {
    if (todoText.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: todoText,
          completed: false,
        },
      ]);
      setTodoText('');
    }
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
    <SafeAreaProvider>
      <SafeAreaView style={[styles.safeArea, Platform.OS === 'android' && styles.androidSafeArea]}>
        <View style={styles.container}>

          <Text style={styles.title}>Daily Check!</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a new task"
              value={todoText}
              onChangeText={setTodoText}
            />
            <Button title="Add" onPress={addTodo} />
          </View>

          <FlatList
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.todoItem, item.completed && styles.completedTodo]}
                onPress={() => toggleTodo(item.id)}
                onLongPress={() => deleteTodo(item.id)}
              >
                <Text style={styles.todoText}>{item.text}</Text>
                <Text>{item.completed ? '✓' : ''}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  androidSafeArea: {
    paddingTop: StatusBar.currentHeight, // Android 상태 표시줄 높이만큼 패딩 추가
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  completedTodo: {
    backgroundColor: '#e0e0e0',
  },
  todoText: {
    fontSize: 16,
  },
});
