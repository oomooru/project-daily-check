import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from '../atoms/Button';

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
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginRight: 8
  }
});