import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import UserPicName from "./UserPicName";

const Post = ({ post, navigation }) => {
  return (
    <SafeAreaView>
      <View style={globalStyles.post}>
        <UserPicName uid={post.id} navigation={navigation} />
        <Text style={globalStyles.post_text}>{post && post.data.postText}</Text>
        {post.data.downloadURL && (
          <Image
            style={globalStyles.post_img}
            source={{ uri: post.data.downloadURL }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Post;
