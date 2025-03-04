import { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { AppContext } from "../context/AppContext";
import { StyleSheet } from "react-native";
import TrueFalseComponent from "../components/Questions/TrueFalseComponent";
import { COLORS } from "../constants/COLORS";
import { ScrollView } from "react-native";
import MCQComponent from "../components/Questions/MCQComponent";
import { useRoute } from "@react-navigation/native";

export default function OpenQuestionScreen() {
  const { dummyQuestions } = useContext(AppContext);
  const route = useRoute();
  const question = route.params.question;
  // console.log(question);

  const cleanQuestion = JSON.parse(question.content);
  const correctTFAnswers = cleanQuestion.questions.trueFalse.map((item) => item.answer);
  // console.log(cleanQuestion);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.questionsHeader}>True/False Questions</Text>
        {cleanQuestion.questions.trueFalse.map((item, index) => (
          <TrueFalseComponent
            question={item}
            key={item.question}
            indexNum={index}
          />
        ))}
      </View>
      <View>
        <Text style={styles.questionsHeader}>Multiple Choice Questions</Text>
        {cleanQuestion.questions.multipleChoice.map((item, index) => (
          <MCQComponent question={item} index={index} />
        ))}
        <Pressable android_ripple={{color:COLORS.primary700}} style={styles.submitButton}>
          <View>
            <Text style={styles.submitText}>Submit</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 10,
    flex: 1,
    marginBottom: 135,
  },
  questionsHeader: {
    fontSize: 17,
    color: COLORS.primary100,
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
    alignSelf:'center',
    marginTop: 15
  },
  submitText:{
    fontSize: 15,
    color:COLORS.primary700
  }
});
