import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const Contact = () => {
  return (
    <View style={style.container}>
      <Text>This is the contact page</Text>
      <TextInput
        style={style.input}
        placeholder="Full name"
        keyboardType="default"
      />
      <TextInput
        style={style.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={style.input}
        placeholder="Phone number"
        keyboardType="decimal-pad"
      />
      <TextInput
        style={style.input}
        placeholder="Message"
        keyboardType="default"
      />
      <Button title="Send" onPress={() => console.log("Send")}></Button>
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Contact;
