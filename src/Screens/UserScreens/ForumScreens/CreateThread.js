import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  doc,
  setDocs,
  addDoc,
  collection,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
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
  }
  return (
    <SafeAreaView style={globalStyles.global}>
      <Text>פתח נושא</Text>
      <View>
        <TextInput
          value={title}
          placeholder="כותרת"
          minLength={20}
          maxLength={60}
          onChangeText={(text) => setTitle(text)}
        />

        <TextInput
          value={comment}
          minLength={20}
          maxLength={600}
          onChangeText={(text) => setComment(text)}
        />
      </View>
      <Pressable
        title="publish"
        onPress={handleSubmitThread}
        // disabled={loading}
      >
        <Text>פרסם</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CreateThread;
