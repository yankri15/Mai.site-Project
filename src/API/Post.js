import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import UserPicName from "./UserPicName";

const Post = ({ post, navigation }) => {
  return (
    <SafeAreaView>
      <View style={globalStyles.post}>
        <UserPicName navigation={navigation} />
        <Text style={globalStyles.post_text}>{post && post.postText}</Text>
        {post.downloadURL && (
          <Image
            source={{ uri: post.downloadURL }}
            style={globalStyles.post_img}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Post;