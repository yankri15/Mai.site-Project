import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { globalStyles } from "../../styles/global";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePic from "../../API/ProfilePic";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase";

const FeedScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const [url, setUrl] = useState();

  return (
    <SafeAreaView style={globalStyles.global}>
      <Pressable
        title="edit"
        onPress={() => {
          navigation.navigate("CreatePost", { navigation });
        }}
        style={globalStyles.edit_btn}
      >
        <Text style={globalStyles.edit_btn_text}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default FeedScreen;
