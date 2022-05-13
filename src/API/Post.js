import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import UserPicName from "./UserPicName";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase"

const Post = ({ post, navigation }) => {
  const [url, setUrl] = useState();

  useEffect(() => {
    const getImg = async () => {
      const imgRef = ref(storage, post.data.downloadURL);
      await getDownloadURL(imgRef).then((img) => {
        setUrl(img);
      });
    }
    getImg().catch(console.error);
    return;
  }, []);

  return (
    <SafeAreaView>
      <View style={globalStyles.post}>
        <UserPicName uid={post.id} navigation={navigation} />
        <Text style={globalStyles.post_text}>{post && post.data.postText}</Text>
        {post.data.downloadURL && (
          <Image
            style={globalStyles.post_img}
            source={{ uri: url }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Post;
