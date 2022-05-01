import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const LandingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View>
                    <Text style={styles.title_text}>מנהיגות</Text>
                </View>
                <View>
                    <Text style={[styles.title_text, { paddingRight: 40 }]}>אקטיביזם</Text>
                </View>
                <View>
                    <Text style={[styles.title_text, { paddingRight: 92 }]}>יזמות</Text>
                </View>
            </View>
            <View style={styles.imageArea}>
                {/* megaphone icon */}
                <Ionicons name='megaphone-outline' size={150} ></Ionicons>
                {/* <Image source={require('../../../assets/megaphone.png')} style={styles.image}></Image> */}
            </View>
            <Pressable style={styles.log_button} title="Login" onPress={() => { navigation.navigate("Login"); }}>
                <Text style={styles.log_btn_text}>יאללה לעבודה</Text>
            </Pressable>
            <Pressable style={styles.reg_button} title="Register" onPress={() => { navigation.navigate("Register"); }}>
                <Text style={styles.reg_btn_text}>אופסי.. עוד לא נרשמתי</Text>
            </Pressable>
        </View>
    )
}

export default LandingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#a77ce8",
    },
    imageArea: {
        margin: 25,
    },
    // image: {
    //     flex: 1,
    //     height: 150,
    //     width: 150,
    //     backgroundColor: "#a77ce8",
    // },
    title: {
        //bottom: 80,
    },
    title_text: {
        color: "#fdc123",
        fontSize: 50,
        fontWeight: "bold",
        margin: -5,
    },
    reg_button: {
        alignItems: 'center',
        justifyContent: 'center',
        //top: 80,
        width: 180,
        marginTop: 2,
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 3,
        borderRadius: 7,
        elevation: 2,
        backgroundColor: "#000000",
    },
    reg_btn_text: {
        color: "#fdc123",
        fontSize: 15,
        fontWeight: "bold",
    },
    log_button: {
        alignItems: 'center',
        justifyContent: 'center',
        //top: 80,
        width: 180,
        marginTop: 15,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 3,
        borderRadius: 7,
        elevation: 2,
        backgroundColor: "#fdc123",
    },
    log_btn_text: {
        color: "#000000",
        fontSize: 15,
        fontWeight: "bold",
    },
});