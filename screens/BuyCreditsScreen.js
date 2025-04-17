import { Alert, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/COLORS";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigation } from "@react-navigation/native";

export default function BuyCreditsScreen() {
  const [flashcardsNum, setFlashcardsNum] = useState("0");
  const [questionsNum, setQuestionsNum] = useState("0");
  const {currentUser, localip, ip} = useContext(AppContext)
  const [ordering, setOrdering] = useState(false)
  const navigation = useNavigation()
  const createOrder = async()=>{
    setOrdering(true)
    console.log("Creating order")
    Keyboard.dismiss()
    const totalAmount = Number(flashcardsNum) * 15 + Number(questionsNum) * 15
    if(totalAmount < 100){
        Alert.alert("Minimum purchase amount is 100 Birr.")
        setOrdering(false)
        return
    }
    const order = {
        createdBy: currentUser.id,
        orderTotalAmount: totalAmount,
        numFlashcards: Number(flashcardsNum),
        numQuestions: Number(questionsNum) 
    }
    const res = await fetch(`${ip}/order`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(order)
    })
    if(!res.ok){
        Alert.alert("Something went wrong. Please try again.")
        setOrdering(false)
        return
    }
    const data = await res.json()    
    if(data.status === "fail"){
        Alert.alert(data.message)
        setOrdering(false)
        return
    }
    Alert.alert("Purchase Successfull!!!",`Your order number is ${data.data.id}. Please keep this number because you won't see it again.`)
    setOrdering(false)    
    navigation.navigate("Main")
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buy Credits</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.numberInput}
          keyboardType="number-pad"
          autoCapitalize="none"
          onChangeText={(text) => setFlashcardsNum(text)}
          value={flashcardsNum}
        />
        <Text style={styles.inputLabel}>Flashcards</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.numberInput}
          keyboardType="number-pad"
          autoCapitalize="none"
          onChangeText={(text) => setQuestionsNum(text)}
          value={questionsNum}
        />
        <Text style={styles.inputLabel}>Questions</Text>
      </View>
      <View>
        <Text style={styles.totalPrice}>
          Total Price: {Number(flashcardsNum) * 15 + Number(questionsNum) * 15} Birr
        </Text>
        <Pressable
        onPress={createOrder}
          android_ripple={{ color: COLORS.primary700 }}
          style={styles.placeOrderButton}>
          <View>
            <Text style={styles.placeOrderText}>Place Order</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.stepsContainer}>
        <Text style={styles.stepsHeader}>Steps on how to buy credit</Text>
        <View>
          <Text style={styles.step}>
            1. Enter the amount of flashcards and questions you want to buy.
          </Text>
          <Text style={styles.step}>
            2. Once you're done place the order and keep the order number that
            you will receive
          </Text>
          <Text style={styles.step}>
            3. Transfer the total amount with TeleBirr to the number{" "}
            <Text style={styles.phoneNumber}>+251991737081.</Text>
          </Text>
          <Text style={styles.step}>
            4. Send the order number and the screenshot to the telegram account
            @studymateplus
          </Text>
          <Text style={styles.step}>
            5. Your purchase will be verified within 20 minutes you will receive
            your credits
          </Text>
        </View>
      </View>
      {ordering && <LoadingScreen text={"Ordering..."} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  header: {
    fontSize: 35,
    color: COLORS.primary700,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  numberInput: {
    backgroundColor: COLORS.primary300,
    width: 40,
    padding: 5,
    textAlign: "center",
    borderRadius: 10,
    elevation: 3,
    marginRight: 10,
    fontSize: 18,
  },
  inputLabel: {
    fontSize: 18,
    color: COLORS.primary700,
  },
  totalPrice: {
    fontSize: 21,
    color: COLORS.primary700,
    fontWeight: "bold",
    marginBottom: 15,
  },
  placeOrderButton: {
    backgroundColor: COLORS.primary300,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  placeOrderText: {
    fontSize: 18,
    color: COLORS.primary700,
  },
  stepsContainer: {
    backgroundColor: COLORS.primary100,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderRadius: 10,
    elevation: 3
  },
  stepsHeader: {
    fontSize: 21,
    color: COLORS.primary700,
    marginBottom: 10,
  },
  step: {
    fontSize: 14,
    marginBottom: 7,
  },
  phoneNumber: {
    textDecorationLine: "underline",
  },
});
