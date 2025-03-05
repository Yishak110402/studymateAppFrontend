import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { COLORS } from "../constants/COLORS";
import { StyleSheet } from "react-native";

export default function DeleteButton({pressFuntion}){
    return(
        <View style={{overflow:'hidden'}}>
        <Pressable onPress={pressFuntion} android_ripple={{color: COLORS.primary700}} style={styles.container}>
            <View>
                <Ionicons name='trash' color={COLORS.primary700} size={32} />
            </View>
        </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        padding: 3,
        borderRadius: 1000,
        overflow:'hidden'
    }
})