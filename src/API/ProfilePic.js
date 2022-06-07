import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import { globalStyles } from "../styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useData } from "../AuthProvider/UserDataProvider";

const ProfilePic = ({ navigation }) => {
  const { image } = useData();
  const defaultImage = require("../../assets/default_profile_pic.jpg");

  return (
    <SafeAreaView style={globalStyles.hamburger_profile_pic}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons
          style={{ color: "#c8c8c8" }}
          name="menu-outline"
          size={35}
        ></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.touchable_profile_pic}
        onPress={() => navigation.navigate("פרופיל")}
      >
        <Image
          source={image ? { uri: image } : defaultImage}
          style={globalStyles.touchable_profile_pic}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfilePic;
