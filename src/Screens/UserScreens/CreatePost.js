import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { globalStyles } from "../../styles/global";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { doc, setDoc, serverTimestamp, collection, addDoc, } from "firebase/firestore";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useData } from "../../AuthProvider/UserDataProvider";

const CreatePost = ({ navigation }) => {
  const { currentUser } = useAuth();
  const { uploadDataPost, uploadImg } = useData();
  const { global } = globalStyles;
  const [image, setImage] = useState(null);
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadPost = async () => {
    setLoading(true);
    if (!image || !postText) {
      Alert.alert("חובה למלא את כל השדות");
      setLoading(false);
      return;
    }
    const date = new Date().toLocaleString();
    const path = "/img/" + currentUser.uid + "/posts/" + date + ".jpg";

    uploadImg(path, image);
    uploadDataPost(path, postText);

    navigation.navigate("Feed");
  };

  return (
    <SafeAreaView style={global}>
      <Text style={globalStyles.title_creat_post}>שתפו אותנו במיזם חדש!</Text>
      <TextInput
        placeholder="דברו אלינו..."
        onChangeText={(text) => setPostText(text)}
        multiline={true}
        style={globalStyles.create_post_text}
      />
      <View style={globalStyles.profile_line}></View>
      {image ? (
        <View>
          <Image source={{ uri: image }} style={globalStyles.create_post_img} />
        </View>
      ) : (null)}
      <Pressable
        style={globalStyles.choose_img}
        title="img"
        onPress={pickImage}
      >
        <Text style={globalStyles.choose_img_text}>
          <Ionicons name="image-outline" size={25}></Ionicons>+
        </Text>
      </Pressable>
      <Pressable style={globalStyles.to_post} title="post" onPress={uploadPost} disabled={loading}>
        <Text style={globalStyles.to_post_text}>פרסמו אותי!</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CreatePost;
