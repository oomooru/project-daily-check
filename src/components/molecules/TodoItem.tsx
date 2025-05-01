import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from '../atoms/Checkbox';
import { Text } from '../atoms/Text';
import { colors } from '../../constants/Colors';
import SvgIcon from '../atoms/SvgIcon';

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
  onDelete 
}) => (
  <View style={styles.container}>

    {/*<Checkbox checked={completed} onToggle={onToggle} />*/}

    <View style={styles.textBox}>
      <Text variant="body" style={completed ? styles.completedText : styles.text}>
        {text}
      </Text>
    </View>

    <View style={styles.tagBox}>
      <View style={{marginRight: 4, marginBottom: 4, justifyContent: 'center'}}>
        <SvgIcon name='IconClock' width={24} height={24} />
      </View>

      {tags.map((item, index) => (
        <View key={index} style={styles.tag}>
          <Text 
            variant="body" 
            style={{textAlign: 'center', color: colors.textWhite}}
          >
            {'#' + item}
          </Text>
        </View>
      ))}

      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>    

  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
    paddingBottom: 4,
    backgroundColor: colors.primary,
    borderRadius: 16,
  },
  textBox: {
    flex: 1,
    width: '100%',
    padding: 8,
    marginBottom: 8,
    backgroundColor: colors.secondary,
    borderRadius: 8
  },
  tagBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    flex: 1,
    textAlign: 'center',
    color: colors.textWhite
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
    backgroundColor: colors.secondary,
    borderRadius: 8
  },
  completedText: {
    flex: 1,
    textDecorationLine: 'line-through',
    color: colors.secondary,
    marginLeft: 12
  },
  deleteText: {
    fontSize: 24,
    color: colors.secondary
  }
});