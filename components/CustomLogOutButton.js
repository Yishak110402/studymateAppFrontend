import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AppContext } from "../context/AppContext";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants/COLORS";

export default function CustomLogOutButton(props) {
  const { logOut } = useContext(AppContext);
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>ABYSSINIA ACADEMY</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity onPress={logOut}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Log Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  buttonContainer:{
    backgroundColor: COLORS.primary500,
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 15,
    padding: 10,
  },
  buttonText:{
    color: COLORS.primary700,
    fontSize: 20
  },
  drawerHeader:{
    backgroundColor: COLORS.primary700,
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -15,
    // borderRadius: 18
    // borderBottomRightRadius: 18
  },
  drawerHeaderText:{
    fontSize: 35,
    color: "#f7f7f7",
    fontWeight: 600,
    textAlign:'center'
  }
});
