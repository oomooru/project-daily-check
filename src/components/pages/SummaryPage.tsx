import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SummaryTemplate } from "../templates/SummaryTemplate";
import { TodoComposer } from "../organisms/TodoComposer";
import SvgIcon from "../atoms/SvgIcon";
import { TodoData } from "../../interface/TodoInterface";
import TodoManager from "../../manager/TodoManager";
import { colors, interpolateColor } from "../../constants/Colors";
import { Text } from "../atoms/Text";
import { BarChartItem } from "../molecules/BarChartItem";

export const SummaryPage = () => {
  const [todos, setTodos] = useState<Array<TodoData>>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>();
  const [chartData, setChartData] = useState<Record<string, unknown>[]>([]);
  const [maxChartValue, setMaxChartValue] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      const datas = TodoManager.getCompleteTagsChartData();
      datas.forEach((data, index) => {
        data.color = interpolateColor(
          colors.primary,
          colors.secondary,
          index / datas.length
        );
      });
      setChartData(datas);
    }, [])
  );

  useEffect(() => {
    if (!chartData || chartData.length === 0) return;

    setMaxChartValue(
      chartData.reduce((prev, current) =>
        (prev.value as number) > (current.value as number) ? prev : current
      ).value as number
    );
  }, [chartData]);

  interface SummaryCardProps {
    title: string;
    content: React.ReactNode;
  }

  const SummaryCard: React.FC<SummaryCardProps> = ({ title, content }) => {
    return (
      <View style={styles.summaryCardContainer}>
        <View
          style={styles.summaryCardTextBox}
        >
          <Text style={styles.summaryCardTitleText} variant="title">
            {title}
          </Text>
        </View>

        <View style={styles.summaryCardContentBox}>{content}</View>
      </View>
    );
  };

  return (
    <SummaryTemplate
      header={<SvgIcon name="Logo" width={184} height={33} />}
      content={
        <>
          <View style={styles.container}>
            <ScrollView style={styles.completeChartBox}>

              <SummaryCard 
                title="현재 연속 완료일"
                content={
                  <>
                    <Text style={styles.summaryCardContentText}>{`${TodoManager.getConsecutiveDays()}일 달성`}</Text>
                  </>
                }
              />

              <SummaryCard
                title="완료된 태그"
                content={
                  <>
                    {!chartData || chartData.length === 0 && (
                      <Text style={styles.summaryCardContentText}>{'완료된 일과가 없습니다'}</Text>
                    )}
                    {chartData?.map((data, index) => (
                      <BarChartItem
                        key={`summaryPage-listItem-${index}`}
                        maxValue={maxChartValue}
                        targetValue={data.value as number}
                        text={data.label as string}
                      />
                    ))}
                  </>
                }
              />

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
    width: "100%",
  },
  completeChartBox: {
    height: "100%",
  },
  summaryCardContainer: {
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  summaryCardTextBox: {
    alignItems: "center",
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.secondary,
    marginBottom: 16,
  },
  summaryCardTitleText: {
    flex: 1,
    fontSize: 20,
    color: colors.textWhite,
    paddingVertical: 8,
  },
  summaryCardContentBox: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  summaryCardContentText: {
    width: '100%',
    textAlign: 'center',
    color: colors.textWhite,
    marginBottom: 16,
    fontSize: 20
  }
});
