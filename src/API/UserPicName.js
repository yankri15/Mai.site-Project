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
      setUserData(docSnap.data());
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
        >
          <Image
            source={
              userData.profilePic
                ? { uri: userData.profilePic }
                : { defaultImage }
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
        >
          <Text style={globalStyles.user_name}>{userData.name}</Text>
        </Pressable>
        {posted ? <Text style={globalStyles.user_date}>{posted}</Text> : null}
      </View>
    </View>
  );
};

export default UserPicName;
