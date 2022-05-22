import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import UserPicName from "./UserPicName";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { Octicons, AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../AuthProvider/AuthProvider";

const Post = ({ post, navigation }) => {
  const [url, setUrl] = useState();
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getImg = async () => {
      const imgRef = ref(storage, post.data.downloadURL);
      await getDownloadURL(imgRef).then((img) => {
        setUrl(img);
      });
    };

    getImg().catch(console.error);
    return;
  }, [likes]);

  useEffect(() => {
    const getLikes = async () => {
      const q = collection(db, "posts", post.id, "likes");
      const docSnap = await getDocs(q);
      const likeArr = docSnap.docs.map((item) => item.id);
      setLikes(likeArr);
    };
    getLikes().catch(console.error);
    return;
  }, [likes]);

  async function handleLike() {
    if (likes.includes(currentUser.uid)) {
      await deleteDoc(doc(db, "posts", post.id, "likes", currentUser.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", currentUser.uid), {
        uid: currentUser.uid,
      });
    }
  }
  return (
    <SafeAreaView>
      <View style={globalStyles.post}>
        <UserPicName uid={post.data.uid} navigation={navigation} />
        {post.uid == currentUser.uid ? (
          <Entypo
            style={globalStyles.edit_post}
            name="dots-three-horizontal"
            size={25}
          ></Entypo>
        ) : null}
        <Text style={globalStyles.post_text}>{post && post.data.postText}</Text>
        {post.data.downloadURL && (
          <Image style={globalStyles.post_img} source={{ uri: url }} />
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
            <Text style={globalStyles.info_like_comment_txt}>
              {likes.length}
            </Text>
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
              handleLike();
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
