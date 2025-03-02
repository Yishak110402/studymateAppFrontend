import { Pressable, StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { COLORS } from "../../constants/COLORS";
import { useState } from "react";
export default function CreateQuestionsForm() {
  const [invalid, setInvalid] = useState({
    name: false,
    mcqNum: false,
    tfNum: false,
  });
  const [questionData, setQuestionData] = useState({
    name: "",
    tfNum: "",
    mcqNum: "",
  });
  const validateNameAndNums = () => {
    if (
      questionData.name === "" &&
      questionData.tfNum === "" &&
      questionData.mcqNum === ""
    ) {
      if (questionData.name === "") {
        setInvalid((prev) => ({ ...prev, name: true }));
      }
      if (questionData.tfNum === "") {
        setInvalid((prev) => ({ ...prev, tfNum: true }));
      }
      if (questionData.mcqNum === "") {
        setInvalid((prev) => ({ ...prev, mcqNum: true }));
      }
      return;
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Give your questions a name</Text>
        <TextInput
          style={styles.nameInput}
          autoCapitalize="words"
          maxLength={25}
          onChangeText={(name) =>
            setQuestionData((prev) => ({ ...prev, name: name }))
          }
        />
      </View>
      <View>
        <Text style={styles.subHeader}>
          Number of True/False Questions(B/n 10 and 30)
        </Text>
        <TextInput
          style={styles.numInput}
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={(number) =>
            setQuestionData((prev) => ({ ...prev, tfNum: number }))
          }
        />
      </View>
      <View>
        <Text style={styles.subHeader}>
          Number of True/False Questions(B/n 10 and 30)
        </Text>
        <TextInput
          style={styles.numInput}
          keyboardType="number-pad"
          maxLength={2}
          onChangeText={(number) =>
            setQuestionData((prev) => ({ ...prev, mcqNum: number }))
          }
        />
      </View>
      <View>
        <Pressable
          android_ripple={{ color: COLORS.primary700 }}
          style={styles.nextBtn}>
          <View>
            <Text style={styles.nextButtonText}>Next</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    fontSize: 17,
    color: COLORS.primary100,
    marginLeft: 7,
    marginBottom: 10,
  },
  nameInput: {
    backgroundColor: COLORS.primary300,
    paddingVertical: 5,
    paddingHorizontal: 7,
    fontSize: 20,
    color: COLORS.primary700,
    borderRadius: 10,
  },
  subHeader: {
    fontSize: 13,
    color: COLORS.primary300,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 7,
  },
  numInput: {
    backgroundColor: COLORS.primary300,
    paddingVertical: 5,
    paddingHorizontal: 7,
    fontSize: 15,
    color: COLORS.primary700,
    borderRadius: 10,
  },
  nextBtn: {
    backgroundColor: COLORS.primary100,
    borderRadius: 8,
    marginTop: 10,
    padding: 11,
    width: 90,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    fontSize: 17,
  },
});
