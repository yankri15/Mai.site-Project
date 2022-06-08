import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/global';
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useAuth } from "../../AuthProvider/AuthProvider";

const BlockedScreen = () => {
  const { logout } = useAuth();
  const [error, setError] = useState("");
  async function handleLogout() {
    try {
      setError("");
      await logout();
    } catch (err) {
      setError("Failed to logout");
      console.log(error + ":\n " + err);
    }
  }
  return (
    <View style={globalStyles.container_enter_screens}>
      <Octicons name="x" size={150} style={{ color: 'red' }}></Octicons>
      <Text style={{ fontSize: 30, color: 'black', fontWeight: "bold" }}>משתמש זה חסום!</Text>
      <Pressable
        onPress={handleLogout}
        style={{ flexDirection: 'row', marginTop: '20%' }}
      >
        <Text style={globalStyles.out_blue_btn}>{'התנתקות'}</Text>
        <Ionicons name="log-out-outline" size={20} style={{ color: 'blue', marginLeft: '1%' }}></Ionicons>
      </Pressable>
    </View>
  )
}

export default BlockedScreen