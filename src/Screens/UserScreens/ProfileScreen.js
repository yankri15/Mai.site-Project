//need to connect to user and differentiate between user and others taht see the profile
// need add connect to edit profile
//for change photo(need to add button): https://www.npmjs.com/package/react-native-image-picker

import React, { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { View, Text, SafeAreaView, Image, Pressable, FlatList } from "react-native";
import { globalStyles } from "../../styles/global";
import { EvilIcons, Ionicons, SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { useIsFocused } from "@react-navigation/native";
import { useData } from "../../AuthProvider/UserDataProvider";
import { ScrollView } from "react-native-gesture-handler";

const ProfileScreen = ({ route, navigation }) => {
  const uid = route.params ? route.params.uid : undefined;
  const { currentUser } = useAuth();
  const { projects, getProjects } = useData();
  const id = uid ? uid : currentUser.uid;
  const isFocused = useIsFocused();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [organiztion, setOrganiztion] = useState("");
  const [classs, setClasss] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profilePicUri, setProfilePicUri] = useState();

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
      setProfilePicUri(userData.pic);
      const imgRef = ref(storage, userData.pic);
      await getDownloadURL(imgRef).then((img) => {
        setProfilePicUri(img);
      });
    };

    getStatus().catch(console.error);
    getProjects().catch(console.error);
    return;
  }, [isFocused]);

  function calculate_age(birthDate) {
    const today_date = new Date();
    const today_year = today_date.getFullYear();
    const today_month = today_date.getMonth();
    const today_day = today_date.getDate();
    const splitedBirthDate = birthDate.split('/');
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

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      {currentUser.uid == id ? (
        <Pressable
          style={globalStyles.profile_edit_btn}
          title="edit"
          onPress={() => {
            navigation.navigate("ProfileEdit");
          }}
        >
          <Text style={globalStyles.profile_edit_btn_text}><EvilIcons name="pencil" size={35} ></EvilIcons></Text>
        </Pressable>
      ) : null}
      <View style={globalStyles.stage1}>
        <View style={globalStyles.picAndDetails}>
          <View style={globalStyles.profile_pic}>
            <Image
              source={{ uri: profilePicUri }}
              style={globalStyles.logo_image_area}
              resizeMode="center"
            ></Image>
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
          <Ionicons style={{ color: "#a77ce8" }} name="school-outline" size={20} ></Ionicons>
          <Text style={globalStyles.side_details_text}>בית הספר שלי: </Text>
          <Text>{school}</Text>
        </View>
        <View style={globalStyles.side_details_comp}>
          <SimpleLineIcons style={{ color: "#a77ce8" }} name="organization" size={20} ></SimpleLineIcons>
          <Text style={globalStyles.side_details_text}>הארגון שלי: </Text>
          <Text>{organiztion}</Text>
        </View>
        <View style={globalStyles.side_details_comp}>
          <MaterialCommunityIcons style={{ color: "#a77ce8" }} name="lightbulb-on-outline" size={20} ></MaterialCommunityIcons>
          <Text style={globalStyles.side_details_text}>תחומי העניין שלי: </Text>
        </View>
      </View>
      <View style={globalStyles.profile_line}></View>
      <View style={globalStyles.stage2}>
        <Text style={globalStyles.profile_title}>המיזמים שלי</Text>
        <FlatList
          data={projects}
          renderItem={({ item }) => (
            <Pressable
              style={globalStyles.profile_project}
              onPress={() => navigation.navigate("Project", { project: item })}
            >
              <Text style={globalStyles.profile_project_txt}>{item.name}</Text>
            </Pressable>
          )}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text>נראה שאין מה להציג כרגע..</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={globalStyles.profile_line}></View>
      <View style={globalStyles.stage3}>
        <Text style={globalStyles.profile_title}>שתפ"ים לחיפוש</Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
