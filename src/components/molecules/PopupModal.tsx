import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../constants/Colors";
import { Text } from "../atoms/Text";

interface PopupModalProps {
  modalVisible: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export const PopupModal: React.FC<PopupModalProps> = ({
  modalVisible,
  onClose,
  title,
  content,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={[
            styles.modalBackground,
            { backgroundColor: "rgba(0, 0, 0, 0.4)" },
          ]}
        />
      </TouchableWithoutFeedback>

      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalTitleBox}>
            <Text variant={'title'} style={styles.modalTitleText}>{title}</Text>
          </View>
          <View style={{padding: 16, gap: 8}}>
            {content}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.background,
    borderColor: colors.secondary,
    borderWidth: 2,
    borderRadius: 8,
    zIndex: 1,
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  modalTitleBox: {
    alignItems: "center",
    width: "100%",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.secondary,
    padding: 4
  },
  modalTitleText: {
    fontSize: 20,
    color: colors.textWhite,
    paddingVertical: 8,
    marginBottom: 4
  }
});
