import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserPicName from "../../../API/UserPicName";
import { globalStyles } from '../../../styles/global';

const Comment = ({ navigation, commentData }) => {
  return (
    <SafeAreaView>
      <View style={globalStyles.comment}>
        <UserPicName uid={commentData.uid} navigation={navigation} />
        <Text style={globalStyles.comment_data}>{commentData.comment}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Comment;
