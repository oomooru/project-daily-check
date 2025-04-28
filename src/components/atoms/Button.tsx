import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  ActivityIndicator
} from 'react-native';
import { colors } from '../../constants/Colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle
}) => {

  const buttonStyles = StyleSheet.create({
    primary: {
      backgroundColor: disabled ? colors.secondary : colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    secondary: {
      backgroundColor: disabled ? '#cccccc' : '#34C759',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: disabled ? '#cccccc' : '#007AFF',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    }
  });

  const textStyles = StyleSheet.create({
    primary: {
      color: colors.textBlack,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    secondary: {
      color: colors.textWhite,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    outline: {
      color: disabled ? '#cccccc' : '#007AFF',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    }
  });

  return (
    <TouchableOpacity
      style={[buttonStyles[variant], style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={
            variant === 'outline' 
              ? (disabled ? '#cccccc' : '#007AFF') 
              : '#FFFFFF'
          } 
        />
      ) : (
        <Text style={[textStyles[variant], textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};