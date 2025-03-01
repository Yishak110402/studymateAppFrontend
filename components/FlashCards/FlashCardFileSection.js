import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { COLORS } from "../../constants/COLORS";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function FlashCardFileSection({ setLoading, name }) {
  const { ip, localip, currentUser, setAllFlashCards } = useContext(AppContext);
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
    const res = await fetch(`${localip}/generate/flashcards`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    if (!res.ok) {
      Alert.alert("Something went wrong. Try Again Later");
      setLoading(false);
      return
    }
    const data = await res.json();
    
    if(data.status === "fail"){
      Alert.alert(data.message);
      setLoading(false);
      return
    }
    console.log("Generation Completed");    
    setLoading(false);
    setAllFlashCards((prev)=>[...prev, data.message])    
    navigation.goBack()
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
