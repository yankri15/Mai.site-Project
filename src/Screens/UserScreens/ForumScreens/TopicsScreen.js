import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { db } from "../../../../firebase";
import { globalStyles } from "../../../styles/global";

const TopicsScreen = ({ navigation }) => {
  const [topics, setTopics] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const handleRefresh = () => {
    getTopics()
      .then(() => {
        setRefreshing(false);
      })
      .catch(console.error);
  };

  const getTopics = async () => {
    setTopics([]);
    const docRef = collection(db, "forum");
    const docSnap = await getDocs(docRef);
    docSnap.forEach((element) => {
      setTopics((prev) => [
        ...prev,
        { topicId: element.id, topicName: element.data().name },
      ]);
    });
  };
  useEffect(() => {
    getTopics()
      .then(() => {
        setRefreshing(false);
      })
      .catch(console.error);
    return;
  }, []);

  const getHeader = () => {
    return <Text style={globalStyles.forum_title_text}>הנושאים שלנו</Text>;
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={topics}
        renderItem={({ item }) => (
          <Pressable
            style={globalStyles.forums_titles}
            onPress={() => {
              navigation.navigate("פורום", { item });
            }}
          >
            <Text style={globalStyles.forums_titles_txt}>{item.topicName}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 15 }}></View>;
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text style={globalStyles.be_first}>
                נראה שאין מה להציג כרגע..
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={getHeader}
      />
    </View>
  );
};

export default TopicsScreen;
