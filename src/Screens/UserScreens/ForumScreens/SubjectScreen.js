import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import UserPicName from "../../../API/UserPicName";

const SubjectScreen = ({ route, navigation }) => {
  const [thread, setThread] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const handleRefresh = () => {
    getThread().then(() => {
      setRefreshing(false);
    }).catch(console.error);
  }

  const topicData = route.params.item;
  const getThread = async () => {
    setThread([]);
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
          uid: element.data().uid,
        },
      ]);
    });
  };
  useEffect(() => {
    getThread()
      .then(() => {
        setRefreshing(false);
      })
      .catch(console.error);
    return;
  }, []);

  return (
    <SafeAreaView>
      {thread ? (
        <Pressable
          title="Create thread"
          onPress={() => {
            navigation.navigate("CreateThread", {
              topicId: topicData.topicId,
              topicName: topicData.topicName,
            });
          }}
        >
          <Text>פתח נושא</Text>
        </Pressable>
      ) : (
        <Text>בטעינה</Text>
      )}

      {(
        <FlatList
          data={thread}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate("Thread", { item })}>
              <UserPicName uid={item.uid} navigation={navigation} />
              <Text>{item.threadTitle}</Text>
            </Pressable>
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
    </SafeAreaView>
  );
};

export default SubjectScreen;
