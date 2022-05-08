import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { ref } from "firebase/storage";
import { db, storage } from "../../firebase";
import { collection, doc, getDoc, query, getDocs } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { async } from "@firebase/util";
import { getDownloadURL } from "firebase/storage";
import { globalStyles } from "../styles/global";
import UserPicName from "./UserPicName";

const Post = ({ post, navigation }) => {
  //   console.log(post.postText);
  console.log(post);
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
