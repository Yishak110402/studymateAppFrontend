import { StyleSheet } from "react-native";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants/COLORS";
import { useState } from "react";

export default function TrueFalseComponent({
  question = "Question will go here",
  indexNum,
}) {
  console.log(question.answer);
  // Work on correct answer validation
  const tf = ["True", "False"];
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const handleAnswerPress = (index) => {
    console.log(index);
    if (selectedAnswer) {
      return;
    }
    if (index === 1) {
    }
    if (index === 2) {
    }
    setSelectedAnswer(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        {indexNum + 1}. {question.question}
      </Text>
      <View style={styles.optionsContainer}>
        {tf.map((option, index) => (
          <Pressable
            onPress={() => handleAnswerPress(index + 1)}
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
  correctAnswer:{
    backgroundColor:'green'
  },
  inCorrectAnswer:{
    backgroundColor:COLORS.error
  }
});
