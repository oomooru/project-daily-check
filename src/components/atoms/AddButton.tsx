import React from 'react';
import { StyleSheet, ViewStyle, Pressable } from 'react-native';
import SvgIcon from './SvgIcon';
import { colors } from '../../constants/Colors';

interface AddButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

const AddButton: React.FC<AddButtonProps> = ({ onPress, style }) => {
  return (
    <Pressable 
      style={[styles.container, style]}
      onPress={onPress}
    >
      
      <SvgIcon
        name='Plus'
        width={40}
        height={40}
        color={colors.textBlack}
      />
        
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default AddButton;