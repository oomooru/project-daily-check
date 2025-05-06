import React from 'react';
import { Text as RNText, TextStyle, LayoutChangeEvent } from 'react-native';
import { colors } from '../../constants/Colors';

interface TextProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: 'title' | 'body' | 'caption';
  onLayout?: (event: LayoutChangeEvent) => void;
}

export const Text: React.FC<TextProps> = ({ 
  children, 
  style, 
  variant = 'body',
  onLayout
}) => {
  const variantStyles = {
    title: { textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: colors.primary },
    body: { fontSize: 16 },
    caption: { fontSize: 12, color: '#666' }
  };

  return (
    <RNText 
      style={[variantStyles[variant], style]}
      onLayout={onLayout}
    >
      {children}
    </RNText>
  );
};