import { Pressable, StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/COLORS";
import QuestionsListItem from "../components/Questions/QuestionsListItem";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function GenerateQuestions(){
    const navigation = useNavigation()
    const goToCreateQuestions = () =>{
        navigation.navigate("Create Question")
    }
    return(
        <View style={styles.container}>
            <QuestionsListItem />
            <QuestionsListItem />
            <QuestionsListItem />
            <View>
                <Pressable onPress={goToCreateQuestions} android_ripple={{color:COLORS.primary700}} style={styles.addBtnContainer}>
                    <View>
                        <Ionicons name="add" size={26} color={COLORS.primary700} />
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 15,
        flex: 1,
        alignItems:'center'
    },
    addBtnContainer:{
        backgroundColor:COLORS.primary100,
        padding: 5,
        width: 40,
        height: 40,
        justifyContent:"center",
        alignItems:'center',
        borderRadius: 100,

    }
})