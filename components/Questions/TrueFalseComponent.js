import { StyleSheet } from "react-native";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants/COLORS";
import { useState } from "react";

export default function TrueFalseComponent({
  question = "Question will go here",
  indexNum,
  setUserTFAnswers,
  showExplanations,
}) {
  const tf = ["True", "False"];
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correct, setCorrect] = useState(null);
  const handleAnswerSelection = (index) => {
    if(showExplanations) return
    setUserTFAnswers((prevAnswers) => {
      let isCorrect;
      if (index === 1 && question.answer === "true") {
        isCorrect = true;
        setCorrect(true);
      } else if (index === 2 && question.answer === "true") {
        isCorrect = false;
        setCorrect(false);
      } else if (index === 1 && question.answer === "false") {
        isCorrect = false;
        setCorrect(false);
      } else if (index === 2 && question.answer === "false") {
        isCorrect = true;
        setCorrect(true);
      }
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[indexNum] = {
        selectedAnswer: index === 1 ? true : false,
        isCorrect,
      };
      return updatedAnswers;
    });
    setSelectedAnswer(index);
  };

  return (
    <View
      style={[
        styles.container,
        showExplanations && correct && styles.correctAnswer,
        showExplanations && !correct && styles.inCorrectAnswer,
      ]}>
      <Text style={styles.questionText}>
        {indexNum + 1}. {question.question}
      </Text>
      <View style={styles.optionsContainer}>
        {tf.map((option, index) => (
          <Pressable
            onPress={() => handleAnswerSelection(index + 1)}
            style={[
              styles.option,
              selectedAnswer === index + 1 && styles.selectedOption,
            ]}>
            <View>
              <Text>{option}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginVertical: 10,
    backgroundColor: COLORS.primary100,
    borderRadius: 7,
    elevation: 3,
    overflow: "hidden",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  questionText: {
    fontSize: 14,
    color: COLORS.primary700,
    marginBottom: 10,
  },
  option: {
    fontSize: 14,
    color: COLORS.primary700,
    backgroundColor: COLORS.primary300,
    paddingHorizontal: 15,
    borderRadius: 7,
    paddingVertical: 8,
  },
  selectedOption: {
    backgroundColor: "yellow",
  },
  correctAnswer: {
    backgroundColor: "#9cff58",
  },
  inCorrectAnswer: {
    backgroundColor: "#ff7770",
  },
});
