import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { useAuth } from "../../AuthProvider/AuthProvider";

const ForgotPasswordScreen = ({ navigation }) => {
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
    navigation.navigate('Login');
    setLoading(false);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>forgot password?</Text>
      <TextInput style={styles.textInput}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Pressable style={styles.button} title="Reset Password" onPress={handleForgot}>
        <Text>Reset Password</Text>
      </Pressable>
    </View>
  );
};

export default ForgotPasswordScreen;

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
    fontSize: 17,
    borderWidth: 2,
    marginBottom: 4,
    textAlign: "left",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#ffeeee",
  },
  title: {
    top: 1,
    marginBottom: 30,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "sans-serif",
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