import { useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppContext } from "../context/AppContext";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import SummariesListItem from "../components/Summaries/SummariesListItem";
import { COLORS } from "../constants/COLORS";
import { Ionicons } from "@expo/vector-icons";

export default function Summaries() {
  const navigation = useNavigation();
  const {
    getUserSummaries,
    loadingSummaries,
    summaries,
    createNewSummary,
    creatingSummary,
    setQuestion, 
    deletingConversation
  } = useContext(AppContext);
  useEffect(function () {
    getUserSummaries();
  }, []);
  return (
    <View style={styles.container}>
      {loadingSummaries && <LoadingScreen text={"Loading Summaries..."} />}
      <View>
        {deletingConversation && <LoadingScreen text={"Deleting Conversation"} />}
        {!loadingSummaries && summaries.length === 0 && (
          <View>
            <Text style={styles.noConvoText}>No Conversations Created</Text>
          </View>
        )}
        {!loadingSummaries && (
          <FlatList
            data={summaries}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return <SummariesListItem conversation={item} />;
            }}
          />
        )}
      </View>
      <TouchableOpacity onPress={createNewSummary}>
        <View style={styles.addBtnContainer}>
          <Ionicons name="add" color={COLORS.primary100} size={30} />
        </View>
      </TouchableOpacity>
      {creatingSummary && <LoadingScreen text={"Creating Conversation... "} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBlock: 15,
    paddingInline: 10,
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.primary100,
    textAlign: "center",
    marginBottom: 10,
  },
  addBtnContainer: {
    borderWidth: 2,
    borderColor: COLORS.primary300,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    alignSelf: "center",
    marginTop: 5,
    backgroundColor: COLORS.primary700,
  },
  noConvoText:{
    color: COLORS.primary700,
    textAlign:'center',
    fontSize:17,
    marginBottom: 10
  }
});
