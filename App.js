import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import SavedFlashCards from "./screens/SavedFlashCardsScree";
import { COLORS, COLORS2 } from "./constants/COLORS";
import { StatusBar } from "expo-status-bar";
import GenerateFlashCards from "./screens/GenerateFlashCards";
import GenerateQuestions from "./screens/GenerateQuestions";
import { AppProvider } from "./context/AppContext";
import NewFlashCardFormPage from "./components/FlashCards/NewFlashCardFormPage";
import OpenFlashCardScreen from "./screens/OpenFlashCardScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import OpenQuestionScreen from "./screens/OpenQuestionScreen";
import CreateQuestionsForm from "./components/Questions/CreateQuestionsForm";
import UserBalanceDetails from "./components/UserBalanceDetails";
import MainLoadingScreen from "./screens/MainLoadingScreen";
import BuyCreditsScreen from "./screens/BuyCreditsScreen";
import Summaries from "./screens/CreateSummary";
import OpenSummary from "./screens/OpenSummary";
import CustomLogOutButton from "./components/CustomLogOutButton";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavFlow() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props)=> <CustomLogOutButton {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#f7f7f7",
        },
        drawerItemStyle:{
          marginVertical: 2,
          marginHorizontal: -12,
          borderRadius:0,
          paddingHorizontal: 5,
          justifyContent:'center',
          // alignItems:'center'
        },
        drawerLabelStyle:{
          fontSize: 16
        },
        drawerInactiveTintColor: COLORS.primary700,
        drawerActiveTintColor: COLORS.primary100,
        drawerActiveBackgroundColor: COLORS.primary700,
        headerStyle: {
          backgroundColor: "#f7f7f7",
          borderBottomWidth: 0
        },
        headerTintColor: COLORS.primary700,
        sceneStyle: { backgroundColor: "#f7f7f7" },
        headerTitleStyle:{
          fontSize: 18
        },
        drawerType:'slide',
        headerRight:()=>{
          return <UserBalanceDetails />
        },
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{
        drawerIcon: ({color})=>{
          return <Ionicons name='home' color={color} size={25}/>
        }
      }} />
      <Drawer.Screen name="Buy Credits" component={BuyCreditsScreen} options={{
        drawerIcon: (color)=>{
          return <Ionicons name="cash" color={color} size={25}/>
        }
      }}  />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="dark" translucent={true} />
        <NavigationContainer>
          <AppProvider>
            <Stack.Navigator
              screenOptions={{
              
                headerShown: false,
                contentStyle: {
                  backgroundColor: "#f7f7f7"
                },
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: COLORS.primary700,
                headerTitleStyle:{
                  fontSize: 16
                },
                animation:'fade',
                headerBlurEffect: 'systemChromeMaterial'
        
              }}
              initialRouteName={"Main Loading"}>
              <Stack.Screen name="Main Loading" component={MainLoadingScreen} />
              <Stack.Screen name="Sign Up" component={SignUpScreen} />
              <Stack.Screen name="Log In" component={LoginScreen} />
              <Stack.Screen name="Main" component={DrawerNavFlow} />
              <Stack.Screen
                name="Generate Flashcards"
                component={GenerateFlashCards}
                options={{ headerShown: true, title: "Your Flashcards" }}
              />
              <Stack.Screen
                name="Generate Questions"
                component={GenerateQuestions}
                options={{ headerShown: true, title:"Your Questions" }}
              />
              <Stack.Screen
                name="Summaries"
                component={Summaries}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Create Flashcard"
                component={NewFlashCardFormPage}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Open FlashCard"
                component={OpenFlashCardScreen}
                options={{ headerShown: true }}
              />
              <Stack.Screen name="Open Question" component={OpenQuestionScreen} options={{headerShown: true}} />
              <Stack.Screen name="Create Question" component={CreateQuestionsForm} options={{headerShown: true}} />
              <Stack.Screen name = "Open Summary" component={OpenSummary} options={{headerShown: true}} />
            </Stack.Navigator>
          </AppProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </>
  );
}
