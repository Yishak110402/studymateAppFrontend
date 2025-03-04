import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/COLORS";

export default function CustomModal({isVisible, setIsVisible, text}){
    const closeModal = ()=>{
        setIsVisible(false)
    }
    return(
        <Modal animationType='fade'  visible={isVisible} transparent>
            <View style={styles.outerShade}>
                <View style={styles.innerContainer}>
                    <Text style={styles.titleText}>{text}</Text>
                    <Pressable style={styles.closeBtn} onPress={closeModal}>
                        <View>
                            <Text>Close</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    outerShade:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        zIndex: 1000,
        backgroundColor:"rgba(0,0,0,0.57)",
        flex: 1
    },
    innerContainer:{
        paddingHorizontal: 15,
        paddingVertical: 30,
        backgroundColor:COLORS.primary300,
        borderRadius: 12,
        width:"80%",
        alignItems:"center"
    },
    titleText:{
        fontSize: 20,
        color:COLORS.primary700,
        marginBottom: 10
    },
    closeBtn:{
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        padding: 5
    }
})