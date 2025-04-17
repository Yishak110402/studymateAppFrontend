import { useContext, useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { AppContext } from "../context/AppContext";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants/COLORS";

export default function MainLoadingScreen(){
    const {verifyUser} = useContext(AppContext)
    useEffect(function(){
        verifyUser();
    },[])
    return(
        <View style={styles.container}>
            <Text style={styles.logo}>ABYSSINIA ACADEMY</Text>
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 45,
    fontWeight: "bold",
    color: COLORS.primary700,
    marginBottom: 55,
  },
  loadingText: {
    color: COLORS.primary700,
    fontSize: 17,
    fontWeight:'300'
  },
});