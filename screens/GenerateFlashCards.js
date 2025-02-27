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
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/COLORS";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GenerateFlashCards() {
  const [allFlashCards, setallFlashCards] = useState([]);
  const navigation = useNavigation();
  const [currCard, setCurrCard] = useState(0);
  useEffect(function(){
    async function loadFlashcards(){
      const flashes = JSON.parse(await AsyncStorage.getItem("flashcards"))
      if(flashes){
        setallFlashCards(flashes)
      }
    }
    loadFlashcards()
  },[allFlashCards, setallFlashCards])

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
        <View>
          <Pressable
            android_ripple={{ color: COLORS.primary700 }}
            style={styles.addBtnContainer}
            onPress={() => navigation.navigate("Create Flashcard")}>
            <View>
              <Text>
                <Ionicons name="add" color={COLORS.primary700} size={25} />
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
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
  noFlashCards:{
    color:COLORS.primary100,
    fontSize: 16,
    textAlign:'center',
    marginVertical: 20
  }
});
