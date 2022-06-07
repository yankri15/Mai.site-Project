import { EvilIcons, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, Image, Modal, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../../firebase";
import Job from "../../API/Job";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { useData } from "../../AuthProvider/UserDataProvider";
import { globalStyles } from "../../styles/global";
const defaultImage = require("../../../assets/default_profile_pic.jpg");

const ProfileScreen = ({ route, navigation }) => {
  const uid = route.params ? route.params.uid : undefined;
  const { currentUser } = useAuth();
  const { projects, getProjects, myJobs, getMyJobs } = useData();
  const id = uid ? uid : currentUser.uid;
  const isFocused = useIsFocused();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [organiztion, setOrganiztion] = useState("");
  const [classs, setClasss] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profilePicUri, setProfilePicUri] = useState("");
  const [showModalCP, setShowModalCP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getStatus = async () => {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      setName(userData.name);
      setSchool(userData.school);
      setNeighborhood(userData.neighborhood);
      setOrganiztion(userData.organiztion);
      setClasss(userData.classs);
      setBirthDate(userData.birthDate);
      if (userData.pic !== "") {
        setProfilePicUri(userData.profilePic);
        // const imgRef = ref(storage, userData.pic);
        // await getDownloadURL(imgRef).then((img) => {
        // });
      }
    };

    getStatus().catch(console.error);
    getProjects(id).catch(console.error);
    getMyJobs(id).catch(console.error);
    return;
  }, [isFocused]);

  function calculate_age(birthDate) {
    const today_date = new Date();
    const today_year = today_date.getFullYear();
    const today_month = today_date.getMonth();
    const today_day = today_date.getDate();
    const splitedBirthDate = birthDate.split("/");
    const birth_day = splitedBirthDate[0];
    const birth_month = splitedBirthDate[1];
    const birth_year = splitedBirthDate[2];
    let age = today_year - birth_year;
    if (today_month < birth_month - 1) {
      age--;
    }
    if (birth_month - 1 == today_month && today_day < birth_day) {
      age--;
    }
    return age;
  }

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
      setShowModalCP(!showModalCP);
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
      setShowModalCP(!showModalCP);
    }
  };
  return (
    <ScrollView style={globalStyles.global}>
      <Modal
        style={[globalStyles.modal, { margin: 0 }]}
        animationType={"slide"}
        transparent={false}
        visible={showModalCP}
        onRequestClose={() => {
          setShowModalCP(!showModalCP);
        }}
      >
        <View style={globalStyles.modalView}>
          <Pressable
            style={[globalStyles.take_a_pic_btn, { width: "50%", height: "8%", marginBottom: "4%" }]}
            title="pickImage"
            onPress={pickImage}
            disabled={loading}
          >
            <Text style={[globalStyles.take_a_pic_btn_text, { fontSize: 20 }]}>
              תמונה מהגלריה{" "}
            </Text>
            <MaterialIcons
              style={{ color: "#fdc123" }}
              name="photo-library"
              size={22}
            ></MaterialIcons>
          </Pressable>
          <Pressable
            style={[globalStyles.take_a_pic_btn, { width: "50%", height: "8%", marginBottom: "4%" }]}
            title="pickImageFromCamera"
            onPress={pickImageFromCamera}
            disabled={loading}
          >
            <Text style={[globalStyles.take_a_pic_btn_text, { fontSize: 20 }]}>
              צלם/י תמונה{" "}
            </Text>
            <Ionicons
              style={{ color: "#fdc123" }}
              name="camera-outline"
              size={22}
            ></Ionicons>
          </Pressable>
          <Pressable
            style={[globalStyles.take_a_pic_btn, { width: "50%", height: "8%", backgroundColor: '#fdc123' }]}
            title="dicard"
            onPress={() => {
              setShowModalCP(!showModalCP);
            }}
            disabled={loading}
          >
            <Text style={[globalStyles.take_a_pic_btn_text, { fontSize: 20, color: 'black' }]}>
              ביטול{" "}
            </Text>
          </Pressable>
        </View>
      </Modal>

      {currentUser.uid == id ? (
        <Pressable
          style={globalStyles.profile_edit_btn}
          title="edit"
          onPress={() => {
            navigation.navigate("ProfileEdit");
          }}
        >
          <Text style={globalStyles.profile_edit_btn_text}>
            <EvilIcons name="pencil" size={35} style={{ color: "#b0b0b0" }}></EvilIcons>
          </Text>
        </Pressable>
      ) : null}
      <View style={globalStyles.stage1}>
        <View style={globalStyles.picAndDetails}>
          {currentUser.uid == id ? (
            <View style={globalStyles.edit_pic_view}>
              <Pressable
                title="editPic"
                onPress={() => {
                  setShowModalCP(!showModalCP);
                }}
              >
                <View style={globalStyles.edit_pic}>
                  <FontAwesome5 name="camera" size={20} style={{ color: "black" }}></FontAwesome5>
                </View>
              </Pressable>
            </View>
          ) : null}
          <View style={globalStyles.profile_pic}>
            <ImageBackground
              source={profilePicUri ? { uri: profilePicUri } : defaultImage}
              style={globalStyles.logo_image_area}
              resizeMode="contain"
            >
            </ImageBackground>
          </View>
          <View>
            <Text style={globalStyles.profile_details}>
              {name} {", "} {calculate_age(birthDate)} {", "} {neighborhood}
            </Text>
          </View>
        </View>
      </View>
      <View style={globalStyles.side_details}>
        <View style={globalStyles.side_details_comp}>
          <Ionicons
            style={{ color: "#a77ce8", marginRight: "2%" }}
            name="school-outline"
            size={20}
          ></Ionicons>
          <Text style={globalStyles.side_details_text}>בית הספר שלי: </Text>
          <Text>{school}</Text>
        </View>
        <View style={globalStyles.side_details_comp}>
          <SimpleLineIcons
            style={{ color: "#a77ce8", marginRight: "2%" }}
            name="organization"
            size={20}
          ></SimpleLineIcons>
          <Text style={globalStyles.side_details_text}>הארגון שלי: </Text>
          <Text>{organiztion}</Text>
        </View>
        <View style={globalStyles.side_details_comp}>
          <MaterialCommunityIcons
            style={{ color: "#a77ce8", marginRight: "2%" }}
            name="lightbulb-on-outline"
            size={20}
          ></MaterialCommunityIcons>
          <Text style={globalStyles.side_details_text}>תחומי העניין שלי: </Text>
        </View>
      </View>
      <View style={globalStyles.profile_line}></View>
      <View style={globalStyles.stage2}>
        <Text style={globalStyles.profile_title}>המיזמים שלי</Text>
        <FlatList
          data={projects}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          style={{ paddingRight: "15%", paddingLeft: "15%" }}
          renderItem={({ item }) => (
            <Pressable
              style={globalStyles.profile_project}
              onPress={() =>
                navigation.navigate("Project", {
                  project: item.data,
                  pid: item.pid,
                })
              }
            >
              <Text style={globalStyles.profile_project_txt}>
                {item.data.name}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text style={globalStyles.be_first}>נראה שאין מה להציג כרגע..</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={globalStyles.profile_line}></View>
      <View style={globalStyles.stage3}>
        <Text style={globalStyles.profile_title}>הדרושים שלי</Text>
        <FlatList
          data={myJobs}
          renderItem={({ item }) => <Job job={item} />}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text style={globalStyles.be_first}>נראה שאין דרושים כרגע..</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
