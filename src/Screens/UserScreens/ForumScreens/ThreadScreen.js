import { View, Text, FlatList, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import Comment from "./Comment";

const ThreadScreen = ({ route, navigation }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const subjectData = route.params.item;
  const { currentUser } = useAuth();

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
  };

  useEffect(() => {
    setComments([]);
    const getComments = async () => {
      const docRef = collection(
        db,
        "forum",
        subjectData.topicId,
        subjectData.topicName,
        subjectData.threadId,
        "comments"
      );
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
    if (!comments || comments.length == 0) getComments().catch(console.error);
    return;
  }, []);

  return (
    <SafeAreaView>
      {comments && comments.length > 0 ? (
        <Text>{comments[0].threadTitle}</Text>
      ) : (
        <Text>בטעינה</Text>
      )}
      {comments ? (
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <Comment commentData={item.commentData} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>בטעינה</Text>
      )}
      <View>
        <TextInput
          value={newComment}
          placeholder="כתוב תגובה..."
          onChangeText={(text) => setNewComment(text)}
        />
        <Pressable title="publishNewComment" onPress={handleNewComment}>
          <Text>פרסם תגובה</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ThreadScreen;
