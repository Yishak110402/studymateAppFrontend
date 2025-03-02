import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/COLORS";
export default function CreateQuestionsForm() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Give your questions a name</Text>
      <TextInput
        style={styles.nameInput}
        autoCapitalize="words"
        maxLength={25}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    fontSize: 17,
    color: COLORS.primary100,
    marginLeft: 7,
    marginBottom: 10,
  },
  nameInput: {
    backgroundColor: COLORS.primary300,
    paddingVertical: 5,
    paddingHorizontal: 7,
    fontSize: 20,
    color: COLORS.primary700,
    borderRadius: 10,
  },
});
