import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Alert,
  BackHandler,
  Button,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS } from "../constants/COLORS";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VerificationCodeModal from "../components/VerificationCodeModal";

export default function SignUpScreen() {
useFocusEffect(function(){
  const onBackPress = () =>{
    return true
  }
  BackHandler.addEventListener('hardwareBackPress', onBackPress)
  return ()=>{
    BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  }
})
  const [showError, setShowError] = useState(false);
  const { error, signingUp, setError, getVerificationCode } = useContext(AppContext);
  const [invalid, setInvalid] = useState({
    name: false,
    email: false,
    pwd: false,
  });
  const { signUp, verificationModalVisible, verificationCode } = useContext(AppContext);
  const [signUpData, setSignUpData] = useState({
    name: "",
    
    email: "",
    pwd: "",
  });
  const navigation = useNavigation();

  useEffect(
    function () {
      if (error === "") {
        return;
      }
      setShowError(true);
    },
    [error]
  );

  useLayoutEffect(function(){
    async function checkUser(){
      const user = await AsyncStorage.getItem("current-user")
      if(user || user.name !== ""){
        navigation.navigate("Main")
      }     
    }
    checkUser()
  },[])

  function goToLogIn() {
    setError("")
    navigation.navigate("Log In");
  }
  async function handleSignUpAndNavigation() {
    Keyboard.dismiss();
    if(signingUp) return
    setInvalid({
      name: false,
      email: false,
      pwd: false,
    });
    if (
      signUpData.name === "" ||
      signUpData.email === "" ||
      signUpData.pwd === ""
    ) {
      if (signUpData.name === "") {
        setInvalid((prev) => ({ ...prev, name: true }));
      }
      if (signUpData.email === "") {
        setInvalid((prev) => ({ ...prev, email: true }));
      }
      if (signUpData.pwd === "") {
        setInvalid((prev) => ({ ...prev, pwd: true }));
      }
      return;
    }
    const name = signUpData.name;
    const email = signUpData.email;
    const pwd = signUpData.pwd;
    getVerificationCode(email)
    // signUp(name, email, pwd);
  }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>StudyMate+</Text>
      </View>
      <Text style={styles.header}>Create An Account</Text>
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={[styles.input, invalid.name && styles.invalidInput]}
              placeholder="Gemechis Hagos"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(text) => {
                setSignUpData((prev) => ({ ...prev, name: text }));
              }}
            />
            {invalid.name && (
              <Text style={styles.warningText}>You must enter a name</Text>
            )}
          </View>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[styles.input, invalid.email && styles.invalidInput]}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setSignUpData((prev) => ({ ...prev, email: text }));
            }}
          />
          {invalid.email && (
            <Text style={styles.warningText}>You must enter a valid email</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            onChangeText={(text) => {
              setSignUpData((prev) => ({ ...prev, pwd: text }));
            }}
            style={[styles.input, invalid.pwd && styles.invalidInput]}
            placeholder="********"
            secureTextEntry
            autoCapitalize="none"
          />
          {invalid.pwd && (
            <Text style={styles.warningText}>
              You must enter a valid password
            </Text>
          )}
        </View>
      </View>
      <View>
        <Pressable
          android_ripple={{ color: COLORS.primary700 }}
          style={[
            styles.btnContainer,
            signingUp && { opacity: 0.5, minWidth: 130 },
          ]}
          onPress={handleSignUpAndNavigation}>
          <View>
            <Text style={styles.btnText}>
              {!signingUp ? "Sign Up" : "Signing Up..."}
            </Text>
          </View>
        </Pressable>
        <View>
          <Pressable onPress={goToLogIn}>
            <View>
              <Text style={styles.navTxt}>Already Have An Account? Log In</Text>
            </View>
          </Pressable>
        </View>
      </View>
      {showError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <VerificationCodeModal
        visible={verificationModalVisible}
        pressFunction={signUp}
        signUpData={signUpData}
        
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 18,
  },
  logoContainer: {
    justifyContent: "flex-end",
  },
  logo: {
    fontSize: 46,
    textAlign: "center",
    color: COLORS.primary700,
    fontWeight: "bold",
    marginBottom: 25,
  },
  inputContainer: {
    marginVertical: 9,
  },
  header: {
    fontSize: 25,
    color: COLORS.primary700,
    fontWeight: "bold",
    marginBottom: 7,
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
  },
  invalidInput: {
    backgroundColor: COLORS.error,
  },
  inputLabel: {
    fontSize: 13,
    color: COLORS.primary700,
    marginLeft: 6,
  },
  btnContainer: {
    backgroundColor: COLORS.primary500,
    maxWidth: 85,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 8,
    marginVertical: 10,
  },
  btnText: {
    color: COLORS.primary700,
    fontSize: 15,
  },
  navTxt: {
    color: COLORS.primary700,
    fontSize: 14,
  },
  warningText: {
    color: "red",
    fontSize: 14,
  },
  errorContainer: {
    backgroundColor: COLORS.error,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
  },
  errorText: {
    color: COLORS.errorText,
    fontSize: 16,
    textAlign: "center",
  },
});
