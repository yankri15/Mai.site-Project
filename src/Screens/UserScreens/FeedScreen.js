import { Text, Pressable, FlatList, SafeAreaView, View } from "react-native";
import { globalStyles } from "../../styles/global";
import React, { useState, useEffect } from "react";
import { db, storage } from "../../../firebase";
import Post from "../../API/Post";
import { collection, getDocs, ref } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { useData } from "../../AuthProvider/UserDataProvider";

const FeedScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(true);
  const { getPosts, postsList } = useData();
  const isFocused = useIsFocused();

  const handleRefresh = () => {
    getPosts().then(() => {
      setRefreshing(false);
    }).catch(console.error);
  }

  const sortByDates = (post1, post2) => {
    const creation1 = post1.data.creation;
    const creation2 = post2.data.creation;
    if (creation1.seconds > creation2.seconds) {
      return 1;
    }
    else if (creation1.seconds < creation2.seconds) {
      return -1;
    }
    else {
      if (creation1.nanoseconds > creation2.nanoseconds) {
        return 1
      }
      else if (creation1.nanoseconds < creation2.nanoseconds) {
        return -1;
      }
      else {
        return 0;
      }
    }
  }

  // const getPostData = async () => {
  //   const q = collection(db, "posts");
  //   const docSnap = await getDocs(q);
  //   console.log(docSnap.docs[0].data());
  //   const promises = docSnap.docs.map(async (item) => {
  //     // console.log(item.id); This is the uid's we want
  //     const tmp = collection(db, "posts", item.id, "userPosts");
  //     const tmpSnap = await getDocs(tmp);
  //     return tmpSnap.docs.map((element) => element.data());
  //   });

  //   const arrayOfPosts = await Promise.all(promises);
  //   console.log(arrayOfPosts);
  //   let newPosts = [];
  //   arrayOfPosts.forEach((posts) => {
  //     newPosts = [...newPosts, ...posts];
  //   });
  //   setPosts(newPosts);
  //   console.log(newPosts);
  // };

  // const getPostData = async () => {
  //   setRefreshing(true);
  //   // setPosts([]);
  //   // const q = collection(db, "posts");
  //   // const docSnap = await getDocs(q);
  //   // docSnap.docs.forEach(async (item) => {
  //   //   const tmp = collection(db, "posts", item.id, "userPosts");
  //   //   const tmpSnap = await getDocs(tmp);
  //   //   return tmpSnap.docs.forEach((element) => {
  //   //     setPosts(prev => [...prev, { "id": item.id, "data": element.data() }]);
  //   //   });
  //   // });
  //   posts.sort(sortByDates);
  // }

  useEffect(() => {
    getPosts().then(() => {
      setRefreshing(false);
    }).catch(console.error);
    return;
  }, []);

  return (
    <SafeAreaView style={globalStyles.global}>
      {(
        <FlatList
          data={postsList}
          style={globalStyles.feed}
          renderItem={({ item }) => (
            <Post
              post={item}
              navigation={navigation}
              style={globalStyles.list_of_posts}
            />
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text>נראה שאין מה להציג כרגע..</Text>
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
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
