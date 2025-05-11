import React from "react";
import { FlatList } from "react-native";
import { TodoItem } from "../molecules/TodoItem";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  LinearTransition,
  SlideInRight,
  FadeOut,
  Easing,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

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

const triggerHaptic = async () => {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch (error) {
    console.warn("Haptic error:", error);
  }
};

const SwipeableItem = ({
  item,
  onSwipeComplete,
  onDelete,
}: {
  item: TodoItem;
  onSwipeComplete: () => void;
  onDelete: () => void;
}) => {
  const translateX = useSharedValue(0);
  const MAX_SWIPE = 50;
  const COMPLETE_THRESHOLD = 50;

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationX > 0) {
        translateX.value = Math.min(e.translationX, MAX_SWIPE);
      }
    })
    .onEnd((e) => {
      if (e.translationX > COMPLETE_THRESHOLD) {
        runOnJS(triggerHaptic)();

        translateX.value = withSpring(MAX_SWIPE, { duration: 200 }, () => {
          runOnJS(onSwipeComplete)();

          translateX.value = withSpring(0, { duration: 300 });
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle}>
        <TodoItem
          key={`todoitem-${item.id}`}
          text={item.text}
          completed={item.completed}
          tags={["ReactNative", "TypeScript", "ExpoCLI", "개발", "Todo"]}
          onDelete={onDelete}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export const TodoList: React.FC<TodoListProps> = ({
  todoItems,
  onToggle,
  onDelete,
}) => {
  return (
    <Animated.FlatList
      data={todoItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Animated.View
          layout={LinearTransition.duration(200)}
          entering={SlideInRight.easing(Easing.back(1)).duration(200)}
          exiting={FadeOut}
        >
          <SwipeableItem
            item={item}
            onSwipeComplete={() => onToggle(item.id)}
            onDelete={() => onDelete(item.id)}
          />
        </Animated.View>
      )}
    />
  );
};
