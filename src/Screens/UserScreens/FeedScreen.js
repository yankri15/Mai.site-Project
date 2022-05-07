import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
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
    <SafeAreaView>
      <ProfilePic navigation={navigation} />
      <Pressable
        title="edit"
        onPress={() => { navigation.navigate('CreatePost') }}
        style={
          {
            position: 'absolute',
            top: 100,
            right: 30,
            borderColor: 'black',
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 40,
            padding: 5,
          }}
      >
        <Text>+ </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default FeedScreen;
