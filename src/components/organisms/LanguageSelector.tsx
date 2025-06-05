import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors } from "../../constants/Colors";
import { Text } from "../atoms/Text";
import { useLanguage } from "../../context/LanguageContext";
import { PopupModal } from "../molecules/PopupModal";

const languages = [
  { code: "en", name: "English" },
  { code: "ko", name: "한국어" },
  { code: "ja", name: "日本語" },
];

export const LanguageSelector = () => {
  const { setLanguage, t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  const changeLanguage = (code: string) => {
    setLanguage(code);
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showModal}>
        <Text style={styles.buttonText}>{t("selectedLanguage")}</Text>
      </TouchableOpacity>

      <PopupModal
        modalVisible={modalVisible}
        onClose={hideModal}
        title={t('displayLanguage')}
        content={
          <>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={styles.languageItem}
                onPress={() => changeLanguage(lang.code)}
              >
                <Text style={styles.languageText}>{lang.name}</Text>
              </TouchableOpacity>
            ))}
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  button: {
    padding: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: colors.textBlack,
    fontWeight: "bold",
    textAlign: "center",
  },
  languageItem: {
    paddingVertical: 16,
    backgroundColor: colors.primary,
    borderRadius: 8
  },
  languageText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.textBlack,
  },
});
