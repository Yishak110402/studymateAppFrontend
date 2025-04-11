import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/COLORS";
import { useNavigation } from "@react-navigation/native";

export default function SummariesListItem({ conversation = {} }) {
  const navigation = useNavigation();
  const goToSelectedSummary = () => {
    navigation.navigate("Open Summary", {
      conversation: conversation,
    });
  };
  const shortSummary = conversation.initialSummary.slice(0, 45);
  return (
    <View style={styles.container}>
      <Text style={styles.initialSummaryStyling}>{shortSummary}...</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={goToSelectedSummary}>
          <View style={styles.openConversationButton}>
            <Text style={styles.openConversationButtonText}>
              Open Conversation
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.deleteConversationButton}>
            <Text style={styles.deleteConversationButtonText}>
              Delete Conversation
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary500,
    marginBlock: 10,
    padding: 10,
    borderRadius: 8,
  },
  initialSummaryStyling: {
    fontSize: 14,
    marginBottom: 5,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  openConversationButton: {
    backgroundColor: COLORS.primary700,
    padding: 8,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  openConversationButtonText: {
    color: COLORS.primary300,
  },
  deleteConversationButton: {
    backgroundColor: COLORS.errorText,
    padding: 8,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteConversationButtonText: {
    color: COLORS.primary100,
  },
});
