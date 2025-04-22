import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onToggle }) => (
  <TouchableOpacity onPress={onToggle}>
    <View style={[styles.box, checked && styles.checked]}>
      {checked && <View style={styles.inner} />}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked: {
    borderColor: '#007AFF'
  },
  inner: {
    width: 12,
    height: 12,
    backgroundColor: '#007AFF',
    borderRadius: 2
  }
});