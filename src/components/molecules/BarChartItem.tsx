import React from "react";
import { StyleSheet, View } from "react-native";
import { GaugeBar } from "../atoms/GaugeBar";
import { Text } from "../atoms/Text";
import { colors } from "../../constants/Colors";

export const BarChartItem = ({maxValue, targetValue, text}: {
  maxValue: number,
  targetValue: number,
  text: string
}) => {

  const progress = targetValue / maxValue * 100;

  return (
    <View style={styles.constainer}>
      <View style={{width: '50%'}}>
        <Text style={styles.tagText}>{text}</Text>
      </View>
      
      <GaugeBar progress={progress} isBackgroundVisible={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    flexDirection: 'row',
  },
  tagText: {
    textAlign: 'right',
    fontSize: 16,
    color: colors.textWhite,
    marginTop: 3,
    marginRight: 8
  },
});
