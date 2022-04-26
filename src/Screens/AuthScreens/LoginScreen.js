import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { TextInput } from "react-native";
import AuthProvider, { useAuth } from "../../AuthProvider/AuthProvider";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            //alert('User logged in')
        }
        catch (err) {
            setError('Failed to login')
            console.log(error + ":\n " + err);
        }
        setLoading(false);
    }

    return (
        <AuthProvider>
            <View style={styles.container}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                />
                <Button title="Login" onPress={handleLogin} disabled={loading} />
                <Text>Need an account? <Text style={{ color: 'blue' }} onPress={() => { navigation.navigate('Register') }}>Register</Text></Text>
                <Text style={{ color: 'yellow' }} onPress={() => { navigation.navigate('ForgotPassword') }}>Forgot password?</Text>
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
        backgroundColor: 552583,
    },
});
