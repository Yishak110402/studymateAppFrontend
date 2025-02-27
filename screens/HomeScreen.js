import { BackHandler, StyleSheet, Text, View } from "react-native";
import OptionsList from "../components/HomeScreenComponents/OptionsList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  useFocusEffect(function () {
    function onBackPress() {
      return true;
    }
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  });
  const navigation = useNavigation();
  function goToGenerateFlashCards() {
    navigation.navigate("Generate Flashcards");
  }
  function goToGenerateQuestions() {
    navigation.navigate("Generate Questions");
  }
  return (
    <View style={styles.container}>
      <OptionsList
        pressFunction={goToGenerateFlashCards}
        optionName="Generate Flashcards"
        iconName="albums"
      />
      <OptionsList
        pressFunction={goToGenerateQuestions}
        optionName="Generate Questions"
        iconName="bulb"
      />
      <OptionsList optionName="Create Summary" iconName="document-text" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },
});
