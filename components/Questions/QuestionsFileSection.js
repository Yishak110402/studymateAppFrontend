import { Pressable, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants/COLORS";

export default function QuestionsFileSection() {
    return (
        <View>
            <Pressable style={styles.buttonContainer}>
                <View>
                    <Text>Select File</Text>
                </View>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{

    },
    buttonContainer:{
        backgroundColor:COLORS.primary100,
        width: 100
    }
})