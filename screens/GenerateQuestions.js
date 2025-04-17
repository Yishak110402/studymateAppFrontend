import { Alert, Button, FlatList, Pressable, StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/COLORS";
import QuestionsListItem from "../components/Questions/QuestionsListItem";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { ScrollView } from "react-native-gesture-handler";
import LoadingScreen from "../components/LoadingScreen";
import DeleteButton from "../components/DeleteButton";
import AddNewButton from "../components/AddNewButton";

export default function GenerateQuestions() {
  const { ip, localip, currentUser, setAllQuestions, allQuestions } =
    useContext(AppContext);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const navigation = useNavigation();
  const goToCreateQuestions = () => {
    navigation.navigate("Create Question");
  };

  useLayoutEffect(function () {
    async function getUserQuestions() {
      setLoadingQuestions(true);
      if (!currentUser) return;
      console.log("Loading Questions...");

      const res = await fetch(`${ip}/generate/questions/${currentUser.id}`);
      if (!res.ok || !res) {
        Alert.alert("Something Went wrong");
        return;
      }
      const data = await res.json();
      setAllQuestions(data.data.questions);
      setLoadingQuestions(false);
    }
    getUserQuestions();
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: 0, flex: 1 }}>
      <View style={styles.container}>
        {loadingQuestions && <LoadingScreen text={"Loading Questions..."} />}
        {allQuestions.length === 0 && (
          <View>
            <Text style={styles.noQuestionsText}>
              No Questions Have Been Created
            </Text>
          </View>
        )}
        {allQuestions.length !== 0 &&
          allQuestions.map((question, index) => (
            <QuestionsListItem question={question} key={index} />
          ))}
        <View></View>
      </View>
      <View style={styles.button}>
        <Pressable android_ripple={{color:COLORS.primary300}} onPress={goToCreateQuestions}>
          <Ionicons name="add-circle" size={50} color={COLORS.primary700} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    alignItems: "center",
    minHeight: "100%",
    // borderWidth: 1
  },
  noQuestionsText: {
    color: COLORS.primary700,
    marginTop: 10,
    fontSize: 17,
    marginBottom: 15,
  },
  button: {
    position: "absolute",
    bottom: -15,
    right: "50%",
    transform: [{ translateX: "50%" }, { translateY: "50%" }],
    backgroundColor: COLORS.primary100,
    borderRadius: 50,
  },
});
