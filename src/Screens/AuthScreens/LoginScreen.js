import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
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

            const uid = await login(email, password);
            console.log(uid);
            try {
                console.log(uid);
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch (err) {
                console.log(err);
            }
            //alert('User logged in')
        } catch (err) {
            setError("Failed to login");
            console.log(error + ":\n " + err);
            Alert.alert('Email or password are incorrect');
        }
        setLoading(false);
    }

    return (
        <AuthProvider>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                <Pressable style={styles.button} title="Login"
                    onPress={handleLogin}
                    disabled={loading}>
                    <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}>LOGIN</Text>
                </Pressable>
                <Text style={styles.need}>
                    Need an account?{" "}
                    <Text style={{ color: "blue", fontWeight: "bold" }} onPress={() => {
                        navigation.navigate("Register");
                    }}>
                        Register
                    </Text>
                </Text>
                <Text style={styles.forgot} onPress={() => {
                    navigation.navigate("ForgotPassword");
                }}>
                    Forgot password?
                </Text>
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
        backgroundColor: "#ffc823",
    },
    textInput: {
        borderColor: "black",
        width: 250,
        padding: 5,
        paddingLeft: 10,
        fontSize: 20,
        borderWidth: 2,
        marginBottom: 4,
        textAlign: "left",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: "#ffeeee",
    },
    need: {
        marginTop: 4,
        marginBottom: 4,
        fontSize: 20,
        fontFamily: "sans-serif",
    },
    forgot: {
        fontSize: 20,
        fontFamily: "sans-serif",
        color: "gray",
        fontWeight: "bold",
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
        backgroundColor: "#6495ED",
    },
});