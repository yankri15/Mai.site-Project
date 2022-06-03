import { View, Text, FlatList, Pressable, TextInput, Vibration, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { collection, doc, addDoc, getDocs, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import { globalStyles } from "../../../styles/global";
import Comment from "./Comment";
import { Feather } from "@expo/vector-icons";

const ThreadScreen = ({ route, navigation }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  const subjectData = route.params.item;
  const { currentUser } = useAuth();
  const [commentLocation, setCommentLocation] = useState("");
  const handleRefresh = () => {
    getComments()
      .then(() => {
        setNewComment("");
        setRefreshing(false);
      })
      .catch(console.error);
  };

  const handleNewComment = async () => {
    if (newComment.length <= 4) {
      return;
    }
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
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {comments && comments.length > 0 ? (
        <Text style={globalStyles.tread_title}>{comments[0].threadTitle}</Text>
      ) : (
        <Text>בטעינה</Text>
      )}
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
                <Text>נראה שאין מה להציג כרגע..</Text>
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
            Vibration.vibrate(15)
            Keyboard.dismiss()
          }}
        >
          <Feather style={{ color: "#fdc123" }} name="send" size={30}></Feather>
        </Pressable>
      </View>
    </View>
  );
};

export default ThreadScreen;
