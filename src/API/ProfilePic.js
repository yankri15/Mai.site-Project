import React from "react";
import { View, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { globalStyles } from "../styles/global";

const ProfilePic = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require("../../assets/profile-pic.png")}
            style={globalStyles.touchable_profile_pic}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePic;
