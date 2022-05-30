import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import UserPicName from "../../../API/UserPicName";
import { globalStyles } from '../../../styles/global';

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
    <View
      style={{ flex: 1 }}
    >
      {(
        <FlatList
          style={globalStyles.subjects}
          data={thread}
          renderItem={({ item }) => (
            <View >
              <Pressable
                onPress={() => navigation.navigate("Thread", { item })}>
                <UserPicName uid={item.uid} navigation={navigation} />
                <Text style={globalStyles.subjects_txt}>{item.threadTitle}</Text>
                <View style={globalStyles.line}></View>
              </Pressable>
            </View>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text style={globalStyles.be_first}>נראה שאין מה להציג כרגע..</Text>
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <Pressable
        title="Create thread"
        style={globalStyles.open_sub_btn}
        onPress={() => {
          navigation.navigate("CreateThread", {
            topicId: topicData.topicId,
            topicName: topicData.topicName,
          });
        }}
      >
        <Text style={globalStyles.open_sub_btn_text}>נושא חדש</Text>
      </Pressable>
    </View>
  );
};

export default SubjectScreen;
