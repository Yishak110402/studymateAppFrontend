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
        width:"110%",
        height:700,
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        zIndex: 1000,
        backgroundColor:"rgba(0,0,0,0.6)",
        flex: 1
    },
    loadingText:{
        fontSize: 28,
        color:COLORS.primary100
    }

})