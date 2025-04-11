import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/COLORS";

export default function SummariesListItem({ conversation = {} }) {
  return (
    <View style={styles.container}>
      <Text style={styles.initialSummaryStyling}>
        This is part of the initial Summary...
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity>
          <View style={styles.openConversationButton}>
            <Text style={styles.openConversationButtonText}>Open Conversation</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text>Delete Conversation</Text>
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
    fontSize: 18,
    marginBottom: 5,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop: 10
  },
  openConversationButton:{
    backgroundColor: COLORS.primary700,
    padding: 8,
    borderRadius:6
  },
  openConversationButtonText:{
    color: COLORS.primary300
  }
});
