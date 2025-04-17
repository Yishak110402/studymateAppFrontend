import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { COLORS } from "../../constants/COLORS";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FlashCardFileSection({ setLoading, name }) {
  const { ip, currentUser, setCurrentUser, setAllFlashCards, localip } =
    useContext(AppContext);
  const navigation = useNavigation();
  async function getFile() {
    const file = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
    });
    if (!file.assets[0].uri) {
      console.log("No File Selected");
      return;
    }
    const formData = new FormData();
    formData.append("pdfFile", {
      uri: file.assets[0].uri,
      type: file.assets[0].mimeType,
      name: file.assets[0].name,
    });
    formData.append("name", name);
    formData.append("userId", currentUser.id);
    setLoading(true);
    console.log("Generation Started");
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
      return;
    }
    const data = await res.json();

    if (data.status === "fail") {
      Alert.alert("Error", data.message);
      navigation.goBack()
      setLoading(false);
      return;
    }
    const user = await AsyncStorage.getItem("current-user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const updatedUser = {
        ...parsedUser,
        flashcardsBalance: data.newFlashcardsBalance,
      };
      setCurrentUser(updatedUser);
      await AsyncStorage.setItem("current-user", JSON.stringify(updatedUser));
    }
    console.log("Generation Completed");
    setLoading(false);
    setAllFlashCards((prev) => [...prev, data.message]);
    navigation.goBack();
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
    fontSize: 18,
    color: COLORS.primary700,
  },
  buttonContainer: {
    backgroundColor: COLORS.primary700,
    width: 120,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 15,
  },
  buttonText: {
    color: COLORS.primary100,
    fontSize: 15,
  },
});
