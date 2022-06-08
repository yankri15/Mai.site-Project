import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Post from "../../API/Post";
import { useData } from "../../AuthProvider/UserDataProvider";
import { globalStyles } from "../../styles/global";

const FeedScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(true);
  const { getPosts, tagsList, getTags } = useData();
  const [postsList, setPostsList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleRefresh = () => {
    getPosts()
      .then((posts) => {
        const postsWithKeys = posts.map((post) => {
          return { post: post, key: post.id + Date.now() };
        });
        setPostsList(postsWithKeys);
        setFilteredPosts(postsWithKeys);
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

  const filterPosts = () => {
    if (selectedTags.length === 0) return setFilteredPosts([...postsList]);
    const filterd = postsList.filter((post) =>
      post.data.tags.some((t) => selectedTags.includes(t))
    );
    const filterdWithKeys = filterd.map((post) => {
      return { post: post, key: post.id + Date.now() };
    });
    setFilteredPosts(filterdWithKeys);
  };

  const getHeader = () => {
    return (
      <View>
        <FlatList
          data={tagsList}
          horizontal={true}
          renderItem={({ item }) => (
            <Pressable
              style={[
                { ...globalStyles.filter_btns },
                {
                  backgroundColor: selectedTags.includes(item.name)
                    ? "#60b5ff"
                    : "#C4A5F3",
                },
              ]}
              onPress={() => {
                handleSelectTag(item.name);
              }}
            >
              <Text
                style={{
                  color: selectedTags.includes(item.name) ? "white" : "black",
                  fontWeight: "bold",
                  fontSize: 13,
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => {
            return <Text style={globalStyles.be_first}>טוען מסננים</Text>;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
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

  useEffect(() => {
    filterPosts();
    return;
  }, [selectedTags]);

  return (
    <View>
      <FlatList
        data={filteredPosts}
        style={globalStyles.feed}
        renderItem={({ item }) => (
          <Post
            post={item.post ? item.post : item}
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
