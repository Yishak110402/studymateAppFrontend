import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppContext } from "../context/AppContext";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import SummariesListItem from "../components/Summaries/SummariesListItem";
import { COLORS } from "../constants/COLORS";

export default function Summaries(){
    const navigation = useNavigation()
    const {getUserSummaries, loadingSummaries, summaries} = useContext(AppContext)
    useEffect(function(){
        // getUserSummaries()
    },[])
    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>Your Created Summaries</Text>
            <View>
                <SummariesListItem />
                <SummariesListItem />
                <SummariesListItem />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingBlock: 15,
        paddingInline: 10
    },
    headerText:{
        fontSize: 18,
        color:COLORS.primary100,
        textAlign:'center',
        marginBottom: 10
    }
    
})