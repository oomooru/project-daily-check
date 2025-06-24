import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import Reanimated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import Swipeable, { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import * as Haptics from "expo-haptics";
import { TodoItem } from "../molecules/TodoItem";
import { colors } from "../../constants/Colors";
import SvgIcon from "../atoms/SvgIcon";
import { TodoData } from "../../interface/TodoInterface";

interface TodoListProps {
  todoItems: TodoData[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (editItem: TodoData) => void;
}

const triggerHaptic = async () => {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch (error) {
    console.warn("Haptic error:", error);
  }
};

function LeftAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  onPress: () => void
) {
  const styleAnimation = useAnimatedStyle(() => {
    const width = Math.max(Math.min(Math.abs(drag.value), 150), 80);

    return {
      transform: [{ translateX: drag.value - width }],
      width: width,
    };
  });

  return (
    <Reanimated.View style={[styleAnimation, styles.leftActionContainer]}>
      <Pressable style={styles.leftAction} onPress={onPress}>
        <SvgIcon
          name="Delete"
          width={32}
          height={32}
          color={colors.textWhite}
        />
      </Pressable>
    </Reanimated.View>
  );
}

function RightAction(
  prog: SharedValue<number>, 
  drag: SharedValue<number>,
  onPress: () => void
) {
  const styleAnimation = useAnimatedStyle(() => {
    const width = Math.max(Math.min(Math.abs(drag.value), 150), 80);

    return {
      transform: [{ translateX: drag.value + width }],
      width: width,
    };
  });

  return (
    <Reanimated.View style={[styleAnimation, styles.rightActionContainer]}>
      <Pressable style={styles.rightAction} onPress={onPress}>
        <SvgIcon
          name="TaskEdit"
          width={32}
          height={32}
          color={colors.textBlack}
        />
      </Pressable>
    </Reanimated.View>
  );
}

export const TodoList: React.FC<TodoListProps> = ({
  todoItems,
  onToggle,
  onDelete,
  onEdit
}) => {

  const swipeableRefs = useRef<{[key: string]: SwipeableMethods | null}>({});

  const handleSwipeableOpen = (id: string) => {
    Object.entries(swipeableRefs.current).forEach(([itemId, ref]) => {
      if (itemId !== id && ref) {
        ref.close();
      }
    });
  };

  return (
    <ScrollView style={{ paddingVertical: 8 }}>
      {todoItems.map((item) => (
        <Swipeable
          key={item.id}
          ref={(ref) => {swipeableRefs.current[item.id] = ref}}
          onSwipeableWillOpen={() => handleSwipeableOpen(item.id)}
          rightThreshold={40}
          renderRightActions={(prog, drag) =>
            RightAction(prog, drag, () => onEdit(item))
          }
          leftThreshold={40}
          renderLeftActions={(prog, drag) =>
            LeftAction(prog, drag, () => onDelete(item.id))
          }
          overshootFriction={6}
        >
          <TodoItem
            key={`todoitem-${item.id}`}
            type={item.type}
            text={item.text}
            completed={item.completed}
            tags={item.tags}
            onToggle={() => onToggle(item.id)}
          />
        </Swipeable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: colors.delete,
  },
  rightActionContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
    backgroundColor: colors.edit,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightAction: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  leftActionContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
    backgroundColor: colors.delete,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  leftAction: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
