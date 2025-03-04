import { Alert, FlatList, Pressable, StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/COLORS";
import QuestionsListItem from "../components/Questions/QuestionsListItem";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { ScrollView } from "react-native-gesture-handler";
import LoadingScreen from "../components/LoadingScreen";

export default function GenerateQuestions() {
  const { ip, localip, currentUser, setAllQuestions, allQuestions } = useContext(AppContext);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const navigation = useNavigation();
  const goToCreateQuestions = () => {
    navigation.navigate("Create Question");
  };
  useEffect(function () {
    async function getUserQuestions() {
      setLoadingQuestions(true);
      if (!currentUser) return;
      console.log("Loading Questions...");

      const res = await fetch(
        `${ip}/generate/questions/${currentUser.id}`
      );
      if(!res.ok || !res){
        Alert.alert("Something Went wrong")
        return
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
      style={{ marginBottom: 100, flex:1}}>
      <View style={styles.container}>
        {loadingQuestions && <LoadingScreen text={"Loading Questions..."} />}
        {allQuestions.length === 0 && (
          <View>
            <Text>No Questions Have Been Created</Text>
            </View>
        )}
        {allQuestions.length !== 0 &&
          allQuestions.map((question) => (
            <QuestionsListItem question={question} />
          ))}
        <View>
          <Pressable
            onPress={goToCreateQuestions}
            android_ripple={{ color: COLORS.primary700 }}
            style={styles.addBtnContainer}>
            <View>
              <Ionicons name="add" size={26} color={COLORS.primary700} />
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    alignItems: "center",
  },
  addBtnContainer: {
    backgroundColor: COLORS.primary100,
    padding: 5,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
