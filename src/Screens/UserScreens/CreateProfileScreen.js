import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const CreateProfileScreen = () => {
  const [text, onChangeText] = React.useState();
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder = "name"
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="age"
        keyboardType="numeric"
      />
       <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder = "neighborhood"
        value={text}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default CreateProfileScreen;