import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { globalStyles } from "../../styles/global";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePic from "../../API/ProfilePic";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../../firebase";
import Post from "../../API/Post";
import { collection, getDocs } from "firebase/firestore";

const FeedScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  // const [url, setUrl] = useState();
  const [snapshot, setSnapshot] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const col = collection(db, "posts");
      const colSnapshot = await getDocs(col);
      setSnapshot(colSnapshot.docs);
    }
    getPosts();
  }, []);

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
      {snapshot && snapshot.length > 0 ? (
        snapshot.map((item, index) => {
          console.log(item.id);
          return (
            <Post postID={item.id} key={index} />
          );
        })
      ) : (
        <Text>כרגע אין מה להציג...</Text>
      )}
    </SafeAreaView>
  );
};

export default FeedScreen;
