import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { COLORS } from "../constants/COLORS";

export default function AddNewButton({pressFunction}){
    return(
        <Pressable onPress={pressFunction}>
            <View>
                <Ionicons name="add" color={COLORS.primary700} size={30} />
            </View>
        </Pressable>
    )
}