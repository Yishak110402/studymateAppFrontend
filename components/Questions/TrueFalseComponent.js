import { StyleSheet } from "react-native";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants/COLORS";
import { useState } from "react";

export default function TrueFalseComponent({
  question = "Question will go here",
  indexNum,
}) {
  const tf = ["True", "False"];
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const handleAnswerPress = (index) => {
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
            onPress={() => handleAnswerPress(index)}
            android_ripple={{ color: COLORS.primary700 }}
            style={[
              styles.option,
              selectedAnswer === index && styles.selectedOption,
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
});
