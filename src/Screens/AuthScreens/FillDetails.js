import { View, Text } from "react-native";
import React from "react";
import AuthProvider, { useAuth } from "../../AuthProvider/AuthProvider";

const FillDetails = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  return (
    <AuthProvider>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          value={ConfirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Age"
          value={age}
          onChangeText={(text) => setAge(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="neighborhood"
          value={neighborhood}
          onChangeText={(text) => setNeighborhood(text)}
        />
      </View>
    </AuthProvider>
  );
};

export default FillDetails;
