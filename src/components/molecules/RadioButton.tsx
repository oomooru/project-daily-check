import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { RadioCircle } from '../atoms/Radio';
import { Text } from '../atoms/Text';
import { colors } from '../../constants/Colors';
import * as Icons from '../../../assets/images/index';
import SvgIcon from '../atoms/SvgIcon';

interface RadioButtonProps {
  label: string;
  icon: keyof typeof Icons;
  value: string;
  isSelected: boolean;
  onPress: (value: string) => void;
}

const RadioButton = ({ label, icon, value, isSelected, onPress }: RadioButtonProps) => {
  return (
    <TouchableOpacity style={styles.option} onPress={() => onPress(value)}>
      <RadioCircle isSelected={isSelected} />
      <View style={{marginRight: 4}}>
        <SvgIcon name={icon} width={20} height={20} color={colors.textWhite} strokeWidth={2} stroke={colors.textWhite} />
      </View>
      <Text variant='body' style={{color: colors.textWhite}}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default React.memo(RadioButton);