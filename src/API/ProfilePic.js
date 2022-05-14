import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { globalStyles } from "../styles/global";
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
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={{ uri: image }}
            style={globalStyles.touchable_profile_pic}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePic;
