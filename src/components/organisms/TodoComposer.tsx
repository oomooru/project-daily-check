import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/Colors";
import { Text } from "../atoms/Text";
import FloatingButton from "../atoms/FloatingButton";
import SvgIcon from "../atoms/SvgIcon";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAIN_HEADER_HEIGHT = 72;

interface TodoComposerProps {
  onPost: (text: string, tags: string[]) => void;
}

const Tag = ({ text, onRemove }: { text: string; onRemove?: () => void }) => (
  <View style={styles.tagContainer}>
    <Text style={styles.tagText}>#{text}</Text>
    {onRemove && (
      <Pressable onPress={onRemove} style={styles.removeTag}>
        <Text style={styles.removeTagText}>×</Text>
      </Pressable>
    )}
  </View>
);

export const TodoComposer: React.FC<TodoComposerProps> = ({ onPost }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [tagText, setTagText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const insets = useSafeAreaInsets();
  const todoInputRef = useRef<TextInput>(null);
  const tagInputRef = useRef<TextInput>(null);

  const modalHeight =
    SCREEN_HEIGHT - insets.top - MAIN_HEADER_HEIGHT - insets.bottom;

  useEffect(() => {
    if (tagText.includes(",")) {
      const newTag = tagText.replace(",", "");
      const newTags = tags;
      newTags.push(newTag);

      setTags(newTags);
      setTagText("");

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [tagText]);

  const toggleModal = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsVisible(!isVisible);
    translateY.value = withTiming(isVisible ? modalHeight : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });

    if (!isVisible) {
      setTimeout(() => todoInputRef.current?.focus(), 100);
    } else {
      setTodoText("");
      setTagText("");
      setTags([]);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handlePost = () => {
    toggleModal();
    onPost(todoText, tags);
  };

  const addTag = (tag: string) => {
    const newTags = [...tags];
    newTags.push(tag);
    setTags(newTags);
    setTagText("");
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <View style={styles.container}>
      <FloatingButton onPress={toggleModal} style={styles.floatingButton} />

      {isVisible && (
        <View
          style={[
            styles.modalOverlay,
            { paddingTop: insets.top + MAIN_HEADER_HEIGHT },
          ]}
        >
          <Animated.View
            style={[
              styles.modalContainer,
              animatedStyle,
              { height: modalHeight },
            ]}
          >
            <View style={styles.modalHeader}>
              <Pressable onPress={toggleModal} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>{"취소"}</Text>
              </Pressable>

              <Text style={styles.modalTitle}>{"일과 추가"}</Text>

              <Pressable
                onPress={handlePost}
                style={[
                  styles.postButton,
                  { opacity: todoText.length > 0 ? 1 : 0.5 },
                ]}
                disabled={todoText.length === 0}
              >
                <Text style={styles.postButtonText}>{"등록"}</Text>
              </Pressable>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.inputContainer}
              keyboardVerticalOffset={8}
            >
              <ScrollView style={styles.textScrollContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "flex-start",
                    paddingVertical: 8,
                  }}
                >
                  <SvgIcon
                    name="CheckSquare"
                    width={24}
                    height={24}
                    color={colors.textWhite}
                    strokeWidth={3}
                  />
                  <Text
                    variant="title"
                    style={{
                      color: colors.textWhite,
                      fontSize: 18,
                      marginLeft: 6,
                    }}
                  >
                    {"일과"}
                  </Text>
                </View>

                <TextInput
                  ref={todoInputRef}
                  style={styles.todoInput}
                  multiline
                  placeholder="어떤 일을 하실 예정인가요?"
                  placeholderTextColor={colors.primary}
                  value={todoText}
                  onChangeText={setTodoText}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "flex-start",
                    paddingVertical: 8,
                  }}
                >
                  <SvgIcon
                    name="Hashtag"
                    width={24}
                    height={24}
                    color={colors.textWhite}
                    strokeWidth={3}
                  />
                  <Text
                    variant="title"
                    style={{
                      color: colors.textWhite,
                      fontSize: 18,
                      marginLeft: 6,
                      marginTop: 2,
                    }}
                  >
                    {"태그"}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    ref={tagInputRef}
                    style={styles.tagInput}
                    placeholder="',' 나 '엔터'로 여러 개 입력할 수 있어요."
                    placeholderTextColor={colors.primary}
                    value={tagText}
                    onChangeText={setTagText}
                    onSubmitEditing={() => addTag(tagText)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    submitBehavior="submit"
                    multiline={false}
                  />
                  <Pressable
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: 8,
                      padding: 16,
                      marginBottom: 8,
                    }}
                    onPress={() => addTag(tagText)}
                  >
                    <SvgIcon
                      name="Plus"
                      width="20"
                      height="20"
                      color={colors.textBlack}
                    />
                  </Pressable>
                </View>

                <View style={{ width: "100%", height: 2, backgroundColor: colors.primary, marginBottom: 8 }} />

                {tags.length > 0 && (
                  <View style={styles.tagsRow}>
                    {tags.map((tag, index) => (
                      <Tag
                        key={`${tag}-${index}`}
                        text={tag}
                        onRemove={() => removeTag(index)}
                      />
                    ))}
                  </View>
                )}
              </ScrollView>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    zIndex: 2,
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  cancelButton: {
    padding: 8,
  },
  cancelButtonText: {
    color: colors.primary,
    fontSize: 18,
    marginRight: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  postButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  postButtonText: {
    color: colors.textBlack,
    fontWeight: "bold",
    fontSize: 16,
  },
  inputContainer: {
    flex: 1,
    padding: 16,
  },
  todoInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlignVertical: "top",
    color: colors.textWhite,
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlignVertical: "top",
    color: colors.textWhite,
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    marginRight: 8,
  },
  tagText: {
    color: colors.textWhite,
    fontSize: 16,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: 8
  },
  removeTag: {
    marginLeft: 6,
    alignSelf: "flex-end",
  },
  removeTagText: {
    color: colors.primary,
    fontSize: 16,
  },
  textScrollContainer: {
    flexGrow: 1,
  },
});
