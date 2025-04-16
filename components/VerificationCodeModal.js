import { Alert, Keyboard, Pressable, StyleSheet } from "react-native";
import { Modal, Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/COLORS";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../context/AppContext";

export default function VerificationCodeModal({
  visible,
  pressFunction,
  signUpData,
}) {
  const [input, setInput] = useState("");
  const {setVerificationModalVisible} = useContext(AppContext)
  const closeModal = ()=>{
    setVerificationModalVisible(false)
  }
  async function handleVerification() {
    Keyboard.dismiss();
    const code = await AsyncStorage.getItem("verification");    
    if (!code) {
      console.log("No verification code found");
      return;
    }
    const parsedCode = JSON.parse(code);
    
    if (input.length !== 6){
      return
    };
    if (Number(input) !== parsedCode) {
      Alert.alert("Verification Failed", "Incorrect Verification Code entered");
      return;
    }
    setVerificationModalVisible(false)
    pressFunction(signUpData.name, signUpData.email, signUpData.pwd);
  }
  useEffect(
    function () {
      if (input.length < 6) {
        return;
      }
      handleVerification();
    },
    [input]
  );
  return (
    <Modal
      animationType="slide"
      transparent
      style={styles.container}
      visible={visible}>
      <View style={styles.container}>
        <Pressable onPress={closeModal} android_ripple={{color:COLORS.primary100}} style={styles.closeButton}>
          <View>
            <Text style={styles.closeButtonText}>X</Text>
          </View>
        </Pressable>
        <View style={styles.innerContainer}>
          <Text style={styles.verificationText}>
            Please enter the verification code we sent to your email.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="123456"
            onChangeText={(text) => {
              if (text.length > 6) {
                return;
              }
              setInput(text);
            }}
            keyboardType="number-pad"
          />
          <Pressable
            android_ripple={{ color: COLORS.primary300 }}
            onPress={handleVerification}
            style={styles.verifyButton}>
            <View>
              <Text style={styles.buttonText}>Verify</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: COLORS.primary500,
    paddingVertical: 35,
    borderRadius: 10,
    width: "90%",
    paddingHorizontal: 15,
    // height: "20%"
  },
  verificationText: {
    fontSize: 20,
    color: COLORS.primary700,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.primary100,
    borderWidth: 1,
    borderColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 8,
    fontSize: 14,
    minWidth: 150,
    marginTop: 7,
    color: COLORS.primary700,
    letterSpacing: 2,
    marginBottom: 15,
  },
  verifyButton: {
    backgroundColor: COLORS.primary700,
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
  },
  buttonText: {
    color: COLORS.primary100,
    fontSize: 14,
    fontWeight: "bold",
  },
  closeButton:{
    position:'absolute',
    top:250,
    right: 20,
    backgroundColor:COLORS.primary700,
    padding:5,
    borderRadius:50,
    zIndex: 100000,
    width:50,
    height: 50,
    alignItems:'center',
    justifyContent:'center'
  },
  closeButtonText:{
    color:COLORS.primary300,
    fontSize: 20
  }
});
