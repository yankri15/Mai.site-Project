import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { TextInput } from "react-native";
import AuthProvider, { useAuth } from "../../AuthProvider/AuthProvider";
import { db } from "../../../firebase";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setError("");
      setLoading(true);
      const uid = await signup(email, password);
      await setDoc(doc(db, "users", uid), {
        status: 0,
      });
      navigation.navigate("FillDetails");
    } catch (err) {
      setError("Failed to create an account");
      console.log(error + ":\n " + err);
      switch (err.code) {
        case "auth/invalid-email":
          Alert.alert("Email pattern is wrong");
          break;
        case "auth/weak-password":
          Alert.alert("password too weak");
          break;
      }
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
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          value={ConfirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
        <Pressable
          style={styles.button}
          title="Register"
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={{ color: "#ffffff", fontSize: 20 }} >REGISTER</Text>
        </Pressable>
        <Text style={styles.need}>
          Alreay have an account?{" "}
          <Text
            style={{ color: "blue", fontWeight: "bold" }}
            onPress={() => {
              navigation.push("Login");
            }}
          >
            Login
          </Text>
        </Text>
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
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#6495ED",
  },
});