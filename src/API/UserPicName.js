import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { db } from "../../firebase";
import { globalStyles } from "../styles/global";

const UserPicName = ({ uid, navigation, posted }) => {
  const [userData, setUserData] = useState("");
  const defaultImage = require("../../assets/default_profile_pic.jpg");

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      // console.log("uid: ", uid, "\n data\n: ", docSnap.data(), "\n");
      if (docSnap.data())
        setUserData(docSnap.data());
      else
        setUserData({ name: "משתמש מחוק" })
    };
    getUserData();
  }, []);

  return (
    <View style={globalStyles.user_pic_name}>
      <View style={globalStyles.user_pic}>
        <Pressable
          style={globalStyles.user_pic}
          onPress={() => {
            navigation.navigate("פרופיל", {
              uid: uid,
            });
          }}
          disabled={userData.name === "משתמש מחוק"}
        >
          <Image
            source={
              userData.profilePic
                ? { uri: userData.profilePic }
                : defaultImage
            }
            style={globalStyles.logo_image_area}
          ></Image>
        </Pressable>
      </View>
      <View style={globalStyles.name_date}>
        <Pressable
          title="to_profile"
          onPress={() => {
            navigation.navigate("פרופיל", {
              uid: uid,
            });
          }}
          disabled={userData.name === "משתמש מחוק"}
        >
          <Text style={globalStyles.user_name}>{userData.name}</Text>
        </Pressable>
        {posted ? <Text style={globalStyles.user_date}>{posted}</Text> : null}
      </View>
    </View>
  );
};

export default UserPicName;
