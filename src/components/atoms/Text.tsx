import React from "react";
import { Text as RNText, TextStyle, LayoutChangeEvent } from "react-native";
import { colors } from "../../constants/Colors";
import { useLanguage } from "../../context/LanguageContext";

interface TextProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: "title" | "body" | "caption";
  onLayout?: (event: LayoutChangeEvent) => void;
}

export const Text: React.FC<TextProps> = ({
  children,
  style,
  variant = "body",
  onLayout,
}) => {
  const { language } = useLanguage();

  const variantStyles = {
    title: { fontSize: 16, fontWeight: "bold" },
    body: { fontSize: 16 },
    caption: { fontSize: 12 },
  };

  return (
    <RNText
      style={[
        variantStyles[variant],
        style,
        { 
          fontFamily: language === "ja" ? "NotoSansKR" : "NotoSansJP",
          includeFontPadding: false,
          textAlignVertical: 'top',
        },
      ]}
      onLayout={onLayout}
    >
      {children}
    </RNText>
  );
};
