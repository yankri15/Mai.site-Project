import React, { useState } from "react";
import { Button, Image, View, TextInput, Pressable, Text,Picker } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { globalStyles } from "../../styles/global";
import { useData } from "../../AuthProvider/UserDataProvider";

const editProfileScreen = ({ navigation }) => {
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
  };

  const isPlaceholder = (value) => {
    return value == "";
}

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <Image source={{ uri: image }} style={{ height: 100, width: 100 }} />
      )}
      <Button title="בחר תמונה מגלריה" onPress={pickImage} />
      <Button title="צלם תמונה " onPress={pickImageFromCamera} />

      <TextInput placeholder="שם" onChangeText={(text) => setName(text)} />
      <TextInput
        placeholder="שכונה"
        onChangeText={(text) => setNeighborhood(text)}
      />
      <TextInput
        placeholder="בית ספר"
        onChangeText={(text) => setSchool(text)}
      />
      <View>
        <Picker
          selectedValue={classs}
          style={[
            isPlaceholder(classs) ? { color: "#999" } : { color: "black" },
            { width: 330 },
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
        placeholder="ארגון"
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
    </View>
  );
};

export default editProfileScreen;

