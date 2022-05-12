import { View, Text, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { globalStyles } from "../styles/global";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../AuthProvider/AuthProvider";

const UserPicName = ({ uid, navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      console.log(userData.pic);
      setName(userData.name);
      setImage(userData.pic);
    };
    getUserData();
  }, []);

  return (
    <View style={globalStyles.user_pic_name}>
      <View style={globalStyles.user_pic}>
        <Image
          source={{ uri: image }}
          style={globalStyles.logo_image_area}
        ></Image>
      </View>
      <Pressable
        title="to_profile"
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Text style={globalStyles.user_name}>{name}</Text>
      </Pressable>
    </View>
  );
};

export default UserPicName;
