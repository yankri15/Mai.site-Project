import { View, Text, Pressable, SafeAreaView } from "react-native";
import React from "react";
import { globalStyles } from "../../styles/global";

const GuestHomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={globalStyles.settingsContainer}>
     <View>
     <Text style={[globalStyles.landing_title_text, { marginBottom: '20%' }]}>שלום אורח</Text>
     </View>
      
      {/* Register */}
      <Pressable
        style={globalStyles.settingsBtn}
        title="register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={globalStyles.settingsBtnText}>אני רוצה להירשם</Text>
      </Pressable>

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
