import { StyleSheet, Text, View } from "react-native";

export default function SettingsScreen(){
    return(
        <View style={styles.container}>
            <Text>This is the Settings Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})