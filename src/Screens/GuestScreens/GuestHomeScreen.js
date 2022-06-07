import React, { useEffect } from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import { globalStyles } from "../../styles/global";
import { useData } from "../../AuthProvider/UserDataProvider";

const GuestHomeScreen = ({ navigation }) => {
  const { userStatus, getName, name } = useData();

  useEffect(() => {
    if (userStatus) {
      getName();
    }
    return;
  }, []);

  return (
    <SafeAreaView style={globalStyles.settingsContainer}>
      <View>
        <Text style={[globalStyles.landing_title_text]}>
          שלום {userStatus === 1 ? name.split(" ")[0] : "אורח"}
        </Text>
        {userStatus === 1 ? (
          <Text style={{ alignSelf: "center" }}>אתה ממתין לאישור</Text>
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
    </SafeAreaView>
  );
};

export default GuestHomeScreen;
