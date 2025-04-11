import { useRoute } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Modal, ScrollView, Text, View } from "react-native";
import { COLORS } from "../constants/COLORS";
import { useState } from "react";

export default function OpenSummary() {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const conversation = route.params.conversation;
  console.log(conversation.conversations);
  
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View>
          <Text>Open Initial Summary</Text>
        </View>
      </TouchableOpacity>
      <Modal transparent visible={modalVisible} animationType='slide'>
        <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={()=>(setModalVisible(false))}>
                <View>
                    <Text style={styles.closeButtonText}>X</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.modalInnerContainer}>
          <ScrollView>
            <Text style={styles.summaryText}>{conversation.initialSummary}</Text>
          </ScrollView>
          </View>
        </View>
      </Modal>
      <View>
        
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    textAlign: "center",
    height: '100%'
  },
  modalInnerContainer: {
    width: "95%",
    height: '90%',
    backgroundColor: COLORS.primary300,
    alignSelf: "center",
    padding:10,
    paddingTop: 34,
    marginTop: 25,
    borderRadius: 15
  },
  summaryText:{
    fontSize: 13,
    lineHeight: 18
  },
  closeButton:{
    position:'absolute',
    zIndex: 100,
    top:10,
    right: 10,
    backgroundColor: COLORS.primary700,
    borderRadius:999,
    padding: 15,
    height: 50,
    width: 50,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  closeButtonText:{
    color:COLORS.primary100,
    fontSize: 15
  }
});
