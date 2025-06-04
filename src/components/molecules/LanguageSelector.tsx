import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../constants/Colors";
import { Text } from "../atoms/Text";
import { useLanguage } from "../../context/LanguageContext";

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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={[styles.modalBackground, {backgroundColor: 'rgba(0, 0, 0, 0.4)'}]} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={styles.languageItem}
                onPress={() => changeLanguage(lang.code)}
              >
                <Text style={styles.languageText}>{lang.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    zIndex: 1,
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  languageItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  languageText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.textBlack,
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
});
