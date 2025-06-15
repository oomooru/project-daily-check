import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TodoResetTime } from "../../interface/TodoInterface";
import { colors } from "../../constants/Colors";

interface TimePickerProps {
  currentResetTime: TodoResetTime;
  onTimeChange: (resetTime: TodoResetTime) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  currentResetTime,
  onTimeChange
}) => {

  const handleTimeChange = (resetTime: TodoResetTime) => {
    onTimeChange(resetTime);
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={currentResetTime.hour}
          onValueChange={(itemValue) => handleTimeChange({hour: itemValue, minute: currentResetTime.minute})}
          mode="dropdown"
        >
          {Array.from({ length: 24 }, (_, i) => (
            <Picker.Item key={i} label={`${i}`} value={i} color={colors.primary} />
          ))}
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={currentResetTime.minute}
          onValueChange={(itemValue) => handleTimeChange({hour: currentResetTime.hour, minute: itemValue})}
          mode="dropdown"
        >
          {Array.from({ length: 60 }, (_, i) => (
            <Picker.Item key={i} label={`${i.toString().padStart(2, '0')}`} value={i} color={colors.primary} />
          ))}
        </Picker>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  picker: {
    width: '50%',
    marginBottom: 16,
  }
});
