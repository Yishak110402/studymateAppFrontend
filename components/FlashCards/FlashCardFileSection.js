import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Colors } from "react-native-paper";
import { COLORS } from "../../constants/COLORS";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function FlashCardFileSection({ setLoading }) {
  const { ip } = useContext(AppContext);
  const navigation = useNavigation()
  async function getFile() {
    const file = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
    });
    if (!file.uri) {
      console.log("No File Selected");
      return;
    }
    const formData = new FormData();
    formData.append("pdfFile", {
      uri: file.uri,
      type: file.mimeType,
      name: file.name,
    });
    setLoading(true);
    const res = await fetch(`${ip}/generate/flashcards`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    if (!res.ok) {
      Alert.alert("Something went wrong. Try Again Later");
      setLoading(false);
    }
    const data = await res.json();
    console.log(data.data.cards.flashcards);
    setLoading(false);
    const allFlashCards = await AsyncStorage.getItem("flashcards");
    console.log(allFlashCards);
    if (allFlashCards === null) {
      await AsyncStorage.setItem(
        "flashcards",
        JSON.stringify([{ id: Date.now(), data: data.data.cards.flashcards }])
      );
    } else {
      const flash = JSON.parse(await AsyncStorage.getItem("flashcards"));
      flash.push({ id: Date.now(), data: data.data.cards.flashcards });
      await AsyncStorage.setItem("flashcards", JSON.stringify(flash));
    }
    console.log(JSON.parse(await AsyncStorage.getItem("flashcards")));
    console.log(JSON.parse(await AsyncStorage.getItem("flashcards")).length);
    navigation.navigate("Generate Flashcards")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select the file you want</Text>
      <Pressable
        style={styles.buttonContainer}
        android_ripple={{ color: COLORS.primary700 }}
        onPress={getFile}>
        <View>
          <Text style={styles.buttonText}>Select File</Text>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginTop: 25,
  },
  header: {
    fontSize: 15,
    color: COLORS.primary100,
  },
  buttonContainer: {
    backgroundColor: COLORS.primary100,
    width: 150,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 15,
  },
  buttonText: {
    color: COLORS.primary700,
    fontSize: 17,
  },
});
