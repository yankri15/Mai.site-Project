import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  FlatList,
  TextInput,
  Alert
} from "react-native";
import { globalStyles } from "../styles/global";
import UserPicName from "./UserPicName";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { AntDesign, FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import Comment from "../Screens/UserScreens/ForumScreens/Comment";
import { MenuProvider } from "react-native-popup-menu";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { db } from "../../firebase";
import { useAuth } from "../AuthProvider/AuthProvider";
import moment from "moment";
import { useData } from "../AuthProvider/UserDataProvider";
import ProjectPost from "./ProjectPost";

const Post = ({ post, navigation }) => {
  const [url, setUrl] = useState();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [commentLocation, setCommentLocation] = useState("");

  const { Popover } = renderers;
  const { currentUser } = useAuth();
  const { deletePost } = useData();

  const getImg = async () => {
    if (post.data.images.length !== 0) {
      const imgRef = ref(storage, post.data.images[0]);
      await getDownloadURL(imgRef).then((img) => {
        setUrl(img);
      });
    }
  };

  const getLikes = async () => {
    const q = collection(db, "posts", post.id, "likes");
    const docSnap = await getDocs(q);
    const likeArr = docSnap.docs.map((item) => item.id);
    setLikes(likeArr);
  };

  const getComments = async () => {
    setComments([]);
    const collecRef = collection(db, "posts", post.id, "comments");
    setCommentLocation(collecRef);
    const q = query(collecRef, orderBy("creation", "asc"));
    const docSnap = await getDocs(q);

    docSnap.docs.forEach((element) => {
      setComments((prev) => [
        ...prev,
        {
          commentId: element.id,
          commentData: element.data(),
        },
      ]);
    });
  };

  useEffect(() => {
    getImg().catch(console.error);
    getLikes().catch(console.error);
    getComments().catch(console.error);
    return;
  }, []);

  async function handleLike() {
    if (likes.includes(currentUser.uid)) {
      await deleteDoc(doc(db, "posts", post.id, "likes", currentUser.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", currentUser.uid), {
        uid: currentUser.uid,
      });
    }
    getLikes();
  }

  async function handleNewComment() {
    if (newComment.length <= 4) {
      return;
    }
    const commentsRef = doc(collection(db, "posts", post.id, "comments"));
    await setDoc(commentsRef, {
      comment: newComment,
      creation: serverTimestamp(),
      uid: currentUser.uid,
    });
    setNewComment("");
    getComments();
  }

  return (
    <View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <MenuProvider skipInstanceCheck>
          <FlatList
            data={comments}
            extraData={comments}
            renderItem={({ item }) => (
              <Comment
                commentData={item.commentData}
                commentId={item.commentId}
                commentLocation={commentLocation}
                navigation={navigation}
              />
            )}
            ListEmptyComponent={() => {
              return (
                <View>
                  <Text>כתבו תגובה ראשונה</Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={globalStyles.Forum_Comment}>
            <TextInput
              style={globalStyles.Forum_Comment_Text}
              value={newComment}
              multiline={true}
              placeholder="כתוב תגובה..."
              onChangeText={(text) => setNewComment(text)}
              minLength={20}
            />
            <Pressable
              title="publishNewComment"
              style={globalStyles.Forum_Button}
              onPress={handleNewComment}
            >
              <Feather
                style={{ color: "#fdc123" }}
                name="send"
                size={30}
              ></Feather>
            </Pressable>
          </View>
        </MenuProvider>
      </Modal>
      <View style={globalStyles.post}>
        <UserPicName
          uid={post.data.uid}
          navigation={navigation}
          posted={moment(new Date(post.data.creation.seconds * 1000)).fromNow()}
        />
        <Menu
          renderer={Popover}
          rendererProps={{ preferredPlacement: "right" }}
          style={globalStyles.dots}
        >
          <MenuTrigger>
            {post.data.uid == currentUser.uid ? (
              <Entypo name="dots-three-horizontal" size={20}></Entypo>
            ) : null}
          </MenuTrigger>
          <MenuOptions style={globalStyles.delete_dots_btn}>
            <Pressable
              onPress={() => {
                Alert.alert(
                  "האם אתה בטוח?",
                  "",
                  [
                    {
                      text: "מחק אותי",
                      onPress: () =>  deletePost(post.id),
                    },
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Text style={globalStyles.delete_dots_text}>מחק</Text>
            </Pressable>
          </MenuOptions>
        </Menu>
        <Text style={globalStyles.post_text}>{post && post.data.postText}</Text>
        {post.data.images.length !== 0 && (
          <Image style={globalStyles.post_img} source={{ uri: url }} />
        )}
        <ProjectPost pid={post.data.pid} navigation={navigation} />
        <View>
          <Pressable
            title="like_comment"
            onPress={() => {
              if (modalVisible) setModalVisible(false);
              else setModalVisible(true);
            }}
          >
            <View style={globalStyles.details_like_comment}>
              <View style={globalStyles.info_like_comment}>
                <AntDesign
                  style={{ color: "#fdc123" }}
                  name="like1"
                  size={18}
                ></AntDesign>
                <Text style={globalStyles.info_like_comment_txt}>
                  {likes.length}
                </Text>
              </View>
              <View style={globalStyles.info_like_comment}>
                <FontAwesome
                  style={{ color: "#fdc123" }}
                  name="commenting"
                  size={18}
                ></FontAwesome>
                <Text style={globalStyles.info_like_comment_txt}>
                  {comments.length == 1
                    ? comments.length + " תגובה "
                    : comments.length + " תגובות "}
                </Text>
              </View>
            </View>
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
              style={
                likes.includes(currentUser.uid)
                  ? { color: "#fdc123" }
                  : { color: "#cecece" }
              }
              name={
                likes.includes(currentUser.uid)
                  ? "like1"
                  : "like2"
              }
              size={18}
            ></AntDesign>
            <Text style={[globalStyles.like_comment_btn_txt, likes.includes(currentUser.uid)
              ? { color: "#fdc123" }
              : { color: "#cecece" }]}>אהבתי</Text>
          </Pressable>
          <Pressable
            title="comment"
            onPress={() => {
              if (modalVisible) setModalVisible(false);
              else setModalVisible(true);
            }}
            style={globalStyles.like_comment_btn}
          >
            <FontAwesome
              style={{ color: "#cecece" }}
              name="commenting-o"
              size={18}
            ></FontAwesome>
            <Text style={globalStyles.like_comment_btn_txt}>הגיבו</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Post;
