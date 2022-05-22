import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import UserPicName from "./UserPicName";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { Octicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Post = ({ post, navigation }) => {
  const [url, setUrl] = useState();
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getImg = async () => {
      const imgRef = ref(storage, post.downloadURL);
      await getDownloadURL(imgRef).then((img) => {
        setUrl(img);
      });
    };

    const getLikes = async () => {
      const q = collection(
        db,
        "posts",
        post.id,
        "userPosts",
        post.postId,
        "likes"
      );
      const docSnap = await getDocs(q);
      setLikes(docSnap.docs.length);
    };
    getImg().catch(console.error);
    getLikes().catch(console.error);
    return;
  }, []);

  async function handleLike() {}
  return (
    <SafeAreaView>
      <View style={globalStyles.post}>
        <UserPicName uid={post.uid} navigation={navigation} />
        <Text style={globalStyles.post_text}>{post && post.postText}</Text>
        {post.downloadURL && (
          <Image
            style={globalStyles.post_img}
            source={{ uri: url }}
          />

        )}
        <View style={globalStyles.like_comment}>
          <Pressable
            title="like"
            onPress={() => {}}
            style={globalStyles.details_like_comment}
          >
            <AntDesign
              style={{ color: "#fdc123" }}
              name="like1"
              size={20}
            ></AntDesign>
            <Text style={globalStyles.info_like_comment_txt}>{likes}</Text>
          </Pressable>
          <Pressable
            title="comment"
            onPress={() => {}}
            style={globalStyles.details_like_comment}
          >
            <FontAwesome
              style={{ color: "#fdc123" }}
              name="commenting"
              size={20}
            ></FontAwesome>
            <Text style={globalStyles.info_like_comment_txt}>
              {comments.length == 1
                ? comments.length + " תגובה "
                : comments.length + " תגובות "}
            </Text>
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
            <AntDesign
              style={{ color: "#c6c6b5" }}
              name="like2"
              size={18}
            ></AntDesign>
            <Text style={globalStyles.like_comment_btn_txt}>אהבתי</Text>
          </Pressable>
          <Pressable
            title="comment"
            onPress={() => {
              handleLike();
            }}
            style={globalStyles.like_comment_btn}
          >
            <FontAwesome
              style={{ color: "#c6c6b5" }}
              name="commenting-o"
              size={18}
            ></FontAwesome>
            <Text style={globalStyles.like_comment_btn_txt}>הגיבו</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Post;
