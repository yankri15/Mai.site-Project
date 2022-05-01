import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Alert, Image } from "react-native";
import { TextInput } from "react-native";
import AuthProvider, { useAuth } from "../../AuthProvider/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        try {
            setError("");
            setLoading(true);

            await login(email, password);

        } catch (err) {
            setError("Failed to login");
            console.log(error + ":\n " + err);
            switch (err.code) {
                case 'auth/invalid-email':
                    Alert.alert('Email pattern is wrong')
                    break;
                case 'auth/user-not-found':
                    Alert.alert('User not exist')
                    break;
                case 'auth/wrong-password':
                    Alert.alert('Wrong password')
                    break;
            }
        }
        setLoading(false);
    }

    return (
        <AuthProvider>
            <View style={styles.container}>
                <View style={styles.profileImage}>
                    <Image source={require('../../../assets/app_icon.png')} style={styles.image} resizeMode="center"></Image>
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="מייל"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="סיסמה"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                <Pressable style={styles.button} title="Login"
                    onPress={handleLogin}
                    disabled={loading}>
                    <Text style={styles.btn_text}>כנס</Text>
                </Pressable>
                <Text style={styles.forgot} onPress={() => { navigation.navigate("ForgotPassword"); }}>שכחתי סיסמה</Text>
            </View>
        </AuthProvider>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#a77ce8",
    },
    profileImage: {
        width: 100,
        height: 100,
        bottom: 80,
        borderRadius: 100,
        overflow: "hidden",
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
    },
    textInput: {
        borderColor: "black",
        width: 250,
        padding: 5,
        paddingRight: 10,
        fontSize: 17,
        borderWidth: 2,
        marginBottom: 4,
        textAlign: "right",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: "#ffeeee",
    },
    btn_text: {
        color: "#000000",
        fontSize: 20,
        fontWeight: "bold",
    },
    need: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontFamily: "sans-serif",
        fontWeight: "bold",
    },
    press_register: {
        color: "#fdc123",
        fontWeight: "bold",
        textDecorationLine: 'underline',
    },
    forgot: {
        marginTop: 25,
        fontSize: 15,
        fontFamily: "sans-serif",
        color: "#000000",
        textDecorationLine: 'underline'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 35,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#fdc123",
    },
});