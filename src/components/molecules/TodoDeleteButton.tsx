import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../constants/Colors";
import { Text } from "../atoms/Text";
import SvgIcon from "../atoms/SvgIcon";
import TodoManager from "../../manager/TodoManager";

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
  }

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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View
            style={[
              styles.modalBackground,
              { backgroundColor: "rgba(0, 0, 0, 0.4)" },
            ]}
          />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.deleteConfirmationText} variant="body">{t('deleteConfirmation')}</Text>
            
            <View style={styles.deleteButtonBox}>
              <TouchableOpacity style={styles.cancelButtonBox} onPress={hideModal}>
                <Text style={styles.cancelButtonText} variant="body">{t('cancel')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={deleteData}>
                <SvgIcon 
                  name="Delete" 
                  width={32} 
                  height={32} 
                  color={colors.textWhite}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  todoDeleteButton: {
    width: "100%",
    backgroundColor: colors.delete,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.background,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 8,
    padding: 16,
    zIndex: 1,
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  deleteConfirmationText: {
    color: colors.textWhite,
    marginBottom: 16
  },
  deleteButtonBox: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: 8
  },
  cancelButtonBox: {
    padding: 16,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelButtonText: {
    color: colors.textWhite,
    fontWeight: 'bold'
  }
});
