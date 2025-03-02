import { useContext } from "react";
import { Text, View } from "react-native";
import { AppContext } from "../context/AppContext";
import { StyleSheet } from "react-native";
import TrueFalseComponent from "../components/Questions/TrueFalseComponent";
import { COLORS } from "../constants/COLORS";
import { ScrollView } from "react-native";
import MCQComponent from "../components/Questions/MCQComponent";

export default function OpenQuestionScreen() {
  const { dummyQuestions } = useContext(AppContext);
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.questionsHeader}>True/False Questions</Text>
        {dummyQuestions.questions.trueFalse.map((item, index) => (
          <TrueFalseComponent question={item} key={item.question} indexNum={index}/>
        ))}
      </View>
      <View>
        <Text style={styles.questionsHeader}>Multiple Choice Questions</Text>
        {
            dummyQuestions.questions.multipleChoice.map((item, index)=> <MCQComponent question={item} index={index}/>)
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 10,
    paddingBottom: 0,
    flex: 1,
  },
  trueFalseContainer: {},
  questionsHeader: {
    fontSize: 17,
    color: COLORS.primary100,
    marginBottom: 15,
  },
});
