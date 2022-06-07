import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TextInput,
  Pressable,
  Text,
  Picker,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { globalStyles } from "../../styles/global";
import { useData } from "../../AuthProvider/UserDataProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const EditProfileScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const { changeData, uploadImg, getNeighborhoods, saveDownloadURL, image } =
    useData();
  const [imageToBeSet, setImageImageToBeSet] = useState(null);
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [classs, setClasss] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [organiztion, setOrganiztion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const defaultImage = require("../../../assets/default_profile_pic.jpg");

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      setName(userData.name);
      setNeighborhood(userData.neighborhood);
      setSchool(userData.school);
      setClasss(userData.class);
      setOrganiztion(userData.organiztion);
      getNeighborhoods().then((res) => setNeighborhoods(res));
    };
    getUserData();
  }, []);

  async function handleChanges() {
    setLoading(true);
    if (!name || !school || !classs || !neighborhood || !organiztion) {
      Alert.alert("אנא מלא את כל השדות");
      setLoading(false);
      return;
    }
    try {
      setError("");
      setLoading(true);
      const uid = currentUser.uid;
      let path = "";
      if (imageToBeSet) {
        const date = new Date().getTime();
        path = "/img/" + currentUser.uid + "/pofile/" + date + ".jpg";
        uploadImg(path, imageToBeSet).then(() => {
          changeData(
            uid,
            name,
            school,
            classs,
            neighborhood,
            organiztion,
            path
          ).then(() => {
            saveDownloadURL(path).then(() => {
              navigation.navigate("פרופיל");
            });
          });
        });
      } else {
        changeData(
          uid,
          name,
          school,
          classs,
          neighborhood,
          organiztion,
          path
        ).then(() => {
          navigation.navigate("פרופיל");
        });
      }
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
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageImageToBeSet(result.uri);
    }
  };

  const renderNeighborhoods = () => {
    return neighborhoods.map((element, index) => {
      return <Picker.Item label={element} value={element} key={index} />;
    });
  };

  return (
    <SafeAreaView style={globalStyles.container_enter_screens}>
      {image && (
        <Image
          source={image ? { uri: image } : defaultImage}
          style={globalStyles.edit_profile_pic}
        />
      )}
      <View style={globalStyles.take_a_pic}>
        <Pressable
          style={globalStyles.take_a_pic_btn}
          title="pickImage"
          onPress={pickImage}
          disabled={loading}
        >
          <Text style={globalStyles.take_a_pic_btn_text}>העלה תמונה </Text>
          <MaterialIcons
            style={{ color: "#fdc123" }}
            name="photo-library"
            size={20}
          ></MaterialIcons>
        </Pressable>
      </View>
      <TextInput
        style={globalStyles.textInput}
        value={name}
        maxLength={16}
        onChangeText={(text) => setName(text)}
      />
      <View style={globalStyles.textInput}>
        <Picker
          selectedValue={neighborhood}
          style={[
            isPlaceholder(neighborhood)
              ? { color: "#999" }
              : { color: "black" },
            { width: "105%" },
            { height: 28 },
          ]}
          onValueChange={(itemValue) => setNeighborhood(itemValue)}
        >
          <Picker.Item label="בחר שכונה" value="choose" />
          {renderNeighborhoods()}
        </Picker>
      </View>
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
