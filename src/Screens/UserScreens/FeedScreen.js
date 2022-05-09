import { Text, Pressable, FlatList } from "react-native";
import { globalStyles } from "../../styles/global";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePic from "../../API/ProfilePic";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../../firebase";
import Post from "../../API/Post";
import { collection, getDocs } from "firebase/firestore";
import { usePost } from "../../AuthProvider/PostProvider";

const FeedScreen = ({ navigation }) => {
  const { posts, getPostData } = usePost();

  useEffect(() => {
    getPostData();
  }, []);

  console.log(posts);
  return (
    <SafeAreaView style={globalStyles.global}>
      {posts && posts.length > 0 ? (
        <Post post={posts[0]} navigation={navigation} />
      ) : (
        // <FlatList
        //   data={posts}
        //   renderItem={({ item }) => (
        //     <Post
        //       post={item}
        //       navigation={navigation}
        //       style={globalStyles.list_of_posts}
        //     />
        //   )}
        // />
        <Text style={globalStyles.empty_feed}>כרגע אין מיזמים להציג, לחץ/י על הפלוס בתחתית המסך ותזכה/י להיות הראשון/ה לשתף במיזם שלך!</Text>
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
