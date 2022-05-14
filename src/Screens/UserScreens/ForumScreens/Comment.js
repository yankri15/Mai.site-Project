import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserPicName from "../../../API/UserPicName";

const Comment = ({ commentData }) => {
  return (
    <SafeAreaView>
      <View>
        <UserPicName uid={commentData.uid} />
        <Text>{commentData.comment}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Comment;
