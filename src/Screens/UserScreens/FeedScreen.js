import { View, Text, TouchableOpacity, Image, Pressable, FlatList } from "react-native";
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
  const [snapshot, setSnapshot] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const col = collection(db, "posts");
      const colSnapshot = await getDocs(col);
      setSnapshot(colSnapshot.docs);
    };
    getPosts();
  }, []);

  return (
    <SafeAreaView style={[globalStyles.global, globalStyles.feed]}>
      {snapshot ? (
        <FlatList
          data={snapshot}
          renderItem={({ item }) => <Post navigation={navigation} style={globalStyles.list_of_posts} postID={item.id} />}

        />
      ) : (
        <Text>כרגע אין מה להציג...</Text>
      )}

      <Pressable
        title="edit"
        onPress={() => {
          navigation.navigate("CreatePost", { navigation });
        }}
        style={globalStyles.plus_btn}
      >
        <Text style={globalStyles.plus_btn_text}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default FeedScreen;
