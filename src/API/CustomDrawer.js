import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useData } from "../AuthProvider/UserDataProvider";
import { globalStyles } from "../styles/global";
const defaultImage = require("../../assets/default_profile_pic.jpg");

const CustomDrawer = (props) => {
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const { name, getName, image } = useData();

  async function handleLogout() {
    try {
      setError("");
      await logout();
    } catch (err) {
      setError("Failed to logout");
      console.log(error + ":\n " + err);
    }
  }

  useEffect(() => {
    getName();
    return;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#C4A5F3" }}
      >
        <View style={globalStyles.draw_pic_name}>
          <Image
            source={image ? { uri: image } : defaultImage}
            style={globalStyles.drawer_pic}
          />
          <Text style={globalStyles.drawer_name}>{name}</Text>
        </View>
        <View style={globalStyles.drawer_props}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={globalStyles.sign_out_area}>
        <TouchableOpacity style={globalStyles.sign_out} onPress={handleLogout}>
          <Text style={globalStyles.sign_out_text}>התנתקות</Text>
          <Ionicons name="log-out-outline" size={20}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
