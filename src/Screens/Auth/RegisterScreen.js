import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const monitorAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Contact");
      } else {
        alert("User not logged in");
      }
    });
  };
  const RegisterUser = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((ret) => {
        console.log(ret);
        monitorAuthState();
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
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

      <Button title="Register" onPress={RegisterUser} />
    </View>
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
