import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePic = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require("../../assets/profile-pic.png")}
            style={{
              height: 50,
              width: 50,
              borderRadius: 40,
              marginLeft: 10,
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePic;
