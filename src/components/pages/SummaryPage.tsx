import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SummaryTemplate } from '../templates/SummaryTemplate';
import { TodoComposer } from '../organisms/TodoComposer';
import SvgIcon from '../atoms/SvgIcon';
import { TodoData } from '../../interface/TodoInterface';
import TodoManager from '../../manager/TodoManager';
import { colors, interpolateColor } from '../../constants/Colors';
import { Text } from '../atoms/Text';
import { BarChartItem } from '../molecules/BarChartItem';

export const SummaryPage = () => {
  const [todos, setTodos] = useState<Array<TodoData>>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>();
  const [chartData, setChartData] = useState<Record<string, unknown>[]>([]);
  const [maxChartValue, setMaxChartValue] = useState<number>(0);

  useFocusEffect(useCallback(() => {
    const datas = TodoManager.getCompleteTagsChartData();
    datas.forEach((data, index) => {data.color = interpolateColor(colors.primary, colors.secondary, index / datas.length)});
    setChartData(datas);
  }, []));

  useEffect(() => {
    if (!chartData || chartData.length === 0) return;

    setMaxChartValue(chartData.reduce((prev, current) => (
      prev.value as number) > (current.value as number) ? prev : current
    ).value as number);
  }, [chartData])

  return (
    <SummaryTemplate
      header={
        <SvgIcon name="Logo" width={184} height={33} />
      }
      content={
        <>
          <View style={styles.container}>
            <ScrollView style={styles.completeChartBox}>

              <View style={styles.completeChartList} key={'completeChartList'}>

                <View style={styles.completeChartTitleBox} key={'completeChartTitleBox'}>
                  <Text style={styles.completeChartTitle} variant='title'>{'완료된 태그'}</Text>
                </View>

                <View style={styles.chartItemBox}>
                  {chartData?.map((data, index) => (
                    <BarChartItem 
                      key={`summaryPage-listItem-${index}`}
                      maxValue={maxChartValue} 
                      targetValue={data.value as number}
                      text={data.label as string}
                    />
                  ))}
                </View>
              </View>

            </ScrollView>
          </View>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  completeChartCanvas: {
    width: '100%',
  },
  completeChartBox: {
    height: '100%',
  },
  completeChartList: {
    alignItems: 'center',
    margin: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  completeChartTitleBox: {
    alignItems: 'center',
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.secondary,
    marginBottom: 16    
  },
  completeChartTitle: {
    flex: 1,
    fontSize: 20,
    color: colors.textWhite,
    paddingVertical: 8
  },
  chartItemBox: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16
  }
});
