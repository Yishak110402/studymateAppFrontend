import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { COLORS } from "../../constants/COLORS";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function QuestionsListItem({pressFunction}) {
    const navigation = useNavigation()
    const press = ()=>{
        navigation.navigate("Open Question")
    }   
  return (
    <Pressable
      style={styles.questionContainer}
      android_ripple={{ color: COLORS.primary700 }}
      onPress={press}>
      <View>
        <Text style={styles.questionsTitle}>
          Name of the question goes here
        </Text>
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <Text style={styles.detailsText}>10 T/F</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailsText}>10 MCQ</Text>
          </View>
        </View>
      </View>
      <View>
        <Ionicons name="arrow-forward" size={25} color={COLORS.primary700} />
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  questionContainer: {
    backgroundColor: COLORS.primary300,
    margin: 5,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionsTitle: {
    fontSize: 17,
    color: COLORS.primary700,
  },
  detailsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  details: {
    backgroundColor: COLORS.primary500,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    marginRight: 10,
  },
  detailsText: {
    fontSize: 12,
    color: COLORS.primary700,
  },
});
