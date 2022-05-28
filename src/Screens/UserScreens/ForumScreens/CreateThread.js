import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, setDocs, addDoc, collection, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import { globalStyles } from '../../../styles/global';

const CreateThread = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const subjectData = route.params;
  const { currentUser } = useAuth();

  async function handleSubmitThread() {
    const threadRef = await addDoc(
      collection(db, "forum", subjectData.topicId, subjectData.topicName),
      {
        title: title,
        uid: currentUser.uid,
      }
    );

    await addDoc(
      collection(
        db,
        "forum",
        subjectData.topicId,
        subjectData.topicName,
        threadRef.id,
        "comments"
      ),
      {
        comment: comment,
        creation: serverTimestamp(),
        uid: currentUser.uid,
      }
    );
    navigation.navigate("Subject", { subjectData });
  }
  return (
    <View
      style={{ flex: 1 }}
    >
      <Text style={globalStyles.forum_title_text}>בואו נפתח נושא חדש!</Text>
      <View style={globalStyles.create_thread}>
        <TextInput
          value={title}
          placeholder="כותרת"
          style={globalStyles.create_thread_title}
          minLength={20}
          maxLength={60}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          value={comment}
          placeholder="תגובה ראשונה"
          multiline={true}
          style={globalStyles.create_thread_first_cmnt}
          minLength={20}
          maxLength={600}
          onChangeText={(text) => setComment(text)}
        />
      </View>
      <Pressable
        title="publish"
        style={globalStyles.open_sub_btn}
        onPress={handleSubmitThread}
      // disabled={loading}
      >
        <Text style={globalStyles.open_sub_btn_text}>פרסמו אותי</Text>
      </Pressable>
    </View>
  );
};

export default CreateThread;
