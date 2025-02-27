import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../../constants/COLORS";
import { Ionicons } from "@expo//vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function FlashCardListItem({flashCard}) {
  const navigation = useNavigation()
  function navigateOpenFlashCard(){
    navigation.navigate("Open FlashCard",{
      data: flashCard.data
    })
  }
  //Next open the selected flashcard in the open page  
  return (
    <Pressable
    onPress={navigateOpenFlashCard}
      android_ripple={{ color: COLORS.primary700 }}
      style={styles.listContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.listText}>{flashCard.id}</Text>
        <Ionicons name="arrow-forward" size={25} color={COLORS.primary700} />
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: COLORS.primary100,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3,
    padding: 5,
    height: 50,
    paddingHorizontal: 15,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listText: {
    color: COLORS.primary700,
    fontSize: 15,
  },
});
