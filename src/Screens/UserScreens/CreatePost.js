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
import { doc, setDoc } from "firebase/firestore";

const CreatePost = ({ navigation }) => {
  const { currentUser } = useAuth();
  const { global } = globalStyles;
  const [image, setImage] = useState(null);
  const [postText, setPostText] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadPost = async () => {
    if (!image || !postText) {
      Alert.alert("חובה למלא את כל השדות");
      return;
    }
    const date = new Date().toLocaleString();
    const path = "/img/" + currentUser.uid + date + ".jpg";
    const docRef = ref(storage, path);
    const img = await fetch(image);
    const bytes = await img.blob();
    await uploadBytes(docRef, bytes);

    await setDoc(doc(db, "posts", currentUser.uid), {
      downloadURL: path,
      postText: postText,
      creation: new Date(),
    });

    navigation.navigate();
  };

  return (
    <SafeAreaView style={global}>
      <Text style={globalStyles.title_creat_post}>שתף/י אותנו במיזם חדש!</Text>
      <TextInput
        placeholder="דבר/י אלינו"
        onChangeText={(text) => setPostText(text)}
        multiline={true}
        style={globalStyles.post_text}
      />
      {image ? (
        <Image source={{ uri: image }} style={{ height: 100, width: 100 }} />
      ) : (
        <Pressable
          style={globalStyles.choose_img}
          title="img"
          onPress={pickImage}
        >
          <Text style={globalStyles.choose_img_text}>+ בוא/י נוסיף תמונה</Text>
        </Pressable>
      )}
      <Pressable style={globalStyles.to_post} title="post" onPress={uploadPost}>
        <Text style={globalStyles.to_post_text}>פרסם אותי!</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CreatePost;
