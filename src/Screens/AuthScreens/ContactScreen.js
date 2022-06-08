import React, { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import email from "react-native-email";
import { globalStyles } from "../../styles/global";

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
    <View style={[globalStyles.global, globalStyles.settingsContainer]}>
      <Text style={globalStyles.forum_title_text}>צור קשר</Text>
      <TextInput
        style={globalStyles.textInput}
        placeholder="נושא"
        value={subject}
        onChangeText={(text) => setSubject(text)}
      />

      <TextInput
        style={globalStyles.msg_text}
        placeholder="מה תרצו להגיד לנו?"
        value={msg}
        onChangeText={(text) => setMsg(text)}
      />
      <Pressable
        style={globalStyles.settingsBtn}
        title="send"
        onPress={handleMsg}
      >
        <Text style={globalStyles.settingsBtnText}>שלח!</Text>
      </Pressable>
    </View>
  );
};

export default Contact;
