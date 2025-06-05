import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../constants/Colors";
import { Text } from "../atoms/Text";
import SvgIcon from "../atoms/SvgIcon";
import TodoManager from "../../manager/TodoManager";
import { PopupModal } from "../molecules/PopupModal";

export const TodoDeleteButton = () => {
  const { t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const deleteData = () => {
    TodoManager.deleteAllTodoDateData();
    hideModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showModal}>
        <SvgIcon
          name="Delete"
          width={32}
          height={32}
          color={colors.textWhite}
        />
      </TouchableOpacity>

      <PopupModal
        modalVisible={modalVisible}
        onClose={hideModal}
        title={t('todoDelete')}
        content={
          <>
            <Text style={styles.deleteConfirmationText} variant="body">
              {t("deleteConfirmation")}
            </Text>

            <View style={styles.buttonBox}>
              <TouchableOpacity
                style={styles.cancelButtonBox}
                onPress={hideModal}
              >
                <Text style={styles.cancelButtonText} variant="body">
                  {t("cancel")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButtonBox} onPress={deleteData}>
                <SvgIcon
                  name="Delete"
                  width={32}
                  height={32}
                  color={colors.textWhite}
                />
              </TouchableOpacity>
            </View>
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
    backgroundColor: colors.delete,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  todoDeleteButton: {
    width: "100%",
    backgroundColor: colors.delete,
    borderRadius: 8,
  },
  deleteConfirmationText: {
    color: colors.textWhite,
    marginBottom: 16,
  },
  buttonBox: {
    alignSelf: "flex-end",
    flexDirection: "row",
    gap: 8,
  },
  cancelButtonBox: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: colors.textWhite,
    fontWeight: "bold",
  },
  deleteButtonBox: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.delete,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  }
});
