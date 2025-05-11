import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import SvgIcon from './SvgIcon';
import { colors } from '../../constants/Colors';

interface FloatingButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={onPress}
    >
      
      <SvgIcon
        name='Plus'
        width={40}
        height={40}
        color={colors.textBlack}
      />
        
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
});

export default FloatingButton;