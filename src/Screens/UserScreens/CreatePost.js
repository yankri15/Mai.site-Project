import { View, Text, Pressable, TextInput, Image, SafeAreaView, Alert, FlatList, ScrollView, Vibration } from "react-native";
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
  const { uploadDataPost, uploadImg, getPosts } = useData();
  const { global } = globalStyles;
  const [image, setImage] = useState(null);
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
        setImages(prev => [...prev, result.uri]);
    }
};

  const handleRemovePic = (image) => {
    const temp = images.filter(currImage => image !== currImage);
    setImages(temp);
  }

  const uploadPost = async () => {
    setLoading(true);
    if (!image || !postText) {
      Alert.alert("חובה למלא את כל השדות");
      setLoading(false);
      return;
    }
    const date = new Date().toLocaleString();
    const path = "/img/" + currentUser.uid + "/posts/" + date + ".jpg";

    uploadImg(path, image).then(() => {
      uploadDataPost(path, postText).then(() => {
        getPosts();
        navigation.navigate("Feed");
      });
    });

  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={globalStyles.title_creat_post}>אז מה חדש במיזם שלכם?</Text>
      <TextInput
        placeholder="דברו אלינו..."
        onChangeText={(text) => setPostText(text)}
        multiline={true}
        style={globalStyles.create_post_text}
      />
      <View style={globalStyles.profile_line}></View>
      {/* {image ? (
        <View>
          <Image source={{ uri: image }} style={globalStyles.create_post_img} />
        </View>
      ) : (null)} */}
      <Pressable
        style={globalStyles.choose_img}
        title="img"
        onPress={()=>{
          pickImage();
          Vibration.vibrate(15)
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
          <View
            style={{ position: 'relative'}}
          >
            <Ionicons
              name="close-outline"
              style={globalStyles.del_img}
              size={20}
              onPress={() => { handleRemovePic(item) }}
            />
            <Image
              source={{ uri: item }}
              style={globalStyles.img_horizontal}
            />
          </View>
        )}
        // ListEmptyComponent={() => {
        //     return (
        //         <View
        //             style={{ marginTop: 20 }}
        //         >
        //             <Text>התמונות שתעלו יוצגו כאן..</Text>
        //         </View>
        //     );
        // }}
        ItemSeparatorComponent={() => {
          return (
            <View style={{ width: 5, height: 100 }}></View>
          )
        }}
        keyExtractor={(item, index) => index.toString()}
      >
      </FlatList >
      <Pressable
      style={globalStyles.to_post}
      title="post"
      onPress={()=>{
        uploadPost();
        Vibration.vibrat(15)
      }}
      disabled={loading}>
        <Text style={globalStyles.to_post_text}>פרסמו אותי!</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default CreatePost;
