import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../atoms/Text";
import { colors } from "../../constants/Colors";
import SvgIcon from "../atoms/SvgIcon";
import { TagBox } from "../atoms/TagBox";

interface TodoItemProps {
  text: string;
  completed: boolean;
  tags: string[];
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  text,
  completed,
  tags,
  onToggle,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <View style={{ paddingRight: 8 }}>
          <SvgIcon
            name="IconClock"
            width={24}
            height={24}
            color={colors.textWhite}
          />
        </View>

        <Text
          variant="title"
          style={completed ? styles.completedText : styles.text}
        >
          {text}
        </Text>

        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteText}>×</Text>
        </TouchableOpacity>
      </View>

      <TagBox tags={tags} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginHorizontal: 16,
    marginVertical: 8,
    //padding: 8,
    paddingBottom: 4,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  textBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    width: "100%",
    padding: 8,
    marginBottom: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: colors.secondary,
  },
  text: {
    flex: 1,
    paddingVertical: 2,
    color: colors.textWhite,
  },
  completedText: {
    flex: 1,
    textDecorationLine: "line-through",
    color: colors.secondary,
  },
  deleteText: {
    fontSize: 20,
    color: colors.textWhite,
  },
});
