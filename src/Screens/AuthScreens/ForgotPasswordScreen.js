import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AuthProvider, { useAuth } from "../../AuthProvider/AuthProvider";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleForgot() {
    try {
      setError("");
      setLoading(true);
      await resetPassword(email);
    } catch (err) {
      setError("Failed to reaet password");
      console.log(error + ":\n " + err);
    }
    setLoading(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>forgot password?</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Button title="Reset Password" onPress={handleForgot} />
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 150,
  },
  text: {
    color: "#333",
    fontSize: 24,
    marginLeft: 25,
  },
});
