import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../context/AppContext";

export default function SettingsScreen(){
    const {logOut} = useContext(AppContext)
    return(
        <View style={styles.container}>
            <Button title="Log Out" onPress={logOut}/>
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