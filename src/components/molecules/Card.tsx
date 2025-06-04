import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../constants/Colors";
import { Text } from "../atoms/Text";

interface CardProps {
  title: string;
  content: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardTextBox}>
        <Text style={styles.cardTitleText} variant="title">
          {title}
        </Text>
      </View>

      <View style={styles.cardContentBox}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  cardTextBox: {
    alignItems: "center",
    width: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.secondary,
    marginBottom: 16,
  },
  cardTitleText: {
    flex: 1,
    fontSize: 20,
    color: colors.textWhite,
    paddingVertical: 8,
  },
  cardContentBox: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});
