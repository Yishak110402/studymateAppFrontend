import { useRoute } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Modal, ScrollView, Text, View } from "react-native";
import { COLORS } from "../constants/COLORS";
import { useContext, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../context/AppContext";
import LoadingScreen from "./../components/LoadingScreen"

export default function OpenSummary() {
  const scrollViewRef = useRef();
  const {
    setQuestion,
    sendQuestionAndReceiveAnswer,
    setAllConversations,
    allConversations,
    question,
    currentConversation,
    getCurrentConversation,
    fetchingConversation,
  } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const id = route.params.conversation.id;
  useEffect(() => {
    getCurrentConversation(id);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, [allConversations]);

  return (
    <KeyboardAvoidingView>
      {
        fetchingConversation  && (
          <View style={{height:'100%'}}>
            <LoadingScreen text={"Loading conversation"} />
          </View>
        )
      }
      {!fetchingConversation && (
        <View style={{ height: "100%" }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.initialSummaryButton}>
              <Text style={styles.initialSummaryButtonText}>
                Open Initial Summary
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.conversationsContainer}>
            {allConversations.length === 0 && (
              <Text style={styles.noMessagesText}>Send your first message</Text>
            )}
            <ScrollView ref={scrollViewRef}>
              {allConversations && allConversations.map((convo, idx) => {
                return (
                  <View
                    style={[
                      styles.messagesContainer,
                      convo.sender === "user"
                        ? styles.userMessage
                        : styles.aiMessage,
                    ]}
                    key={idx}>
                    <Text
                      style={[
                        convo.sender === "user"
                          ? styles.userMessageText
                          : styles.aiMessageText,
                      ]}>
                      {convo.text}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.questionInputContainer}>
            <TextInput
              style={styles.questionInput}
              autoCapitalize="sentences"
              autoCorrect={false}
              numberOfLines={3}
              onChangeText={(text) => setQuestion(text)}
              value={question}
            />
            <TouchableOpacity
              onPress={() => sendQuestionAndReceiveAnswer(currentConversation.id)}>
              <View style={styles.sendButton}>
                <Ionicons name="send" color={COLORS.primary300} size={24} />
              </View>
            </TouchableOpacity>
          </View>
          <Modal transparent visible={modalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <View>
                  <Text style={styles.closeButtonText}>X</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.modalInnerContainer}>
                <ScrollView>
                  <Text style={styles.summaryText}>
                    {currentConversation.initialSummary}
                  </Text>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  initialSummaryButton: {
    backgroundColor: COLORS.primary700,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  initialSummaryButtonText: {
    color: COLORS.primary300,
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    textAlign: "center",
    height: "100%",
  },
  modalInnerContainer: {
    width: "95%",
    height: "90%",
    backgroundColor: COLORS.primary300,
    alignSelf: "center",
    padding: 10,
    paddingTop: 34,
    marginTop: 25,
    borderRadius: 15,
  },
  summaryText: {
    fontSize: 13,
    lineHeight: 18,
  },
  closeButton: {
    position: "absolute",
    zIndex: 100,
    top: 10,
    right: 10,
    backgroundColor: COLORS.primary700,
    borderRadius: 999,
    padding: 15,
    height: 50,
    width: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: COLORS.primary100,
    fontSize: 15,
  },
  conversationsContainer: {
    backgroundColor: COLORS.primary500,
    flex: 1,
    paddingInline: 10,
    paddingTop: 15,
    paddingBottom: 145,
  },
  questionInputContainer: {
    backgroundColor: COLORS.primary500,
    borderWidth: 1,
    borderColor: "#fff",
    position: "absolute",
    bottom: 95,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messagesContainer: {
    // borderWidth: 2,
    borderRadius: 5,
    maxWidth: "85%",
    marginBlock: 6,
    padding: 5,
    paddingBlock: 8,
  },
  userMessage: {
    backgroundColor: COLORS.primary300,
  },
  aiMessage: {
    backgroundColor: COLORS.primary700,
    alignSelf: "flex-end",
  },
  userMessageText: {
    fontSize: 15,
  },
  aiMessageText: {
    color: COLORS.primary100,
  },
  questionInput: {
    backgroundColor: COLORS.primary100,
    flex: 1,
    paddingLeft: 5,
    fontSize: 14,
    color: COLORS.primary700,
  },
  sendButton: {
    backgroundColor: COLORS.primary700,
    height: "100%",
    paddingInline: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  noMessagesText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: 400,
  },
});
