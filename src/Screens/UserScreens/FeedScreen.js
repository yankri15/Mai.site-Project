import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../AuthProvider/AuthProvider";

const FeedScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    try {
      setError("");
      await logout();
      //alert('User logged out')
    } catch (err) {
      setError("Failed to logout");
      console.log(error + ":\n " + err);
    }
  }

  return (
    <View>
      <Text>FeedScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default FeedScreen;
