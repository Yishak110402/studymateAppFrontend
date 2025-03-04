import { StyleSheet } from "react-native";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants/COLORS";
import { useState } from "react";

export default function MCQComponent({
  question,
  indexNum,
  setUserMCQAnswers,
  showExplanations,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correct, setCorrect] = useState(null);
  const handleAnswerPress = (index) => {
    if (showExplanations) return;
    setUserMCQAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[indexNum] = {
        isCorrect: index === question.answer[0],
        selectedAnswer: index,
        correctAnswer: question.answer[0],
      };
      if (updatedAnswers[indexNum].isCorrect) {
        setCorrect(true);
      } else {
        setCorrect(false);
      }
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
      <Text style={styles.question}>
        {indexNum + 1}. {question.question}
      </Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <McqOptionButton
            option={option}
            index={index}
            key={index}
            pressFunction={handleAnswerPress}
            selectedAnswer={selectedAnswer}
          />
        ))}
      </View>
      {showExplanations && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>{question.answer[1]}</Text>
        </View>
      )}
    </View>
  );
}

function McqOptionButton({ selectedAnswer, index, option, pressFunction }) {
  return (
    <Pressable
      onPress={() => pressFunction(index)}
      style={[
        styles.option,
        selectedAnswer === index ? styles.selectedOption : {},
      ]}>
      <View>
        <Text>{option}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: COLORS.primary100,
    borderRadius: 8,
    marginVertical: 10,
  },
  question: { fontSize: 16, color: COLORS.primary700, marginBottom: 15 },
  option: {
    borderRadius: 8,
    backgroundColor: COLORS.primary300,
    padding: 10,
    marginVertical: 5,
  },
  selectedOption: { backgroundColor: "yellow" },
  correctAnswer: {
    backgroundColor: "#9cff58",
  },
  inCorrectAnswer: {
    backgroundColor: "#ff7770",
  },
  explanationContainer: {
    paddingVertical: 10,
    backgroundColor:COLORS.primary700,
    marginTop: 15,
    borderRadius: 12,
    paddingHorizontal: 10
  },
  explanationText: {
    color:COLORS.primary300,
    fontSize: 15
  },
});
