import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { COLORS } from "../../constants/COLORS";
import { Ionicons } from "@expo//vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function FlashCardListItem({ flashCard = { name: "Name" } }) {
  const name = flashCard.name || "Name";
  const navigation = useNavigation();
  function navigateOpenFlashCard() {
    navigation.navigate("Open FlashCard", {
      data: flashCard,
    });
  }

  return (
    <Pressable
      onPress={navigateOpenFlashCard}
      android_ripple={{ color: COLORS.primary700 }}
      style={styles.listContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.listText}>{name}</Text>
        <View style={styles.btnsContainer}>
          {/* <Ionicons name="arrow-forward" size={25} color={COLORS.primary700} /> */}
          <TouchableOpacity onPress={()=>{
            Alert.alert("Delete Flashcard", "Are you sure you want to delete the flashcard?", [
              {
                style:'destructive',
                text:'Yes',
              },
              {
                text:" No"
              }
            ])
          }}>
            <View>
              <Ionicons name="trash-bin" color={COLORS.primary700} size={25} />
            </View>
          </TouchableOpacity>
        </View>
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
    justifyContent:'center'
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
  btnsContainer:{
    flexDirection:'row',
    gap: 5,
    alignItems:'center'
  }
});
