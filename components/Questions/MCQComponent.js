import { StyleSheet } from "react-native";
import { Pressable, Text, View } from "react-native";
import { COLORS } from "../../constants/COLORS";
import { useState } from "react";

export default function MCQComponent({ question, index }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const handleAnswerPress = (index) => {
    setSelectedAnswer(index);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{index + 1}. {question.question}</Text>
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
    </View>
  );
}

function McqOptionButton({ selectedAnswer, index, option, pressFunction }) {
  return (
    <Pressable
      onPress={() => pressFunction(index)}
      style={[styles.option, selectedAnswer === index ? styles.selectedOption : {}]}>
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
});
