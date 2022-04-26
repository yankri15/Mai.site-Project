import React, { useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAuth } from "../AuthProvider/AuthProvider";
import { View, Image, Text, TouchableOpacity } from "react-native";

const CustomDrawer = (props) => {
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
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#552583" }}
      >
        <Image
          source={require("../../assets/profile-pic.png")}
          style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
        />
        <Text style={{ color: "#fff", fontSize: 18 }}>Adam Ariel</Text>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={handleLogout}>
          <Text
            style={{
              fontSize: 15,
            }}
          >
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
