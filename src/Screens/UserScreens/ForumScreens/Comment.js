import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserPicName from "../../../API/UserPicName";
import { Entypo } from "@expo/vector-icons";
import { globalStyles } from "../../../styles/global";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import moment from "moment";

const Comment = ({ navigation, commentData, first }) => {
  const { currentUser } = useAuth();
  const commentStyle = first
    ? globalStyles.first_comment
    : globalStyles.comment;
  return (
    <SafeAreaView>
      <View style={commentStyle}>
        <UserPicName
          uid={commentData.uid}
          navigation={navigation}
          posted={moment(
            new Date(commentData.creation.seconds * 1000)
          ).fromNow()}
        />
        {commentData.uid == currentUser.uid ? (
          <Entypo
            style={globalStyles.edit_comment}
            name="dots-three-horizontal"
            size={20}
          ></Entypo>
        ) : null}
        <Text style={globalStyles.comment_data}>{commentData.comment}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Comment;
