import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from '../atoms/AddButton';
import { colors } from '../../constants/Colors';

interface InputWithButtonProps {
  placeholder: string;
  buttonText: string;
  onSubmit: (text: string) => void;
}

export const InputWithButton: React.FC<InputWithButtonProps> = ({ 
  placeholder, 
  buttonText, 
  onSubmit 
}) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onSubmit(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.secondary}
        value={text}
        onChangeText={setText}
      />
      <Button 
        title={buttonText} 
        onPress={handleSubmit} 
        disabled={!text.trim()} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16
  },
  input: {
    flex: 1,
    color: colors.textWhite,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    padding: 12,
    marginRight: 8
  }
});