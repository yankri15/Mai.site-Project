import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { db } from "../../../../firebase";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import { globalStyles } from '../../../styles/global';

const CreateThread = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const subjectData = route.params;
  const { currentUser } = useAuth();

  async function handleSubmitThread() {
    await addDoc(
      collection(db, "forum", subjectData.topicId, subjectData.topicName),
      {
        title: title,
        uid: currentUser.uid,
      }
    ).then(async (threadRef) => {
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
      ).then(() => navigation.navigate("פורום", { subjectData }));
    });



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
        onPress={() => {
          handleSubmitThread();
        }}
      >
        <Text style={globalStyles.open_sub_btn_text}>פרסמו אותי</Text>
      </Pressable>
    </View>
  );
};

export default CreateThread;
