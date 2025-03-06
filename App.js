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
import CreateSummary from "./screens/CreateSummary";
import { AppProvider } from "./context/AppContext";
import NewFlashCardFormPage from "./components/FlashCards/NewFlashCardFormPage";
import OpenFlashCardScreen from "./screens/OpenFlashCardScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import OpenQuestionScreen from "./screens/OpenQuestionScreen";
import CreateQuestionsForm from "./components/Questions/CreateQuestionsForm";
import UserBalanceDetails from "./components/UserBalanceDetails";
import MainLoadingScreen from "./screens/MainLoadingScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavFlow() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.primary300,
        },
        drawerItemStyle:{
          marginVertical: 2,
          marginHorizontal: -12,
          borderRadius:0,
          paddingHorizontal: 5
        },
        drawerInactiveTintColor: COLORS.primary700,
        drawerActiveTintColor: COLORS.primary100,
        drawerActiveBackgroundColor: COLORS.primary700,
        headerStyle: {
          backgroundColor: COLORS.primary100,
        },
        headerTintColor: COLORS.primary700,
        sceneStyle: { backgroundColor: COLORS.primary700 },
        headerTitleStyle:{
          fontSize: 18
        },
        drawerType:'slide',
        headerRight:()=>{
          return <UserBalanceDetails />
        }
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Saved Flashcards" component={SavedFlashCards} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="inverted" translucent />
        <NavigationContainer>
          <AppProvider>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor:COLORS2.primary700
                },
                headerStyle: {
                  backgroundColor: COLORS2.primary300,
                },
                headerTintColor: COLORS.primary700,
                headerTitleStyle:{
                  fontSize: 18
                },
                animation:'slide_from_right'
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
                name="Create Summary"
                component={CreateSummary}
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
            </Stack.Navigator>
          </AppProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </>
  );
}
