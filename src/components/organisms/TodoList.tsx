import React from "react";
import { StyleSheet, View } from "react-native";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  ScrollView,
} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import * as Haptics from "expo-haptics";
import { TodoItem } from "../molecules/TodoItem";
import { Text } from "../atoms/Text";
import { colors } from "../../constants/Colors";

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

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {

    const width = Math.max(Math.min(Math.abs(drag.value), 150), 50);

    return {
      transform: [{ translateX: drag.value + width }],
      width: width
    };
  });

  return (
    <Reanimated.View style={[styleAnimation, styles.rightActionContainer]}>
      <View style={styles.rightAction}>
        <Text>{'삭제'}</Text>
      </View>
    </Reanimated.View>
  );
}

export const TodoList: React.FC<TodoListProps> = ({
  todoItems,
  onToggle,
  onDelete,
}) => {
  return (
    <ScrollView>
      {todoItems.map((item) => (
        <Swipeable
          key={item.id}
          rightThreshold={40}
          renderRightActions={RightAction}
          overshootFriction={6}
        >
          <TodoItem
            key={`todoitem-${item.id}`}
            text={item.text}
            completed={item.completed}
            tags={item.tags}
            onToggle={() => onToggle(item.id)}
            onDelete={() => onDelete(item.id)}
          />
        </Swipeable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rightActionContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
    backgroundColor: colors.delete,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});