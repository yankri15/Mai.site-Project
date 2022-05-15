import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import UserPicName from "./UserPicName";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Octicons, AntDesign, FontAwesome } from "@expo/vector-icons";

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
            title="like"
            onPress={() => {

            }}
            style={globalStyles.details_like_comment}
          >
            <AntDesign style={{ color: "#fdc123" }} name="like1" size={20}></AntDesign>
            <Text style={globalStyles.info_like_comment_txt}>8</Text>
          </Pressable>
          <Pressable
            title="comment"
            onPress={() => {

            }}
            style={globalStyles.details_like_comment}
          >
            <FontAwesome style={{ color: "#fdc123" }} name="commenting" size={20}></FontAwesome>
            <Text style={globalStyles.info_like_comment_txt}>2 תגובות</Text>
          </Pressable>
        </View>
        <View style={globalStyles.like_comment_line}></View>
        <View style={globalStyles.like_comment}>
          <Pressable
            title="like"
            onPress={() => {
              //navigation.navigate("CreatePost", { navigation });

            }}
            style={globalStyles.like_comment_btn}
          >
            <AntDesign style={{ color: "#c6c6b5" }} name="like2" size={18}></AntDesign>
            <Text style={globalStyles.like_comment_btn_txt}>אהבתי</Text>
          </Pressable>
          <Pressable
            title="comment"
            onPress={() => {
              //navigation.navigate("CreatePost", { navigation });
            }}
            style={globalStyles.like_comment_btn}
          >
            <FontAwesome style={{ color: "#c6c6b5" }} name="commenting-o" size={18}></FontAwesome>
            <Text style={globalStyles.like_comment_btn_txt}>הגיבו</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Post;
