import React, { useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SummaryTemplate } from "../templates/SummaryTemplate";
import SvgIcon from "../atoms/SvgIcon";
import { colors } from "../../constants/Colors";
import { Card } from "../molecules/Card";
import { LanguageSelector } from "../molecules/LanguageSelector";
import { useLanguage } from "../../context/LanguageContext";
import { Text } from "../atoms/Text";
import { TodoDeleteButton } from "../molecules/TodoDeleteButton";

export const ConfigPage = () => {
  const { t } = useLanguage();

  useFocusEffect(
    useCallback(() => {

    }, [])
  );

  useEffect(() => {

  }, []);

  return (
    <SummaryTemplate
      header={<SvgIcon name="Logo" width={184} height={33} />}
      content={
        <View style={styles.container}>
          <ScrollView style={styles.scroll}>
            <Card
              title={t('displayLanguage')}
              content={
                <LanguageSelector />
              }
            />
            <Card
              title={t('todoDelete')}
              content={
                <TodoDeleteButton />
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
  }
});
