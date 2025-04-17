import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { AppContext } from "../context/AppContext";
import { StyleSheet } from "react-native";
import TrueFalseComponent from "../components/Questions/TrueFalseComponent";
import { COLORS } from "../constants/COLORS";
import { ScrollView } from "react-native";
import MCQComponent from "../components/Questions/MCQComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomModal from "../components/CustomModal";
import DeleteButton from "../components/DeleteButton";
import LoadingScreen from "../components/LoadingScreen";

export default function OpenQuestionScreen() {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [showExplanations, setShowExplanations] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const route = useRoute();
  const question = route.params.question;
  const cleanQuestion = JSON.parse(question.content);
  const [userTFAnswers, setUserTFAnswers] = useState(
    Array(cleanQuestion.questions.trueFalse.length).fill(null)
  );
  const [userMCQAnswers, setUserMCQAnswers] = useState(
    Array(cleanQuestion.questions.multipleChoice.length).fill(null)
  );
  const { deletingQuestion, deleteQuestion } = useContext(AppContext);
  const totalQuestions =
    cleanQuestion.questions.multipleChoice.length +
    cleanQuestion.questions.trueFalse.length;

  useLayoutEffect(function () {
    navigation.setOptions({
      title: question.name,
    })
  },[])
  const checkFinalAnswers = () => {
    if (userMCQAnswers.includes(null) || userTFAnswers.includes(null)) {
      Alert.alert(
        "Failed to check!!",
        "Please answer all the questions before submitting your answers"
      );
      return;
    }
    const flatQuestionsAnswers = [...userTFAnswers, ...userMCQAnswers];
    let total = 0;
    for (let index = 0; index <= flatQuestionsAnswers.length - 1; index++) {
      if (flatQuestionsAnswers[index].isCorrect) {
        total += 1;
      } else {
        // console.log(flatQuestionsAnswers[index]);
      }
    }
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
    console.log(`You Scored ${total} out of ${totalQuestions}`);
    setModalVisible(true);
    setModalText(`You Scored ${total} out of ${totalQuestions}`);
    setShowExplanations(true);
  };
  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <Pressable
        android_ripple={{ color: COLORS.primary500 }}
        style={styles.deleteButtonContainer}
        onPress={() => {
          deleteQuestion(question.id);
        }}>
        <View>
          <Text style={styles.deleteButtonText}>Delete Question</Text>
        </View>
      </Pressable>
      <View>
        <Text style={styles.questionsHeader}>True/False Questions</Text>
        {cleanQuestion.questions.trueFalse.map((item, index) => (
          <TrueFalseComponent
            key={item.question}
            question={item}
            indexNum={index}
            setUserTFAnswers={setUserTFAnswers}
            showExplanations={showExplanations}
          />
        ))}
      </View>
      <View>
        <Text style={styles.questionsHeader}>Multiple Choice Questions</Text>
        {cleanQuestion.questions.multipleChoice.map((item, index) => (
          <MCQComponent
            question={item}
            indexNum={index}
            setUserMCQAnswers={setUserMCQAnswers}
            showExplanations={showExplanations}
            key={index}
          />
        ))}
        <Pressable
          android_ripple={{ color: COLORS.primary700 }}
          style={styles.submitButton}
          onPress={checkFinalAnswers}>
          <View>
            <Text style={styles.submitText}>Submit</Text>
          </View>
        </Pressable>
      </View>
      <CustomModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        text={modalText}
      />
      {deletingQuestion && <LoadingScreen text={"Deleting Question"} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 10,
    flex: 1,
    marginBottom: 95,
  },
  questionsHeader: {
    fontSize: 17,
    color: COLORS.primary700,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: COLORS.primary300,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 25,
    width: 100,
    alignSelf: "center",
    marginTop: 15,
  },
  submitText: {
    fontSize: 15,
    color: COLORS.primary700,
  },
  deleteButtonContainer: {
    backgroundColor: COLORS.error,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
  },
  deleteButtonText:{
    fontSize: 15,
    color: "black"
  }
});
