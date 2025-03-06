import { Ionicons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/COLORS";

export default function AddNewButton({pressFunction}){
    const pressed = ()=> console.log("pressed");
    
    return(
        <TouchableOpacity style={{ padding: 10, }} onPress={pressFunction}>
            <View>
                <Ionicons name="add" color={COLORS.primary700} size={35} />
            </View>
        </TouchableOpacity>
    )
}