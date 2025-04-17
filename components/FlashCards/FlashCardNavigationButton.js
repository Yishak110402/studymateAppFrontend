import { Pressable, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/COLORS";

export default function FlashCardNavigationButton({text, pressFunction}){
    return(
            <Pressable onPress={pressFunction} android_ripple={{color:COLORS.primary700}} style={styles.buttonContainer}>
                <View>
                    <Text style={styles.buttonText}>{text}</Text>
                </View>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        width:85,
        backgroundColor:COLORS.primary700,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        padding: 6,
        paddingVertical: 10,
        borderRadius: 8
    },
    buttonText:{
        fontSize: 16,
        color:COLORS.primary100
    }
})