import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';

interface TextProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: 'title' | 'body' | 'caption';
}

export const Text: React.FC<TextProps> = ({ 
  children, 
  style, 
  variant = 'body' 
}) => {
  const variantStyles = {
    title: { textAlign: 'center', fontSize: 24, fontWeight: 'bold' },
    body: { fontSize: 16 },
    caption: { fontSize: 12, color: '#666' }
  };

  return <RNText style={[variantStyles[variant], style]}>{children}</RNText>;
};