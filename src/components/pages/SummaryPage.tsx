import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Pie, PolarChart } from 'victory-native';
import { SummaryTemplate } from '../templates/SummaryTemplate';
import { TodoComposer } from '../organisms/TodoComposer';
import SvgIcon from '../atoms/SvgIcon';
import { TodoData } from '../../interface/TodoInterface';
import TodoManager from '../../manager/TodoManager';
import { colors, interpolateColor } from '../../constants/Colors';

export const SummaryPage = () => {
  const [todos, setTodos] = useState<Array<TodoData>>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>();
  const [chartData, setChartData] = useState<Record<string, unknown>[]>([]);

  useFocusEffect(useCallback(() => {
    const datas = TodoManager.getCompleteTagsChartData();
    datas.forEach((data, index) => {data.color = interpolateColor(colors.primary, colors.secondary, index / datas.length)});
  
    setChartData(datas);
  }, []));

  return (
    <SummaryTemplate
      header={
        <SvgIcon name="Logo" width={184} height={33} />
      }
      content={
        <>
          <View style={styles.container}>
            <PolarChart
              data={chartData}
              labelKey={'label' as never}
              valueKey={'value' as never}
              colorKey={'color' as never}
            >
              <Pie.Chart 
                innerRadius={'50%'}
                startAngle={270}
              />
            </PolarChart>
          </View>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  completeChartBox: {

  }
});
