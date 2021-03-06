import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { useData } from "../../AuthProvider/UserDataProvider";
import { globalStyles } from "../../styles/global";

const GuestHomeScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const { userStatus, getName, name } = useData();
  const [error, setError] = useState("");

  useEffect(() => {
    if (userStatus) {
      getName();
    }
    return;
  }, []);

  async function handleLogout() {
    try {
      setError("");
      await logout();
    } catch (err) {
      setError("Failed to logout");
      console.log(error + ":\n " + err);
    }
  }

  return (
    <SafeAreaView style={[globalStyles.global, globalStyles.settingsContainer]}>
      <View style={{ alignItems: 'center' }}>
        <Text style={globalStyles.landing_title_text}>
          שלום {userStatus === 1 && name ? name.split(" ")[0] : "אורח"}
        </Text>
        {userStatus === 1 ? (
          <View style={globalStyles.approval_waiting_view}>
            <Text style={globalStyles.approval_waiting}>
              עליך להמתין עד לקבלת אישור,{"\n"} יש להכנס שוב מאוחר יותר.{"\n"} תודה על הסבלנות!
            </Text>
          </View>
        ) : null}
      </View>

      {/* Register */}
      {userStatus !== 1 ? (
        <Pressable
          style={globalStyles.settingsBtn}
          title="register"
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={globalStyles.settingsBtnText}>אני רוצה להירשם</Text>
        </Pressable>
      ) : null}

      {/* Statistics */}
      <Pressable
        style={globalStyles.settingsBtn}
        title="statistics"
        onPress={() => {
          navigation.navigate("Statistics");
        }}
      >
        <Text style={globalStyles.settingsBtnText}>סטטיסטיקות</Text>
      </Pressable>

      {/* Map */}
      <Pressable
        style={globalStyles.settingsBtn}
        title="map"
        onPress={() => {
          navigation.navigate("Map");
        }}
      >
        <Text style={globalStyles.settingsBtnText}>צפה במפה</Text>
      </Pressable>

      {/* Contact */}
      <Pressable
        style={globalStyles.settingsBtn}
        title="contact"
        onPress={() => {
          navigation.navigate("Contact");
        }}
      >
        <Text style={globalStyles.settingsBtnText}>צור קשר</Text>
      </Pressable>
      {userStatus === 1 ? (
      <Pressable
        onPress={handleLogout}
        style={{ flexDirection: 'row', marginTop: '5%' }}
      >
        <Text style={globalStyles.out_blue_btn}>{'התנתקות'}</Text>
        <Ionicons name="log-out-outline" size={20} style={{color: 'blue', marginLeft: '1%'}}></Ionicons>
      </Pressable>
      ) : null}
    </SafeAreaView>
  );
};

export default GuestHomeScreen;
