import { Feather } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { db } from "../../../../firebase";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import { useData } from "../../../AuthProvider/UserDataProvider";
import { globalStyles } from "../../../styles/global";
import Comment from "./Comment";

const ThreadScreen = ({ route, navigation }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  const [commentLocation, setCommentLocation] = useState("");
  const { currentUser } = useAuth();
  const { commentsTrigger } = useData()
  const subjectData = route.params.item;

  const handleRefresh = () => {
    getComments()
      .then(() => {
        setNewComment("");
        setRefreshing(false);
      })
      .catch(console.error);
  };

  const handleNewComment = async () => {
    await addDoc(
      collection(
        db,
        "forum",
        subjectData.topicId,
        subjectData.topicName,
        subjectData.threadId,
        "comments"
      ),
      {
        comment: newComment,
        creation: serverTimestamp(),
        uid: currentUser.uid,
      }
    );
    handleRefresh();
  };

  const getComments = async () => {
    setComments([]);
    const docRef = collection(
      db,
      "forum",
      subjectData.topicId,
      subjectData.topicName,
      subjectData.threadId,
      "comments"
    );
    setCommentLocation(docRef);
    const q = query(docRef, orderBy("creation", "asc"));
    const docSnap = await getDocs(q);

    docSnap.docs.forEach((element) => {
      setComments((prev) => [
        ...prev,
        {
          ...subjectData,
          commentId: element.id,
          commentData: element.data(),
        },
      ]);
    });
  };
  useEffect(() => {
    getComments()
      .then(() => {
        setRefreshing(false);
      })
      .catch(console.error);
    return;
  }, [commentsTrigger]);

  return (
    <View style={{ flex: 1 }}>
      {comments && comments.length > 0 ? (
        <Text style={globalStyles.tread_title}>{comments[0].threadTitle}</Text>
      ) : null}
      {
        <FlatList
          data={comments}
          style={globalStyles.tread_comments}
          renderItem={({ item, index }) =>
            index == 0 ? (
              <Comment
                commentData={item.commentData}
                commentId={item.commentId}
                commentLocation={commentLocation}
                navigation={navigation}
                first={true}
              />
            ) : (
              <Comment
                commentData={item.commentData}
                navigation={navigation}
                commentId={item.commentId}
                commentLocation={commentLocation}
              />
            )
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text style={globalStyles.be_first}>נראה שאין מה להציג כרגע..</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      }
      <View style={globalStyles.Forum_Comment}>
        <TextInput
          style={globalStyles.Forum_Comment_Text}
          value={newComment}
          placeholder="הקלידו כאן..."
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
          <Feather style={{ color: "#fdc123" }} name="send" size={30}></Feather>
        </Pressable>
      </View>
    </View>
  );
};

export default ThreadScreen;
