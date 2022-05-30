import { View, Text, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { globalStyles } from "../styles/global";
import { db, storage } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { useAuth } from "../AuthProvider/AuthProvider";

const UserPicName = ({ uid, navigation, posted }) => {
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const defaultImage = require("../../assets/default_profile_pic.jpg");

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      setName(userData.name);
      if (userData.pic !== "") {
        const imgRef = ref(storage, userData.pic);
        await getDownloadURL(imgRef).then((img) => {
          setImage(img);
        });
      }
    };
    getUserData();
  }, []);

  return (
    <View style={globalStyles.user_pic_name}>
      <View style={globalStyles.user_pic}>
        <Pressable
          style={globalStyles.user_pic}
          onPress={() => {
            navigation.navigate("Profile", {
              uid: uid,
            });
          }}
        >
          <Image
            source={image ? { uri: image } : { defaultImage }}
            style={globalStyles.logo_image_area}
          ></Image>
        </Pressable>
      </View>
      <View style={globalStyles.name_date}>
        <Pressable
          title="to_profile"
          onPress={() => {
            navigation.navigate("Profile", {
              uid: uid,
            });
          }}
        >
          <Text style={globalStyles.user_name}>{name}</Text>
        </Pressable>
        {posted ? <Text style={globalStyles.user_date}>{posted}</Text> : null}
      </View>
    </View>
  );
};

export default UserPicName;
