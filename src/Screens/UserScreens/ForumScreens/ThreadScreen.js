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
import { globalStyles } from '../../../styles/global';
import Comment from "./Comment";

const ThreadScreen = ({ route, navigation }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  const subjectData = route.params.item;
  const { currentUser } = useAuth();

  const handleRefresh = () => {
    getComments().then(() => {
      setNewComment("");
      setRefreshing(false);
    }).catch(console.error);
  }

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
    <SafeAreaView style={globalStyles.global}>
      {comments && comments.length > 0 ? (
        <Text>{comments[0].threadTitle}</Text>
      ) : (
        <Text>בטעינה</Text>
      )}
      {(
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <Comment commentData={item.commentData} navigation={navigation} />
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text>נראה שאין מה להציג כרגע..</Text>
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <View>
        <TextInput
          value={newComment}
          placeholder="כתוב תגובה..."
          onChangeText={(text) => setNewComment(text)}
          minLength={20}
        />
        <Pressable title="publishNewComment" onPress={handleNewComment}>
          <Text>פרסם תגובה</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ThreadScreen;
