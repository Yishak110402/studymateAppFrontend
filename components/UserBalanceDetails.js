import { useContext } from "react";
import { View } from "react-native";
import { AppContext } from "../context/AppContext";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants/COLORS";

export default function UserBalanceDetails() {
  const { currentUser } = useContext(AppContext);
  return (
    <View style={styles.container}>
      {currentUser && (
        <>
          <View style={styles.detailContainer}>
            <Ionicons name="albums" size={15} color={"#f7f7f7"} />
            <Text style={styles.detailText}>
              {currentUser.flashcardsBalance}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Ionicons name="bulb" size={15} color={"#f7f7f7"} />
            <Text style={styles.detailText}>
              {currentUser.questionsBalance}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: COLORS.primary700,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "space-between",
    paddingVertical: 5,
    backgroundColor: COLORS.primary700,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  detailText: {
    fontSize: 15,
    color: "#f7f7f7",
    marginLeft: 5,
  },
});
