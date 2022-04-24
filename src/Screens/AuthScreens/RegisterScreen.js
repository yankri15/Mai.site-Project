import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { TextInput } from "react-native";
import AuthProvider, { useAuth } from "../../AuthProvider/AuthProvider";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            //alert('User has been created!')
        }
        catch (err) {
            setError('Failed to create an account')
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
                <Button title="Register" onPress={handleSubmit} disabled={loading} />
                <Text>Alreay have an account? <Text style={{ color: 'blue' }} onPress={() => { navigation.push('Login') }}>Login</Text></Text>
            </View>
        </AuthProvider>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 552583,
    },
});
