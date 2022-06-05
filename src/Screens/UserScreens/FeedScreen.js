import {
  Text,
  Pressable,
  FlatList,
  SafeAreaView,
  View,
  Vibration,
} from "react-native";
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
    <View style={{ flex: 1 }}>
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
                <Text style={globalStyles.be_first}>
                  נראה שאין מה להציג כרגע..
                </Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 12 }}></View>;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      }

      <Pressable
        title="edit"
        onPress={() => {
          navigation.navigate("CreateProject");
        }}
        style={globalStyles.plus_btn}
      >
        <Text style={globalStyles.plus_btn_text}>+</Text>
      </Pressable>
    </View>
  );
};

export default FeedScreen;
