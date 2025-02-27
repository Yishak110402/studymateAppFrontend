import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { COLORS } from "../../constants/COLORS";
import FlashCardFileSection from "./FlashCardFileSection";
import { useState } from "react";
import LoadingScreen from "../LoadingScreen";

export default function NewFlashCardFormPage() {
  const [invalidInput, setInvalidInput] = useState(false);
  const [showFileSelection, setShowFileSelection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flashCardName, setFlashCardName] = useState("");
  function showFileSelectionButton() {
    if (!flashCardName || flashCardName === "") {
      setInvalidInput(true);
      return;
    }
    setShowFileSelection(true);
    setInvalidInput(false);
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.inputLabel}>Give your flash card a name</Text>
        <TextInput
          style={[styles.input, invalidInput && styles.invalidInput]}
          placeholder="Name for the flashcard"
          autoCapitalize="words"
          autoCorrect={false}
          maxLength={25}
          onChangeText={(name) => setFlashCardName(name)}
        />
        <Pressable
          onPress={showFileSelectionButton}
          android_ripple={{ color: COLORS.primary700 }}
          style={styles.nextButtonContainer}>
          <View>
            <Text style={styles.nextButtonText}>Next</Text>
          </View>
        </Pressable>
      </View>
      {showFileSelection && <FlashCardFileSection setLoading={setLoading} />}
      {loading && <LoadingScreen text={"Generating Flashcards..."} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  inputContainer: {},
  input: {
    backgroundColor: COLORS.primary100,
    padding: 10,
    fontSize: 15,
    color: COLORS.primary700,
    borderRadius: 15,
  },
  invalidInput: {
    backgroundColor: COLORS.error,
  },
  inputLabel: {
    fontSize: 15,
    color: COLORS.primary100,
    marginLeft: 10,
    marginBottom: 15,
  },
  nextButtonContainer: {
    width: 60,
    backgroundColor: COLORS.primary100,
    marginTop: 16,
    padding: 5,
    marginLeft: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  nextButtonText: {
    color: COLORS.primary700,
    fontSize: 17,
  },
});
