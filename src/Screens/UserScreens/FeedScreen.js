import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePic from "../../API/ProfilePic";

const FeedScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ProfilePic navigation={navigation} />
    </SafeAreaView>
  );
};

export default FeedScreen;
