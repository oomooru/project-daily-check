import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SummaryTemplate } from "../templates/SummaryTemplate";
import SvgIcon from "../atoms/SvgIcon";
import TodoManager from "../../manager/TodoManager";
import { colors, interpolateColor } from "../../constants/Colors";
import { Text } from "../atoms/Text";
import { BarChartItem } from "../molecules/BarChartItem";
import { Card } from "../molecules/Card";
import { useLanguage } from "../../context/LanguageContext";

export const SummaryPage = () => {
  const { t } = useLanguage();
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

  return (
    <SummaryTemplate
      header={<SvgIcon name="Logo" width={184} height={33} />}
      content={
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>
            <Card
              title={t("summaryCurrentStreakTitle")}
              content={
                <>
                  <Text
                    style={styles.summaryCardContentText}
                  >{t("summaryCurrentStreakDescription", {count: TodoManager.getConsecutiveDays()})}</Text>
                </>
              }
            />

            <Card
              title={t("summaryCompletionLateTitle")}
              content={
                <>
                  <Text
                    style={styles.summaryCardContentText}
                  >{`${TodoManager.getAllCompletedTodosCount()} / ${TodoManager.getAllTodosCount()}`}</Text>
                </>
              }
            />

            <Card
              title={t("summaryCompletedTagsTitle")}
              content={
                <>
                  {!chartData ||
                    (chartData.length === 0 && (
                      <Text style={styles.summaryCardContentText}>
                        {t("summaryCompletedTagsNoData")}
                      </Text>
                    ))}
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
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    height: "100%",
  },
  summaryCardContentText: {
    width: "100%",
    textAlign: "center",
    color: colors.textWhite,
    marginBottom: 16,
    fontSize: 20,
  },
});
