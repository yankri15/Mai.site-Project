import React, { useState } from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import { useAuth } from "../AuthProvider/AuthProvider";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useData } from "../AuthProvider/UserDataProvider";
import { globalStyles } from "../styles/global";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const CustomDrawer = (props) => {
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const { name, getName } = useData();

  async function handleLogout() {
    try {
      setError("");
      await logout();
    } catch (err) {
      setError("Failed to logout");
      console.log(error + ":\n " + err);
    }
  }

  getName();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#a77ce8" }}>
        <Image
          source={require("../../assets/profile-pic.png")}
          style={globalStyles.drawer_pic}
        />
        <Text style={globalStyles.drawer_name}>{name}</Text>
        <View style={globalStyles.drawer_props}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={globalStyles.sign_out_area}>
        <TouchableOpacity style={globalStyles.sign_out} onPress={handleLogout}>
          <Text style={globalStyles.sign_out_text}>Sign out</Text>
          <Ionicons name='log-out-outline' size={20} ></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
