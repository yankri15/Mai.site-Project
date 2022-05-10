import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { globalStyles } from "../styles/global";
import { useAuth } from "../AuthProvider/AuthProvider";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const ProfilePic = ({ navigation }) => {
  const { currentUser } = useAuth();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      setImage(userData.pic);
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
