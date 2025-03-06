import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import FlashCardListItem from "../components/FlashCards/FlashCardsListItem";
import LoadingScreen from "../components/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/COLORS";
import { useNavigation } from "@react-navigation/native";
import AddNewButton from "../components/AddNewButton";

export default function GenerateFlashCards() {
  const { allFlashCards, setRefresh, loadFlashCards, flashCardsLoading } =
    useContext(AppContext);
  const goToCreateFlashCard = () => {
    navigation.navigate("Create Flashcard");
  };
  const navigation = useNavigation();
  const [currCard, setCurrCard] = useState(0);
  useLayoutEffect(function () {
    loadFlashCards();
  }, []);
  useEffect(function () {
    setRefresh((prev) => prev + 1);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {allFlashCards.length === 0 && (
          <View>
            <Text style={styles.noFlashCards}>
              No flashcards have been created
            </Text>
          </View>
        )}
        <FlatList
          data={allFlashCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <FlashCardListItem flashCard={item} />;
          }}
        />
      </View>
      <View>
        <View style={styles.button}>
          <Pressable
            android_ripple={{ color: COLORS.primary300 }}
            onPress={goToCreateFlashCard}>
            <Ionicons name="add-circle" size={50} color={COLORS.primary700} />
          </Pressable>
        </View>
      </View>
      {flashCardsLoading && <LoadingScreen text={"Loading Flashcards..."} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  addBtnContainer: {
    backgroundColor: COLORS.primary100,
    borderRadius: 1000,
    alignSelf: "center",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  noFlashCards: {
    color: COLORS.primary100,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    position: "absolute",
    bottom: -25,
    right: "50%",
    transform: [{ translateX: "50%" }, { translateY: "50%" }],
    backgroundColor: COLORS.primary100,
    borderRadius: 50,
  },
});
