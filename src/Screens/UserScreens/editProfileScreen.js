import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  TextInput,
  Pressable,
  Text,
  Picker,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { globalStyles } from "../../styles/global";
import { useData } from "../../AuthProvider/UserDataProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfileScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const { changeData } = useData();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [classs, setClasss] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [organiztion, setOrganiztion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      setName(userData.name);
      setNeighborhood(userData.neighborhood);
      setSchool(userData.school);
      setOrganiztion(userData.organiztion);
      // console.log('Getting data/////////////');
      // console.log(userData.name)
    };
    getUserData();
  }, []);

  async function handleChanges() {
    try {
      setError("");
      setLoading(true);
      const uid = currentUser.uid;
      changeData(uid, name, school, classs, neighborhood, organiztion);
      navigation.navigate("Profile");
    } catch (err) {
      setError("Failed to change details");
      console.log(error + ":\n " + err);
      alert(err);
    }
    setLoading(false);
  }

  const isPlaceholder = (value) => {
    return value == "";
  };

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

  const pickImageFromCamera = async () => {
    // No permissions request is necessary for launching the image camera
    let result = await ImagePicker.launchCameraAsync({
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

  return (
    <SafeAreaView
      style={[globalStyles.global, globalStyles.container_enter_screens]}
    >
      {image && (
        <Image source={{ uri: image }} style={globalStyles.edit_profile_pic} />
      )}
      <View style={globalStyles.take_a_pic}>
        <Pressable
          style={globalStyles.take_a_pic_btn}
          title="pickImage"
          onPress={pickImage}
          disabled={loading}
        >
          <Text style={globalStyles.take_a_pic_btn_text}>
            בחר/י תמונה מגלריה
          </Text>
        </Pressable>
        {/* <Button title="בחר/י תמונה מגלריה" onPress={pickImage} /> */}
        <Pressable
          style={globalStyles.take_a_pic_btn}
          title="pickImageFromCamera"
          onPress={pickImageFromCamera}
          disabled={loading}
        >
          <Text style={globalStyles.take_a_pic_btn_text}>צלם/י תמונה</Text>
        </Pressable>
        {/* <Button title="צלם/י תמונה" onPress={pickImageFromCamera} /> */}
      </View>
      <TextInput
        style={globalStyles.textInput}
        value={name}
        maxLength={16}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={globalStyles.textInput}
        value={neighborhood}
        maxLength={13}
        onChangeText={(text) => setNeighborhood(text)}
      />
      <TextInput
        style={globalStyles.textInput}
        value={school}
        maxLength={25}
        onChangeText={(text) => setSchool(text)}
      />
      <View style={globalStyles.textInput}>
        <Picker
          selectedValue={classs}
          style={[
            isPlaceholder(classs) ? { color: "#999" } : { color: "black" },
            { width: "105%" },
            { height: 28 },
          ]}
          onValueChange={(itemValue) => setClasss(itemValue)}
        >
          <Picker.Item label="בחר כיתה" value="choose" />
          <Picker.Item label="ט" value="ט" />
          <Picker.Item label="י" value="י" />
          <Picker.Item label="יא" value="יא" />
          <Picker.Item label="יב" value="יב" />
        </Picker>
      </View>
      <TextInput
        style={globalStyles.textInput}
        value={organiztion}
        maxLength={25}
        onChangeText={(text) => setOrganiztion(text)}
      />
      <Pressable
        style={globalStyles.enter_button}
        title="change"
        onPress={handleChanges}
        disabled={loading}
      >
        <Text style={globalStyles.enter_btn_text}>שנה פרטים</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
