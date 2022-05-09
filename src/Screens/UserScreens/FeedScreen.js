import { Text, Pressable, FlatList, SafeAreaView } from "react-native";
import { globalStyles } from "../../styles/global";
import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import Post from "../../API/Post";
import { collection, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getPostData = async () => {
      const q = collection(db, "posts");
      const docSnap = await getDocs(q);
      const promises = docSnap.docs.map(async (item) => {
        // console.log(item.id); This is the uid's we want
        const tmp = collection(db, "posts", item.id, "userPosts");
        const tmpSnap = await getDocs(tmp);
        return tmpSnap.docs.map((element) => element.data());
      });

      const arrayOfPosts = await Promise.all(promises);
      let newPosts = [];
      arrayOfPosts.forEach((posts) => {
        newPosts = [...newPosts, ...posts];
      });
      setPosts(newPosts);
    };

    getPostData().catch(console.error);
    return;
  }, [isFocused]);

  return (
    <SafeAreaView style={globalStyles.global}>
      {posts && posts.length > 0 ? (
        <FlatList
          data={posts}
          style={globalStyles.feed}
          renderItem={({ item }) => (
            <Post
              post={item}
              navigation={navigation}
              style={globalStyles.list_of_posts}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>מיד נציג אתכם</Text>
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
