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
  }
});
