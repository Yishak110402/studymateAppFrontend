import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/COLORS";
import QuestionsListItem from "../components/Questions/QuestionsListItem";

export default function GenerateQuestions(){
    return(
        <View style={styles.container}>
            <QuestionsListItem />
            <QuestionsListItem />
            <QuestionsListItem />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 15,
        flex: 1
    }
})