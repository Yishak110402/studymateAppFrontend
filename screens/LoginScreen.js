import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS } from "../constants/COLORS";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function LoginScreen() {
  const [showError, setShowError]= useState(false)
  const { logIn, error, loggingIn, setError } = useContext(AppContext);
  const [logInData, setLogInData] = useState({
    email: "",
    pwd: "",
  });
  const [invalid, setInvalid] = useState({
    email: false,
    pwd: false,
  });
  const navigation = useNavigation();

  useLayoutEffect(function(){
    if(error === ""){
      setShowError(false)
      return
    }
    setShowError(true)
  },[error])

  function goToSignUp() {
    setError("")
    navigation.navigate("Sign Up");
  }

  function handleLogin() {
    setError("")
    setInvalid({
      email: false,
      pwd: false,
    });
    if (logInData.email === "" || logInData.pwd === "") {
      if (logInData.email === "") {
        setInvalid((prev) => ({ ...prev, email: true }));
      }
      if (logInData.pwd === "") {
        setInvalid((prev) => ({ ...prev, pwd: true }));
      }
      return;
    }
    const email = logInData.email;
    const pwd = logInData.pwd;
    logIn(email, pwd);
    console.log(error);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>StudyMate+</Text>
      </View>
      <Text style={styles.header}>Log In To Your Account</Text>
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[styles.input, invalid.email && styles.invalidInput]}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) =>
              setLogInData((prev) => ({ ...prev, email: text }))
            }
          />
          {invalid.email && (
            <Text style={styles.warningText}>You must enter a valid email</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={[styles.input, invalid.pwd && styles.invalidInput]}
            placeholder="********"
            secureTextEntry
            onChangeText={(text) =>
              setLogInData((prev) => ({ ...prev, pwd: text }))
            }
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
          onPress={handleLogin}
          android_ripple={{ color: COLORS.primary700 }}
          style={[styles.btnContainer, loggingIn && {opacity: 0.5, minWidth: 130}]}>
          <View>
            <Text style={[styles.btnText]}>{!loggingIn ?"Log In": "Logging In..."}</Text>
          </View>
        </Pressable>
        <View>
          <Pressable onPress={goToSignUp}>
            <View>
              <Text style={styles.navTxt}>I don't have an account</Text>
            </View>
          </Pressable>
        </View>
      </View>
      {showError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
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
    fontSize: 16,
    minWidth: 150,
    marginTop: 7,
    color: COLORS.primary700,
  },
  invalidInput: {
    backgroundColor: COLORS.error,
  },
  inputLabel: {
    fontSize: 16,
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
