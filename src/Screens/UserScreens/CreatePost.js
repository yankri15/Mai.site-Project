import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  FlatList, Image, Pressable, SafeAreaView, Text, TextInput, View
} from "react-native";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { useData } from "../../AuthProvider/UserDataProvider";
import { globalStyles } from "../../styles/global";

const CreatePost = ({ navigation, route }) => {
  const project = route.params.project;
  const pid = route.params.pid;
  const { currentUser } = useAuth();
  const { uploadDataPost, uploadImg, getPosts } = useData();
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImages((prev) => [...prev, result.uri]);
    }
  };

  const handleRemovePic = (image) => {
    const temp = images.filter((currImage) => image !== currImage);
    setImages(temp);
  };

  const uploadPost = async () => {
    setLoading(true);
    if (images.length == 0 || !postText) {
      Alert.alert("חובה למלא את כל השדות");
      setLoading(false);
      return;
    }

    const imageURLs = images.map((image, index) => {
      const path =
        "/img/" +
        currentUser.uid +
        "/projects/" +
        new Date().getTime() +
        index +
        ".jpg";
      uploadImg(path, image);
      return path;
    });
    setImages(imageURLs);

    uploadDataPost(postText, pid, imageURLs, project.tags).then(() => {
      getPosts().then(() => navigation.navigate("Feed"));

    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={globalStyles.title_creat_post}>
        אז מה חדש ב{project.name}?
      </Text>
      <TextInput
        placeholder="דברו אלינו..."
        onChangeText={(text) => setPostText(text)}
        multiline={true}
        style={globalStyles.create_post_text}
      />
      <View style={globalStyles.profile_line}></View>

      <Pressable
        style={globalStyles.choose_img}
        title="img"
        onPress={() => {
          pickImage();
        }}
      >
        <Text style={globalStyles.choose_img_text}>
          <Ionicons name="image-outline" size={25}></Ionicons>+
        </Text>
      </Pressable>
      <FlatList
        data={images}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={{ position: "relative" }}>
            <Ionicons
              name="close-outline"
              style={globalStyles.del_img}
              size={20}
              onPress={() => {
                handleRemovePic(item);
              }}
            />
            <Image source={{ uri: item }} style={globalStyles.img_horizontal} />
          </View>
        )}
        ItemSeparatorComponent={() => {
          return <View style={{ width: 5, height: 100 }}></View>;
        }}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
      <Pressable
        style={globalStyles.to_post}
        title="post"
        onPress={() => {
          uploadPost();
        }}
        disabled={loading}
      >
        <Text style={globalStyles.to_post_text}>פרסמו אותי!</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CreatePost;
