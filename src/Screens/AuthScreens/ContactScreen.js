import React, { useState }  from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import email from "react-native-email";

const Contact = ({ navigation }) => {
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleMsg() {
    try {
      setError("");
      setLoading(true);
      const to = "maiappjlm@gmail.com";
      email(to, {
        subject: subject,
        body: msg,
      }).catch(console.error);
    } catch (err) {
      console.error;
    }
    setLoading(false);
    navigation.navigate("Settings");
  }

  return (
    <View style={style.container}>
      <Text>צור קשר</Text>
      <TextInput
        placeholder="נושא"
        value={subject}
        onChangeText={(text) => setSubject(text)}
      />

      <TextInput
        placeholder="מה תרצו להגיד לנו?"
        value={msg}
        onChangeText={(text) => setMsg(text)}
      />
      <Button title="שלח!" onPress={handleMsg} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Contact;
