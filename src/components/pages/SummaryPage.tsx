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
import { Text } from '../atoms/Text';

export const SummaryPage = () => {
  const [todos, setTodos] = useState<Array<TodoData>>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>();
  const [chartData, setChartData] = useState<Record<string, unknown>[]>([]);
  const [firstRankText, setFirstRankText] = useState<string>();
  const [secondRankText, setSecondRankText] = useState<string>();

  useFocusEffect(useCallback(() => {
    const datas = TodoManager.getCompleteTagsChartData();
    datas.forEach((data, index) => {data.color = interpolateColor(colors.primary, colors.secondary, index / datas.length)});
    setChartData(datas);
  }, []));

  useEffect(() => {
    //getDataRankString();
  }, [chartData])

  function getDataRankString() {
    const firstValidData = chartData.filter((data): data is {value: number} => typeof data.value === 'number')
    const firstValue = firstValidData.reduce((prev, current) => prev.value > current.value ? prev : current);
    const firstRankString = chartData.filter((data) => data.value == firstValue).map((item) => `#${item.label as string}`);
    setFirstRankText(firstRankString.join(' '));
  }

  return (
    <SummaryTemplate
      header={
        <SvgIcon name="Logo" width={184} height={33} />
      }
      content={
        <>
          <View style={styles.container}>
            <View style={styles.completeChartBox}>
              <PolarChart
                data={chartData}
                labelKey={'label' as never}
                valueKey={'value' as never}
                colorKey={'color' as never}
                canvasStyle={styles.completeChartCanvas}
              >
                <Pie.Chart 
                  innerRadius={'75%'}
                  startAngle={270}
                  size={350}
                />
              </PolarChart>

              <View style={styles.completeChartTextBox}>
                {chartData.length > 0 && (<Text style={styles.completeChartText1st}>{`1st #${chartData[0].label as string}`}</Text>)}
                {chartData.length > 1 && (<Text style={styles.completeChartText2nd}>{`2nd #${chartData[1].label as string}`}</Text>)}
                {chartData.length > 2 && (<Text style={styles.completeChartText3rd}>{`3rd #${chartData[2].label as string}`}</Text>)}
              </View>
            </View>
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
    justifyContent: 'center'
  },
  completeChartTextBox: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  completeChartText1st: {
    color: colors.textWhite,
    fontSize: 22,
    fontWeight: 'bold'
  },
  completeChartText2nd: {
    color: colors.textWhite,
    fontSize: 18,
  },
  completeChartText3rd: {
    color: colors.textWhite,
    fontSize: 14,
  }
});
