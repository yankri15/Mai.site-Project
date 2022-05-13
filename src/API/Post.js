import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import UserPicName from "./UserPicName";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Octicons, AntDesign } from "@expo/vector-icons";

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
        <View style={globalStyles.like_comment}>
          <Pressable
            title="comment"
            // onPress={() => {
            //   navigation.navigate("CreatePost", { navigation });
            // }}
            style={globalStyles.like_comment_btn}
          >
            <Text style={globalStyles.like_comment_btn_txt}>תגובה</Text>
            <Octicons style={{ color: "black" }} name="comment" size={18}></Octicons>
          </Pressable>
          <Pressable
            title="like"
            // onPress={() => {
            //   navigation.navigate("CreatePost", { navigation });
            // }}
            style={globalStyles.like_comment_btn}
          >
            <Text style={globalStyles.like_comment_btn_txt}>אהבתי</Text>
            <AntDesign style={{ color: "black" }} name="like2" size={20}></AntDesign>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Post;
