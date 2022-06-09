import { EvilIcons, Ionicons, MaterialIcons, SimpleLineIcons, } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, Modal, Pressable, Text, View, } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ImageViewer from "react-native-image-zoom-viewer";
import { db } from "../../../firebase";
import Job from "../../API/Job";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { useData } from "../../AuthProvider/UserDataProvider";
import { globalStyles } from "../../styles/global";
const defaultImage = require("../../../assets/default_profile_pic.jpg");

const ProfileScreen = ({ route, navigation }) => {
  const uid = route.params ? route.params.uid : undefined;
  const { currentUser } = useAuth();
  const {
    projects,
    getProjects,
    myJobs,
    getMyJobs,
    saveDownloadURL,
    uploadImg,
    deleteFile,
  } = useData();
  const id = uid ? uid : currentUser.uid;
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState({});
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [organiztion, setOrganiztion] = useState("");
  const [classs, setClasss] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [showModalCP, setShowModalCP] = useState(false);
  const [DisplayImages, setDisplayImages] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      setUserData(userData);
      setName(userData.name);
      setSchool(userData.school);
      setNeighborhood(userData.neighborhood);
      setOrganiztion(userData.organiztion);
      setClasss(userData.classs);
      setBirthDate(userData.birthDate);
      setProfilePic(userData.profilePic);
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const date = new Date().getTime();
      if (userData.pic) deleteFile(userData.pic);
      const path = "/img/" + currentUser.uid + "/pofile/" + date + ".jpg";
      uploadImg(path, result.uri)
        .then(() => {
          saveDownloadURL(path).then((img) => {
            setProfilePic(img);
            setShowModalCP(!showModalCP);
          });
        })
        .catch(console.error);
    }
  };

  return (
    <ScrollView>
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
          {
            <Pressable
              style={[
                globalStyles.take_a_pic_btn,
                { width: "50%", height: "8%", marginBottom: "4%" },
              ]}
              title="showPic"
              onPress={() => {
                setDisplayImages(!DisplayImages);
              }}
              disabled={loading}
            >
              <Text
                style={[globalStyles.take_a_pic_btn_text, { fontSize: 20 }]}
              >
                הצג תמונה{" "}
              </Text>
            </Pressable>
          }
          <Pressable
            style={[
              globalStyles.take_a_pic_btn,
              { width: "50%", height: "8%", marginBottom: "4%" },
            ]}
            title="pickImage"
            onPress={pickImage}
            disabled={loading}
          >
            <Text style={[globalStyles.take_a_pic_btn_text, { fontSize: 20 }]}>
              העלאת תמונה{" "}
            </Text>
            <MaterialIcons
              style={{ color: "#fdc123" }}
              name="photo-library"
              size={22}
            ></MaterialIcons>
          </Pressable>

          <Pressable
            style={[
              globalStyles.take_a_pic_btn,
              { width: "50%", height: "8%", backgroundColor: "#fdc123" },
            ]}
            title="dicard"
            onPress={() => {
              setShowModalCP(!showModalCP);
            }}
            disabled={loading}
          >
            <Text
              style={[
                globalStyles.take_a_pic_btn_text,
                { fontSize: 20, color: "black" },
              ]}
            >
              ביטול{" "}
            </Text>
          </Pressable>
        </View>
      </Modal>
      <Modal
        visible={DisplayImages}
        onRequestClose={() => {
          setDisplayImages(!DisplayImages);
        }}
      >
        <ImageViewer imageUrls={[{ url: profilePic }]} />
      </Modal>
      {currentUser.uid == id ? (
        <Pressable
          style={globalStyles.profile_edit_btn}
          title="edit"
          onPress={() => {
            navigation.navigate("עריכת פרופיל");
          }}
        >
          <Text style={globalStyles.profile_edit_btn_text}>
            <EvilIcons
              name="pencil"
              size={35}
              style={{ color: "#b0b0b0" }}
            ></EvilIcons>
          </Text>
        </Pressable>
      ) : null}
      <View style={globalStyles.stage1}>
        <View style={globalStyles.picAndDetails}>
          <Pressable
            title="editPic"
            onPress={() => {
              currentUser.uid == id
                ? setShowModalCP(!showModalCP)
                : setDisplayImages(!DisplayImages);
            }}
          >
            <View style={globalStyles.profile_pic}>
              <ImageBackground
                source={profilePic ? { uri: profilePic } : defaultImage}
                style={globalStyles.logo_image_area}
                resizeMode="contain"
              ></ImageBackground>
            </View>
          </Pressable>

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
            size={23}
          ></Ionicons>
          <Text style={globalStyles.side_details_text}>בית הספר שלי: </Text>
          <Text style={{ fontSize: 16 }}>{school}</Text>
        </View>
        <View style={globalStyles.side_details_comp}>
          <SimpleLineIcons
            style={{ color: "#a77ce8", marginRight: "2%" }}
            name="organization"
            size={23}
          ></SimpleLineIcons>
          <Text style={globalStyles.side_details_text}>הארגון שלי: </Text>
          <Text style={{ fontSize: 16 }}>{organiztion}</Text>
        </View>
      </View>
      <View style={globalStyles.profile_line}></View>
      <View style={globalStyles.stage2}>
        <Text style={globalStyles.profile_title}>המיזמים שלי</Text>
        <FlatList
          data={projects}
          horizontal={true}
          style={{ marginRight: "0.5%", marginLeft: "0.5%" }}
          renderItem={({ item }) => (
            <Pressable
              style={globalStyles.profile_project}
              onPress={() =>
                navigation.navigate("פרויקט", {
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
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text style={globalStyles.be_first}>
                  נראה שאין מה להציג כרגע..
                </Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={globalStyles.profile_line}></View>
      <View style={globalStyles.stage3}>
        <Text style={globalStyles.profile_title}>הדרושים שלי</Text>
        {myJobs.length > 0 ? (
          myJobs.map((element, index) => {
            return <Job job={element} profileScreen={true} key={index} />;
          })
        ) : (
          <View>
            <Text style={globalStyles.be_first}>נראה שאין דרושים כרגע..</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
