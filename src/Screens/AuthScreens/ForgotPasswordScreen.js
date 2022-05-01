import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable, Alert } from "react-native";
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
      Alert.alert('Check your account ' + email + ' inbox')
      navigation.navigate('Login');
    } catch (err) {
      setError("Failed to reaet password");
      console.log(error + ":\n " + err);
      console.log(err.code);
      switch (err.code) {
        case 'auth/invalid-email':
          Alert.alert('Email pattern is wrong')
          break;
        case 'auth/user-not-found':
          Alert.alert('User not exist')
          break;
      }
    }
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
      <Text style={styles.need}>
        Remember now?{" "}
        <Text
          style={{ color: "blue", fontWeight: "bold" }}
          onPress={() => {
            navigation.push("Login");
          }}
        >
          Back to Login
        </Text>
      </Text>
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
  need: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 20,
    fontFamily: "sans-serif",
  },
});