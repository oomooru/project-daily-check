import React from "react";
import { StyleSheet, View } from "react-native";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  Pressable,
  ScrollView,
} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import * as Haptics from "expo-haptics";
import { TodoItem } from "../molecules/TodoItem";
import { colors } from "../../constants/Colors";
import SvgIcon from "../atoms/SvgIcon";

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

function LeftAction(prog: SharedValue<number>, drag: SharedValue<number>)
{
  const styleAnimation = useAnimatedStyle(() => {
    const width = Math.max(Math.min(Math.abs(drag.value), 150), 50);

    return {
      transform: [{ translateX: drag.value - width }],
      width: width
    }
  });

  return (
    <Reanimated.View style={[styleAnimation, styles.leftActionContainer]}>
      <Pressable style={styles.leftAction}>
        <SvgIcon name="Delete" width={32} height={32} color={colors.textWhite} />
      </Pressable>
    </Reanimated.View>
  );
}

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
      <Pressable style={styles.rightAction}>
        <SvgIcon name="TaskEdit" width={32} height={32} color={colors.textWhite} />
      </Pressable>
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
          leftThreshold={40}
          renderLeftActions={LeftAction}
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
    backgroundColor: colors.edit,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  leftActionContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
    backgroundColor: colors.delete,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  leftAction: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
});