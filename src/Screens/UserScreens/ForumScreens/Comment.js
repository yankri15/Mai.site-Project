import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserPicName from "../../../API/UserPicName";

const Comment = ({ navigation, commentData }) => {
  return (
    <SafeAreaView>
      <View>
        <UserPicName uid={commentData.uid} navigation={navigation} />
        <Text>{commentData.comment}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Comment;
