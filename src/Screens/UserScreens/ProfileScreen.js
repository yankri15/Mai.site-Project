//need to connect to user and differentiate between user and others taht see the profile
// need add connect to edit profile
//for change photo(need to add button): https://www.npmjs.com/package/react-native-image-picker

import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { View, Text, SafeAreaView, Image, ScrollView, Pressable } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/global";
import { useAuth } from "../../AuthProvider/AuthProvider";



const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [organiztion, setOrganiztion] = useState("");
  const [classs, setClasss] = useState("");
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    const getStatus = async () => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data()
        setName(userData.name)
        setSchool(userData.school)
        setNeighborhood(userData.neighborhood)
        setOrganiztion(userData.organiztion)
        setClasss(userData.classs)
        setBirthDate(userData.birthDate)
      }
    };
    getStatus().catch(console.error);
    return;
  }, [currentUser]);

  function calculate_age(birthDate) {
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    birth_date = birthDate.split('/')
    birth_day = birth_date[0]
    birth_month = birth_date[1]
    birth_year = birth_date[2]
    age = today_year - birth_year;
    if (today_month < (birth_month - 1)) {
      age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
      age--;
    }
    return age;
  }

  return (
    <SafeAreaView style={globalStyles.global}>
      <View style={globalStyles.stage1}>
        <Pressable
          style={globalStyles.profile_edit_btn}
          title="edit"
          onPress={() => { navigation.navigate("editProfile") }}
        >
          <Text style={globalStyles.profile_edit_btn_text}>עריכה</Text>
        </Pressable>
        <View style={globalStyles.picAndDetails}>
          <View>
            <View style={globalStyles.profile_pic}>
              <Image source={require('../../../assets/default_profile_pic.jpg')} style={globalStyles.logo_image_area} resizeMode="center"></Image>
            </View>
          </View>
          <View>
            <Text style={globalStyles.profile_details}>{name} {", "} {calculate_age(birthDate)} {", "} {neighborhood}</Text>
          </View>
          <View>
            <Text>תחומי עניין</Text>
          </View>
        </View>
        <View style={globalStyles.side_details}>
          <View style={globalStyles.circle_details}>
            <Text style={globalStyles.circle_details_text}>{school}</Text>
          </View>
          <View style={globalStyles.circle_details}>
            <Text style={globalStyles.circle_details_text}>{organiztion}</Text>
          </View>

        </View>
      </View>
      <View style={globalStyles.line}></View>
      <View style={globalStyles.stage2}>
        <Text>המיזמים שלי</Text>
      </View>
      <View style={globalStyles.line}></View>
      <View style={globalStyles.stage3}>
        <Text>שתפ"ים לחיפוש</Text>
      </View>
    </SafeAreaView>


  )
};

export default ProfileScreen
