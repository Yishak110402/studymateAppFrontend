import { Alert, Keyboard, Pressable, StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { COLORS } from "../../constants/COLORS";
import { useContext, useState } from "react";
import QuestionsFileSection from "./QuestionsFileSection";
import * as DocumentPicker from "expo-document-picker";
import { AppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function CreateQuestionsForm() {
  const { currentUser, localip, ip, setAllQuestions, setCurrentUser } = useContext(AppContext);
  const [makingQuestions, setMakingQuestions] = useState(false);
  const navigation = useNavigation();
  const [invalid, setInvalid] = useState({
    name: false,
    mcqNum: false,
    tfNum: false,
  });
  const [questionData, setQuestionData] = useState({
    name: "",
    tfNum: "15",
    mcqNum: "15",
  });
  async function createQuestions() {
    Keyboard.dismiss();
    setInvalid({
      name: false,
      tfNum: false,
      mcqNum: false,
    });
    if (
      questionData.name === "" ||
      questionData.tfNum === "" ||
      questionData.mcqNum === "" ||
      Number(questionData.tfNum) < 10 ||
      Number(questionData.tfNum) > 30 ||
      Number(questionData.mcqNum) < 10 ||
      Number(questionData.mcqNum) > 30
    ) {
      if (questionData.name === "") {
        setInvalid((prev) => ({ ...prev, name: true }));
      }
      if (
        questionData.tfNum === "" ||
        Number(questionData.tfNum) < 10 ||
        Number(questionData.tfNum) > 30
      ) {
        setInvalid((prev) => ({ ...prev, tfNum: true }));
      }
      if (
        questionData.mcqNum === "" ||
        Number(questionData.mcqNum) < 10 ||
        Number(questionData.mcqNum) > 30
      ) {
        setInvalid((prev) => ({ ...prev, mcqNum: true }));
      }
      return;
    }
    const file = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
    });
    if (!file.assets) {
      console.log("No File Selected");
      return;
    }
    setMakingQuestions(true);
    const formData = new FormData();
    formData.append("questionPdfFile", {
      uri: file.assets[0].uri,
      type: file.assets[0].mimeType,
      name: file.assets[0].name,
    });
    formData.append("name", questionData.name);
    formData.append("userId", currentUser.id);
    formData.append("tfNum", Number(questionData.tfNum));
    formData.append("mcqNum", Number(questionData.mcqNum));

    const res = await fetch(`${ip}/generate/questions`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      Alert.alert("Failed", "Something Went Wrong. Try Again Later");
      setMakingQuestions(false);
      return;
    }
   const data = await res.json();

    if (data.status === "fail") {
      Alert.alert("Failed", data.message);
      setMakingQuestions(false);
      navigation.goBack()
      return;
    }
    if (data.status === "success") {
      const user = await AsyncStorage.getItem("current-user");
      const parsedUser = JSON.parse(user)
      const updatedUser = {...parsedUser, questionsBalance: data.newQuestionsBalance}
      await AsyncStorage.setItem("current-user", JSON.stringify(updatedUser))
      setCurrentUser(updatedUser);
      setAllQuestions((prev) => [...prev, data.data]);
      navigation.goBack();
    }
    setMakingQuestions(false);
  }
  return (
    <View style={styles.container}>
      {makingQuestions && <LoadingScreen text={"Generating Questions..."} />}
      <View>
        <Text style={styles.header}>Give your questions a name</Text>
        <TextInput
          style={[styles.nameInput, invalid.name && styles.errorInput]}
          autoCapitalize="words"
          maxLength={25}
          onChangeText={(text) =>
            setQuestionData((prev) => ({ ...prev, name: text }))
          }
        />
      </View>
      <View>
        <Text style={styles.subHeader}>
          Number of True/False Questions(B/n 10 and 30)
        </Text>
        <TextInput
          style={[styles.numInput, invalid.tfNum && styles.errorInput]}
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={(number) =>
            setQuestionData((prev) => ({ ...prev, tfNum: number }))
          }
          value={questionData.tfNum}
        />
      </View>
      <View>
        <Text style={styles.subHeader}>
          Number of MC Questions(B/n 10 and 30)
        </Text>
        <TextInput
          style={[styles.numInput, invalid.mcqNum && styles.errorInput]}
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={(number) =>
            setQuestionData((prev) => ({ ...prev, mcqNum: number }))
          }
          value={questionData.mcqNum}
        />
      </View>
      <View>
        <Pressable
          onPress={createQuestions}
          android_ripple={{ color: COLORS.primary700 }}
          style={styles.nextBtn}>
          <View>
            <Text style={styles.nextButtonText}>Next</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    fontSize: 17,
    color: COLORS.primary700,
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
  subHeader: {
    fontSize: 13,
    color: COLORS.primary700,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 7,
  },
  numInput: {
    backgroundColor: COLORS.primary300,
    paddingVertical: 5,
    paddingHorizontal: 7,
    fontSize: 15,
    color: COLORS.primary700,
    borderRadius: 10,
  },
  nextBtn: {
    backgroundColor: COLORS.primary700,
    borderRadius: 8,
    marginTop: 10,
    padding: 11,
    width: 90,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    fontSize: 17,
    color: COLORS.primary100
  },
  errorInput: {
    backgroundColor: COLORS.error,
  },
});
