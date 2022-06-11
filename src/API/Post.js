import { AntDesign, Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { db, storage } from "../../firebase";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useData } from "../AuthProvider/UserDataProvider";
import Comment from "../Screens/UserScreens/ForumScreens/Comment";
import { globalStyles } from "../styles/global";
import ProjectPost from "./ProjectPost";
import UserPicName from "./UserPicName";

const Post = ({ post, navigation }) => {
  const [images, setImages] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [commentLocation, setCommentLocation] = useState("");
  const [displayImages, setDisplayImages] = useState(false);
  const { currentUser } = useAuth();
  const { deletePost, deleteImages, admin, triggerFeed, commentsTrigger } = useData();

  const getImages = async () => {
    setImages([]);
    if (post.data.images.length !== 0) {
      post.data.images.forEach(async (element) => {
        const imgRef = ref(storage, element);
        await getDownloadURL(imgRef).then((img) => {
          setImages((prev) => [...prev, { url: img }]);
        });
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
          key: element.id + Date.now(),
          commentId: element.id,
          commentData: element.data(),
        },
      ]);
    });
  };

  useEffect(() => {
    getImages().catch(console.error);
    getLikes().catch(console.error);
    // getComments().catch(console.error);
    return;
  }, []);

  useEffect(() => { getComments().catch(console.error); }, [commentsTrigger])

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
        visible={commentsModalVisible}
        animationType="slide"
        onRequestClose={() => {
          setCommentsModalVisible(!commentsModalVisible);
        }}
      >
        <FlatList
          data={comments}
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
                <Text style={globalStyles.be_first}>כתבו תגובה ראשונה</Text>
              </View>
            );
          }}
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
            onPress={() => {
              handleNewComment();
              Keyboard.dismiss();
            }}
          >
            <Feather
              style={{ color: "#fdc123" }}
              name="send"
              size={30}
            ></Feather>
          </Pressable>
        </View>
      </Modal>
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDeleteModalVisible(!deleteModalVisible)}
      >
        <TouchableOpacity
          style={{ height: Dimensions.get("window").height * 0.7, backgroundColor: "gray", opacity: 0.3 }}
          onPress={() => setDeleteModalVisible(!deleteModalVisible)}
        ></TouchableOpacity>
        <View
          style={[globalStyles.delete_modal_view, {
            height: Dimensions.get("window").height * 0.3,
          }]}
        >
          <Pressable
            style={globalStyles.delete_modal_btn}
            onPress={() => {
              Alert.alert(
                "האם אתה בטוח?",
                "",
                [
                  {
                    text: "מחק אותי",
                    onPress: () => {
                      deleteImages(post.data.images).then(() => {
                        deletePost(post.id).then(() => {
                          triggerFeed();
                          setDeleteModalVisible(!deleteModalVisible)
                        });
                      });
                    },
                  },
                ],
                { cancelable: true }
              );
            }}
          >
            <Text style={[globalStyles.delete_dots_text, globalStyles.delete_modal_btn_txt]}>מחק</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={globalStyles.post}>
        <UserPicName
          uid={post.data.uid}
          navigation={navigation}
          posted={moment(new Date(post.data.creation.seconds * 1000)).fromNow()}
        />
        <Pressable
          style={globalStyles.dots}
          onPress={() => setDeleteModalVisible(!deleteModalVisible)}
        >
          {post.data.uid == currentUser.uid || admin == 1 ? (
            <Entypo name="dots-three-horizontal" size={20}></Entypo>
          ) : null}
        </Pressable>
        <Text style={globalStyles.post_text}>{post && post.data.postText}</Text>
        {images.length !== 0 && (
          <Pressable
            onPress={() => {
              images.length > 0 ? setDisplayImages(!displayImages) : null;
            }}
          >
            <Image
              style={globalStyles.post_img}
              source={{ uri: images[0].url }}
            />
            {images.length > 1 ? (
              <View style={globalStyles.images_length_view}>
                <Text style={globalStyles.images_length_txt}>
                  1/{images.length}
                </Text>
              </View>
            ) : null}
          </Pressable>
        )}
        {
          <Modal
            visible={displayImages}
            onRequestClose={() => {
              setDisplayImages(!displayImages);
            }}
          >
            <ImageViewer imageUrls={images} />
          </Modal>
        }
        <ProjectPost pid={post.data.pid} navigation={navigation} />
        <View>
          <Pressable
            title="like_comment"
            onPress={() => {
              if (commentsModalVisible) setCommentsModalVisible(false);
              else setCommentsModalVisible(true);
            }}
          >
            <View style={globalStyles.details_like_comment}>
              <View style={globalStyles.info_like_comment}>
                <View style={globalStyles.comment_like_info_view}>
                  <AntDesign
                    style={{ color: "#fdd000" }}
                    name="like1"
                    size={12}
                  ></AntDesign>
                </View>
                <Text style={globalStyles.info_like_comment_txt}>
                  {likes.length}
                </Text>
              </View>
              <View style={globalStyles.info_like_comment}>
                <View style={globalStyles.comment_like_info_view}>
                  <FontAwesome
                    style={{ color: "#fdd000" }}
                    name="commenting"
                    size={12}
                  ></FontAwesome>
                </View>
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
              name={likes.includes(currentUser.uid) ? "like1" : "like2"}
              size={20}
            ></AntDesign>
            <Text
              style={[
                globalStyles.like_comment_btn_txt,
                likes.includes(currentUser.uid)
                  ? { color: "#fdc123" }
                  : { color: "#cecece" },
              ]}
            >
              אהבתי
            </Text>
          </Pressable>
          <Pressable
            title="comment"
            onPress={() => {
              if (commentsModalVisible) setCommentsModalVisible(false);
              else setCommentsModalVisible(true);
            }}
            style={globalStyles.like_comment_btn}
          >
            <FontAwesome
              style={{ color: "#cecece" }}
              name="commenting-o"
              size={20}
            ></FontAwesome>
            <Text style={globalStyles.like_comment_btn_txt}>הגיבו</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Post;
