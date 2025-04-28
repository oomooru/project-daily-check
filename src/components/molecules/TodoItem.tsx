import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from '../atoms/Checkbox';
import { Text } from '../atoms/Text';
import { colors } from '../../constants/Colors';

interface TodoItemProps {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ 
  text, 
  completed, 
  onToggle, 
  onDelete 
}) => (
  <View style={styles.container}>
    <Checkbox checked={completed} onToggle={onToggle} />
    <Text variant="body" style={completed ? styles.completedText : styles.text}>
      {text}
    </Text>
    <TouchableOpacity onPress={onDelete}>
      <Text style={styles.deleteText}>×</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  text: {
    flex: 1,
    marginLeft: 12,
    color: colors.textWhite,
  },
  completedText: {
    flex: 1,
    textDecorationLine: 'line-through',
    color: colors.secondary,
    marginLeft: 12
  },
  deleteText: {
    fontSize: 24,
    color: colors.primary,
    marginLeft: 12
  }
});