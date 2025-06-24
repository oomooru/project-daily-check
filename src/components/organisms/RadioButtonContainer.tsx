import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RadioButton from '../molecules/RadioButton';
import * as Icons from '../../../assets/images/index';

export interface RadioOption {
  label: string;
  icon: keyof typeof Icons;
  value: string;
}

interface RadioButtonContainerProps {
  options: RadioOption[];
  defaultValue?: string;
  onValueChange: (newValue: string) => void;
}

const RadioButtonContainer = ({ options, defaultValue, onValueChange }: RadioButtonContainerProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handlePress = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange(newValue);
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          icon={option.icon}
          label={option.label}
          value={option.value}
          isSelected={selectedValue === option.value}
          onPress={handlePress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 8
  }
});

export default RadioButtonContainer;