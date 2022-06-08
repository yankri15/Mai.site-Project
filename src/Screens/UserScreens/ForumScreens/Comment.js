import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { Pressable, Text, View } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
} from "react-native-popup-menu";
import { SafeAreaView } from "react-native-safe-area-context";
import UserPicName from "../../../API/UserPicName";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import { useData } from "../../../AuthProvider/UserDataProvider";
import { globalStyles } from "../../../styles/global";

const Comment = ({
  navigation,
  commentId,
  commentLocation,
  commentData,
  first,
}) => {
  const { deleteComment, admin } = useData();
  const { Popover } = renderers;
  const { currentUser } = useAuth();
  const commentStyle = first
    ? globalStyles.first_comment
    : globalStyles.comment;

  return (
    <View>
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
          style={globalStyles.dots}
        >
          <MenuTrigger>
            {(commentData.uid == currentUser.uid || admin == 1) && !first ? (
              <Entypo name="dots-three-horizontal" size={20}></Entypo>
            ) : null}
          </MenuTrigger>
          <MenuOptions style={globalStyles.delete_dots_btn}>
            <Pressable
              style={globalStyles.edit_comment}
              onPress={() => {
                deleteComment(commentLocation, commentId);
              }}
            >
              <Text style={globalStyles.delete_dots_text}>מחק</Text>
            </Pressable>
          </MenuOptions>
        </Menu>
        <Text style={globalStyles.comment_data}>{commentData.comment}</Text>
      </View>
    </View>
  );
};

export default Comment;
