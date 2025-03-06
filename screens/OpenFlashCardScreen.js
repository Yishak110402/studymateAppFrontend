import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FlashCardNavigationButton from "../components/FlashCards/FlashCardNavigationButton";
import { COLORS } from "../constants/COLORS";
import { useNavigation, useRoute } from "@react-navigation/native";
import DeleteButton from "../components/DeleteButton";
import { AppContext } from "../context/AppContext";
import LoadingScreen from "../components/LoadingScreen";

export default function OpenFlashCardScreen() {
  const {deleteFlashcard, deletingFlashCard} = useContext(AppContext)
  const route = useRoute()  
  const flashCardID = route.params.data.id
  const flashCardData = JSON.parse(route.params.data.content).flashcards
  const navigation = useNavigation()  
  
  const [pageNumber, setPageNumber] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  useLayoutEffect(()=>{
    navigation.setOptions({
      title: route.params.data.name,
      headerRight: ()=>{
        return <DeleteButton pressFuntion={()=>deleteFlashcard(flashCardID)}/>
      }
    })
  },[])
  function nextQuestion() {
    if (pageNumber >= flashCardData.length - 1) {
      return;
    }
    setPageNumber((prev) => prev + 1);
    setShowQuestion(true);
  }
  function previousQuestion() {
    if (pageNumber <= 0) {
      return;
    }
    setPageNumber((prev) => prev - 1);
    setShowQuestion(true);
  }
  function setQuestionState() {
    setShowQuestion((prev) => !prev);
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.instruction}>
          Tap on the question to reveal the answer
        </Text>
      </View>
      <Pressable
        onPress={setQuestionState}
        style={showQuestion ? styles.questionContainer : styles.answerContainer}
        android_ripple={{ color: showQuestion ? "white" : COLORS.primary300 }}>
        <View>
          {showQuestion ? (
            <Text style={styles.questionText}>
              {flashCardData[pageNumber].question}
            </Text>
          ) : (
            <Text style={styles.answerText}>
              {flashCardData[pageNumber].answer}
            </Text>
          )}
        </View>
      </Pressable>
      <View style={styles.buttonsContainer}>
        <FlashCardNavigationButton
          pressFunction={previousQuestion}
          text={"Back"}
        />
        <Text style={styles.pageNum}>
          Question {pageNumber + 1}/{flashCardData.length}
        </Text>
        <FlashCardNavigationButton pressFunction={nextQuestion} text={"Next"} />
      </View>
      {deletingFlashCard && <LoadingScreen text={"Deleting Flashcard"} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 35,
    flex: 1,
  },
  instruction: {
    color: COLORS.primary100,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
  },
  questionContainer: {
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary100,
    borderRadius: 15,
    padding: 7,
  },
  questionText: {
    textAlign: "center",
    fontSize: 20,
    color: COLORS.primary700,
  },
  answerContainer: {
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary500,
    borderRadius: 15,
    padding: 7,
  },
  answerText: {
    textAlign: "center",
    fontSize: 15,
    color: COLORS.primary700,
    lineHeight: 17,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  pageNum: {
    color: COLORS.primary100,
  },
});
