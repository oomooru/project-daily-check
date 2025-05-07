import React from 'react';
import { FlatList } from 'react-native';
import { TodoItem } from '../molecules/TodoItem';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

interface TodoItem {
  id: string;
  text: string;
  tags: string[];
  completed: boolean;
}

interface TodoListProps {
  todoItems: TodoItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const SwipeableItem = ({
  item,
  onSwipeComplete,
  onDelete
}: {
  item: TodoItem;
  onSwipeComplete: () => void;
  onDelete: () => void;
}) => {
  const translateX = useSharedValue(0);
  const MAX_SWIPE = 300;
  const COMPLETE_THRESHOLD = 100;

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationX > 0) {
        translateX.value = Math.min(e.translationX, MAX_SWIPE);
      }
    })
    .onEnd((e) => {
      if (e.translationX > COMPLETE_THRESHOLD) {
        translateX.value = withTiming(MAX_SWIPE * 1.5, { duration: 200 }, (finished) => {
          if (finished) runOnJS(onSwipeComplete)();
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: 1 - translateX.value / MAX_SWIPE
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle}>
        <TodoItem
          key={`todoitem-${item.id}`}
          text={item.text}
          completed={item.completed}
          tags={['ReactNative', 'TypeScript', 'ExpoCLI', '개발', 'Todo']}
          onDelete={onDelete}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export const TodoList: React.FC<TodoListProps> = ({ 
  todoItems,
  onToggle,
  onDelete
}) => {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <FlatList
        data={todoItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SwipeableItem
            item={item}
            onSwipeComplete={() => onDelete(item.id)} 
            onDelete={() => onDelete(item.id)}/>
        )}
      />
    </GestureHandlerRootView>
)};
