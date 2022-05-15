import React, { useState, useEffect } from "react";
import {
  Button,
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
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const EditProfileScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const { changeData, uploadImg } = useData();
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
      const imgRef = ref(storage, userData.pic);
      await getDownloadURL(imgRef).then((img) => {
        setImage(img);
      });
    };
    getUserData();
  }, []);

  async function handleChanges() {
    if (!name || !school || !classs || !neighborhood || !organiztion) {
      Alert.alert('אנא מלא את כל השדות');
      return;
    }
    try {
      setError("");
      setLoading(true);
      const uid = currentUser.uid;
      const date = new Date().toLocaleString();
      const path = "/img/" + currentUser.uid + "/pofile/" + date + ".jpg";
      uploadImg(path, image);
      changeData(uid, name, school, classs, neighborhood, organiztion, path);
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
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickImageFromCamera = async () => {
    // No permissions request is necessary for launching the image camera
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

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
          <MaterialIcons style={{ color: "#fdc123" }} name="photo-library" size={20}></MaterialIcons>
          <Text style={globalStyles.take_a_pic_btn_text}>תמונה מהגלריה  </Text>
        </Pressable>
        {/* <Button title="בחר/י תמונה מגלריה" onPress={pickImage} /> */}
        <Pressable
          style={globalStyles.take_a_pic_btn}
          title="pickImageFromCamera"
          onPress={pickImageFromCamera}
          disabled={loading}
        >
          <Ionicons style={{ color: "#fdc123" }} name="camera-outline" size={20}></Ionicons>
          <Text style={globalStyles.take_a_pic_btn_text}>צלם/י תמונה  </Text>
        </Pressable>
        {/* <Button title="צלם/י תמונה" onPress={pickImageFromCamera} /> */}
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
            isPlaceholder(neighborhood) ? { color: "#999" } : { color: "black" },
            { width: "105%" },
            { height: 28 },
          ]}
          onValueChange={(itemValue) => setNeighborhood(itemValue)}
        >
          <Picker.Item label="בחר שכונה" value="choose" />
          <Picker.Item label="אבו תור" value="אבו תור" />
          <Picker.Item label="ארמון הנציב" value="ארמון הנציב" />
          <Picker.Item label="ארנונה" value="ארנונה" />
          <Picker.Item label="בית הכרם" value="בית הכרם" />
          <Picker.Item label="בית וגן" value="בית וגן" />
          <Picker.Item label="בית חנינא" value="בית חנינא"  />
          <Picker.Item label="בית צפאפא" value="בית צפאפא" />
          <Picker.Item label="בקעה" value="בקעה" />
          <Picker.Item label="ג'אבל מוכאבר" value="ג'אבל מוכאבר" />
          <Picker.Item label="גבעת מרדכי" value="גבעת מרדכי" />
          <Picker.Item label="גבעת משואה" value="גבעת משואה"  />
          <Picker.Item label="גילה" value="גילה"/>
          <Picker.Item label="גוננים" value="גוננים" />
          <Picker.Item label="הבוכרים" value="הבוכרים" />
          <Picker.Item label="הגבעה הצרפתית" value="הגבעה הצרפתית" />
          <Picker.Item label="המושבה האמריקאית" value="המושבה האמריקאית"  />
          <Picker.Item label="המושבה הגרמנית" value="המושבה הגרמנית" />
          <Picker.Item label="הר נוף" value="הר נוף" />
          <Picker.Item label="הרובע היהודי" value="הרובע היהודי" />
          <Picker.Item label="ואדי ג'וז" value="ואדי ג'וז" />
          <Picker.Item label="טלביה" value="טלביה"/>
          <Picker.Item label="מאה שערים" value="מאה שערים" />
          <Picker.Item label="מוסררה" value="מוסררה" />
          <Picker.Item label="מלחה" value="מלחה" />
          <Picker.Item label="מעלות דפנה" value="מעלות דפנה" />
          <Picker.Item label="נווה יעקב" value="נווה יעקב"  />
          <Picker.Item label="נחלאות" value="נחלאות" />
          <Picker.Item label="ניות" value="ניות" />
          <Picker.Item label="סילוואן" value="סילוואן" />
          <Picker.Item label="סנהדריה" value="סנהדריה"  />
          <Picker.Item label="עין כרם" value="עין כרם"  />
          <Picker.Item label="עיסוויאה" value="עיסוויאה"  />
          <Picker.Item label="עיר גנים" value="עיר גנים"  />
          <Picker.Item label="פסגת זאב" value="פסגת זאב"  />
          <Picker.Item label="פת" value="פת" />
          <Picker.Item label="קריית יובל" value="קריית יובל"  />
          <Picker.Item label="קריית מנחם" value="קריית מנחם"  />
          <Picker.Item label="קריית משה" value="קריית משה"  />
          <Picker.Item label="ראס אל עמוד" value="ראס אל עמוד" />
          <Picker.Item label="רוממה" value="רוממה"  />
          <Picker.Item label="רחביה" value="רחביה"  />
          <Picker.Item label="רמות" value="רמות"  />
          <Picker.Item label="רמת אשכול" value="רמת אשכול"  />
          <Picker.Item label="רמת שלמה" value="רמת שלמה"  />
          <Picker.Item label="רמת שרת" value="רמת שרת"  />
          <Picker.Item label="רמת דניה" value="רמת דניה"  />
          <Picker.Item label="שועפט" value="שועפט"  />
          <Picker.Item label="שייח ג'ראח" value="שייח ג'ראח"  />
          <Picker.Item label="שמואל הנביא" value="שמואל הנביא"  />
          <Picker.Item label="תלפיות" value="תלפיות"  />
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
