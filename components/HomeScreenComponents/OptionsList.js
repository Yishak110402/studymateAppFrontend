import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/COLORS";

export default function OptionsList({
  optionName,
  iconName,
  pressFunction = () => Alert.alert("Not Assigned Yet", "Assign a function"),
}) {
  return (
    <View>
      <Pressable
        onPress={pressFunction}
        android_ripple={{ color: COLORS.primary700 }}>
        <View style={styles.optionContainer}>
          <Ionicons color={COLORS.primary700} size={30} name={iconName} />
          <Text style={styles.optionText}>{optionName}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    backgroundColor: COLORS.primary100,
    marginHorizontal: 10,
    marginVertical: 15,
    height: 100,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 19,
  },
  optionText: {
    color: COLORS.primary700,
    fontSize: 16,
    marginLeft: 25,
  },
});
