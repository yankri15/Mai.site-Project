import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import UserPicName from "./UserPicName";
import { globalStyles } from "../styles/global";
import moment from "moment";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";

const BasicPostDisplay = ({ post, navigation }) => {
  const [url, setUrl] = useState();
  const getImg = async () => {
    if (post.data.images.length !== 0) {
      const imgRef = ref(storage, post.data.images[0]);
      await getDownloadURL(imgRef).then((img) => {
        setUrl(img);
      });
    }
  };

  useEffect(() => {
    getImg().catch(console.error);
    return;
  }, []);
  return (
    <View>
      <UserPicName
        uid={post.data.uid}
        navigation={navigation}
        posted={moment(new Date(post.data.creation.seconds * 1000)).fromNow()}
      />
      <Text style={globalStyles.post_text}>{post && post.data.postText}</Text>
      {post.data.images.length !== 0 && (
        <Image style={globalStyles.post_img} source={{ uri: url }} />
      )}
    </View>
  );
};

export default BasicPostDisplay;
