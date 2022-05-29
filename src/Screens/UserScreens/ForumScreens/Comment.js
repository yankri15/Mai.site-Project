import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserPicName from "../../../API/UserPicName";
import { Entypo } from "@expo/vector-icons";
import { globalStyles } from "../../../styles/global";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import { useData } from "../../../AuthProvider/UserDataProvider";
import moment from "moment";
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
const Comment = ({
  navigation,
  commentId,
  commentLocation,
  commentData,
  first,
}) => {
  const { deleteComment } = useData();
  const { Popover } = renderers;
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
        <Menu
          renderer={Popover}
          rendererProps={{ preferredPlacement: "right" }}
          style={{ position: 'absolute', top: '10%', right: '2%' }}
        >
          <MenuTrigger>
            {commentData.uid == currentUser.uid ? (
              <Entypo name="dots-three-horizontal" size={20}></Entypo>
            ) : null}
          </MenuTrigger>
          <MenuOptions>
            <Pressable
              style={globalStyles.edit_comment}
              onPress={() => {
                deleteComment(commentLocation, commentId);
              }}
            >
              <Text>מחק</Text>
            </Pressable>
          </MenuOptions>
        </Menu>
        <Text style={globalStyles.comment_data}>{commentData.comment}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Comment;
