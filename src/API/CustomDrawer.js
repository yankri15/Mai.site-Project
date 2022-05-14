import React, { useState, useEffect } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAuth } from "../AuthProvider/AuthProvider";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useData } from "../AuthProvider/UserDataProvider";
import { globalStyles } from "../styles/global";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { db, storage } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const CustomDrawer = (props) => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const { name, getName } = useData();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      const imgRef = ref(storage, userData.pic);
      await getDownloadURL(imgRef).then((img) => {
        setImage(img);
      });
    };
    getUserData();
  }, []);

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
        contentContainerStyle={{ backgroundColor: "#a77ce8" }}
      >
        <Image source={{ uri: image }} style={globalStyles.drawer_pic} />
        <Text style={globalStyles.drawer_name}>{name}</Text>
        <View style={globalStyles.drawer_props}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={globalStyles.sign_out_area}>
        <TouchableOpacity style={globalStyles.sign_out} onPress={handleLogout}>
          <Text style={globalStyles.sign_out_text}>Sign out</Text>
          <Ionicons name="log-out-outline" size={20}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
