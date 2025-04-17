import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/COLORS";

export default function LoadingScreen({text}){
    return(
        <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>{text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    loadingContainer:{
        width:"140%",
        height:"2100%",
        // justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        zIndex: 1000,
        backgroundColor:"rgba(0,0,0,0.8)",
        flex: 1,
        left: -65,
        top: -15
    },
    loadingText:{
        fontSize: 24,
        color:COLORS.primary100,
        marginTop: 350
    }

})