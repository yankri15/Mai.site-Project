import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, SafeAreaView, Pressable } from "react-native";
import { globalStyles } from "../styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../AuthProvider/AuthProvider";
import { db, storage } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const ProfilePic = ({ navigation }) => {
  const { currentUser } = useAuth();
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

  return (
    <SafeAreaView style={globalStyles.hamburger_profile_pic}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons style={{ color: "#c8c8c8" }} name="menu-outline" size={35}></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity style={globalStyles.touchable_profile_pic} onPress={() => { navigation.navigate("Profile") }}>
        <Image source={{ uri: image }} style={globalStyles.touchable_profile_pic}/>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfilePic;
