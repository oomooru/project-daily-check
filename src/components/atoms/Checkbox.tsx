import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors } from '../../constants/Colors';

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
    borderColor: colors.secondary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked: {
    borderColor: colors.primary,
  },
  inner: {
    width: 12,
    height: 12,
    backgroundColor: colors.primary,
    borderRadius: 2
  }
});