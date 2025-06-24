import React from 'react';
import { View, Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { colors } from '../../constants/Colors';

interface RadioCircleProps {
  isSelected: boolean;
}

export const RadioCircle = React.memo(({ isSelected }: RadioCircleProps) => (
  <View style={styles.radioCircle}>
    {isSelected && <View style={styles.selectedRb} />}
  </View>
));

const styles = StyleSheet.create({
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  }
});