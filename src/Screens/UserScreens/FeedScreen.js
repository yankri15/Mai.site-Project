import { Text, Pressable, FlatList, SafeAreaView, View, Vibration, Modal, } from "react-native";
import { globalStyles } from "../../styles/global";
import React, { useState, useEffect } from "react";
import { db, storage } from "../../../firebase";
import Post from "../../API/Post";
import { collection, getDocs, ref } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { useData } from "../../AuthProvider/UserDataProvider";

const FeedScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(true);
  const { getPosts, tagsList, getTags } = useData();
  const [postsList, setPostsList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleRefresh = () => {
    getPosts()
      .then((posts) => {
        setPostsList(posts);
        setFilteredPosts(posts);
        setSelectedTags([]);
        setRefreshing(false);
      })
      .catch(console.error);
  };

  const handleSelectTag = (tag) => {
    if (selectedTags.includes(tag)) {
      const temp = selectedTags.filter((currTag) => currTag !== tag);
      setSelectedTags(temp);
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const filterPosts = (tags) => {
    if (tags.length === 0) return setFilteredPosts([...postsList]);
    const temp = postsList.filter((post) =>
      post.data.tags.some((t) => tags.includes(t))
    );
    // console.log("================================\n", temp);
    setFilteredPosts(temp);
  };

  const getHeader = () => {
    return (
      <View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible((prev) => !prev);
          }}
        >
          <View>
            <FlatList
              data={tagsList}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    backgroundColor: selectedTags.includes(item.name)
                      ? "green"
                      : "#EAE7E6",
                    padding: 5,
                    margin: 5,
                  }}
                  onPress={() => handleSelectTag(item.name)}
                >
                  <Text>{item.name}</Text>
                </Pressable>
              )}
              numColumns={3}
              ListEmptyComponent={() => {
                return (
                  <View>
                    <Text style={globalStyles.be_first}>
                      נראה שאין מה להציג כרגע..
                    </Text>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 12 }}></View>;
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <Pressable
            onPress={() => {
              filterPosts(selectedTags);
              setModalVisible(false);
            }}
            style={{ marginLeft: 10, width: 50, height: 50 }}
          >
            <Text>{"סנן"}</Text>
          </Pressable>
        </Modal>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={{ width: "100%", height: 50 }}
        >
          <Text>{"open modal"}</Text>
        </Pressable>
      </View>
    );
  };
  useEffect(() => {
    getPosts()
      .then((posts) => {
        setPostsList(posts);
        setFilteredPosts(posts);
        setRefreshing(false);
      })
      .catch(console.error);
    getTags();
    return;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredPosts}
        style={globalStyles.feed}
        renderItem={({ item }) => (
          <Post
            post={item}
            navigation={navigation}
            style={globalStyles.list_of_posts}
          />
        )}
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
        ItemSeparatorComponent={() => {
          return <View style={{ height: 12 }}></View>;
        }}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={getHeader}
      />
      <Pressable
        title="edit"
        onPress={() => {
          navigation.navigate("CreateProject");
        }}
        style={globalStyles.plus_btn}
      >
        <Text style={globalStyles.plus_btn_text}>+</Text>
      </Pressable>
    </View>
  );
};

export default FeedScreen;
