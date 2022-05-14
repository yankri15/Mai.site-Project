import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";

const SubjectScreen = ({ route, navigation }) => {
  const [thread, setThread] = useState([]);
  const topicData = route.params.item;

  useEffect(() => {
    setThread([]);
    const getThread = async () => {
      const docRef = collection(
        db,
        "forum",
        topicData.topicId,
        topicData.topicName
      );
      const docSnap = await getDocs(docRef);

      docSnap.docs.forEach((element) => {
        setThread((prev) => [
          ...prev,
          {
            ...topicData,
            threadId: element.id,
            threadTitle: element.data().title,
          },
        ]);
      });
    };
    if (!thread || thread.length == 0) getThread().catch(console.error);
    return;
  }, []);

  return (
    <SafeAreaView>
      {thread && thread.length > 0 ? (
        <Pressable
          title="Create thread"
          onPress={() => {
            navigation.navigate("CreateThread", {
              topicId: thread[0].topicId,
              topicName: thread[0].topicName,
            });
          }}
        >
          <Text>פתח נושא</Text>
        </Pressable>
      ) : (
        <Text>בטעינה</Text>
      )}

      {thread && thread.length > 0 ? (
        <FlatList
          data={thread}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate("Thread", { item })}>
              <Text>{item.threadTitle}</Text>
            </Pressable>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>מיד נציג אתכם</Text>
      )}
    </SafeAreaView>
  );
};

export default SubjectScreen;
