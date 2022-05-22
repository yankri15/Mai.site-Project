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
    getPosts()
      .then(() => {
        setRefreshing(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getPosts()
      .then(() => {
        setRefreshing(false);
      })
      .catch(console.error);

    return;
  }, []);

  return (
    <SafeAreaView style={globalStyles.global}>
      {
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
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      }

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
